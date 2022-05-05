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
      user: socket.id,
      timestamp: (new Date()).getTime(),
      type: 'joined',
      think: false,
      message: ''
    })
  })
  socket.on("message", message => {
    const {user} = message;
    const room = findRoom(user)
    io.in(room).emit('message', message)
  })
  socket.on('disconnect', function() {
    const room = findRoom(socket.id)
    removeUser(socket.id)
    io.in(room).emit('message', {
      user: socket.id,
      timestamp: (new Date()).getTime(),
      type: 'left',
      think: false,
      message: ''
    })
 });
});

httpServer.listen(port, () => console.log('Listening... ', port ));