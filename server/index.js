import { Server } from "socket.io";
const port = process.env.PORT || 8000;
const io = new Server();

const {addUser, removeUser, getUser} = "./users.js"

io.on("connection", (socket) => {
  console.log("New connection :", socket.id)
  socket.on("join", () => {
    addUser(socket.id)
  })
  socket.on("message", message => {
    console.log(message)
  })
  socket.on("leave", () => {
    removeUser(socket.id)
  })
});

io.listen(port)