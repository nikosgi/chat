import { createServer } from "http";
import { SocketAddress } from "net";
import { Server } from "socket.io";
import {addUser, removeUser} from "./users.js"

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
    addUser(socket.id)
    cb(socket.id)
  })
  socket.on("message", message => {
    console.log(message)
  })
  socket.on("leave", () => {
    removeUser(socket.id)
  })
  socket.on('disconnect', function() {
    removeUser(socket.id)
 });
});

httpServer.listen(port, () => console.log('Listening... ', port ));