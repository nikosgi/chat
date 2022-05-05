import { createServer } from "http";
import { SocketAddress } from "net";
import { Server } from "socket.io";
import {addUser, removeUser, findRoom} from "./users.js"

const httpServer = createServer();
const io = new Server(httpServer,{
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const port = process.env.PORT || 8000;


io.on("connection", (socket) => {
  console.log("New connection :", socket.id)
  socket.on("join", ({}, cb) => {
    const room = addUser(socket.id)
    socket.join(room)
    cb(socket.id)
    io.in(room).emit('message', {
      from: socket.id,
      timestamp: (new Date()).getTime(),
      type: 'notification',
      params: {
        action: 'joined'
      }
    })
  })
  socket.on("message", message => {
    const room = findRoom(socket.id)
    io.in(room).emit('message', {
      from: socket.id,
      timestamp: (new Date()).getTime(),
      ...message
    })
  })
  socket.on('disconnect', function() {
    const room = findRoom(socket.id)
    removeUser(socket.id)
    io.in(room).emit('message', {
      from: socket.id,
      timestamp: (new Date()).getTime(),
      type: 'notification',
      params: {
        action: 'left'
      }
    })
  });
});

httpServer.listen(port, () => console.log('Listening... ', port ));