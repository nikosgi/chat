import { Server } from "socket.io";
const port = process.env.PORT || 8000;

const io = new Server();

io.on("connection", (socket) => {
  console.log("New connection :", socket)
});

io.listen(port)