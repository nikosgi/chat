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
  })
  socket.on("message", message => {
    console.log('msg received')
    const {
      from,
      value,
      timestamp,
      think
    } = message;
    const room = findRoom(from)
    io.in(room).emit('message', message)
  })
  socket.on('disconnect', function() {
    removeUser(socket.id)
 });
});

httpServer.listen(port, () => console.log('Listening... ', port ));