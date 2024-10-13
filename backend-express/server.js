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
    origin:"http://localhost:3000",
    methods: ["GET", "POST"]
  }
})



const connectSockets = new Set();

let users = []

let gameRunning = false;

const game = () => {
  let winner = ""
  setInterval(() => {
    io.emit("question")
  }, 10000);

}


io.on("connection", (socket) => {
  connectSockets.add(socket.id);
  console.log(`${socket.id} connected to the server. ${connectSockets.size} Active Sockets`);

  socket.on("disconnect", () => {
    connectSockets.delete(socket.id)
    console.log(`${socket.id} left the server.`)
    users = users.filter( user => user.socket_id === socket.id);
    console.log(users);

  })

  socket.on("send_message", (data) => {
    socket.broadcast.emit("incoming_messages", data)
  })

  socket.on("register", (data) => {
    const userInstance = {
      [data]: 0,
      socket_id: socket.id
    };
    users.push(userInstance)
    console.log(userInstance);
    console.log(users);

    if (users.length > 1 && !gameRunning){
      console.log("run");
      console.log(socket);

      socket.emit("server_message", "Game is starting soon..")
    } else {
      console.log("run2");
      console.log(users.length);

      socket.emit("server_message", `Need ${2 - users.length} more player(s) to start.`)
    }
  })
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
