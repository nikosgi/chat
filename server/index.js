import { Server } from "socket.io";
const port = process.env.PORT || 8000;
const io = new Server();

const {addUser, removeUser} = "./users.js"

io.on("connection", (socket) => {
  console.log("New connection :", socket)
  socket.on("join", () => {
    addUser(socket.id)
  })
  socket.on("message", onMessage)
  socket.on("leave", () => {
    removeUser(socket.id)
  })
});

io.listen(port)