import { createServer } from "http";
import { SocketAddress } from "net";
import { Server } from "socket.io";
import {addUser, removeUser, replaceUser, getUser, findRoom} from "./users.js"

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
    const user = getUser(socket.id)
    // const chatee = findChatee(socket.id)
    socket.join(room)
    cb(socket.id)
    io.in(room).emit('message', {
      from: user.name,
      timestamp: (new Date()).getTime(),
      type: 'notification',
      params: {
        action: 'joined'
      }
    })
  })
  socket.on("message", (message, cb) => {
    const {value, params} = message;

    const room = findRoom(socket.id)
    const user = getUser(socket.id)
    
    io.in(room).emit('message', {
      from: user.name,
      timestamp: (new Date()).getTime(),
      ...message
    })
    switch(params.action) {
      case 'nick': replaceUser(socket.id, value); break;
    }
  })
  socket.on('disconnect', function() {
    const room = findRoom(socket.id)
    const user = getUser(socket.id)
    console.log(user)
    removeUser(socket.id)
    io.in(room).emit('message', {
      from: user.name,
      timestamp: (new Date()).getTime(),
      type: 'notification',
      params: {
        action: 'left'
      }
    })
  });
});

httpServer.listen(port, () => console.log('Listening... ', port ));