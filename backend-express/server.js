import express from "express";
import http from "http";
import {Server} from "socket.io";
import cors from "cors";

const PORT = process.env.PORT

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin:"http://localhost:3000"
  }
})

const connectSockets = new Set();

io.on("connection", (socket) => {
  connectSockets.add(socket.id);
  console.log(`${socket.id} connected to the server. ${connectSockets.size} Active Sockets`);

  socket.on("disconnect", () => {
    connectSockets.delete(socket.id)
    console.log(`${socket.id} left the server.`)
  })

  socket.on("send_message", (data) => {
    console.log(data);
    socket.broadcast.emit("incoming_messages", data)
  })
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
