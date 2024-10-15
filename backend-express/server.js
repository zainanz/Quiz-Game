import express from "express";
import http from "http";
import {Server} from "socket.io";
import quiz from "./qna.js";
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
let newQuiz;
let timer;
let win;


const game = () => {
  io.emit("server_message", "Game running")
  gameRunning = true;
  const generateQuiz = () => {
    return quiz[Math.floor(Math.random() * quiz.length)]
  }
  timer = setInterval(() => {
    console.log("triggered game");
    console.log(newQuiz);
    if(newQuiz) io.emit("question", `Previous answer was ${newQuiz["answer"]}`)
    win = false;
    newQuiz = generateQuiz();

    io.emit("question", newQuiz["question"])
  }, 10000);

}

const stopGame = () => {
  gameRunning = false;
  clearInterval(timer);
  newQuiz = null;
  win = null;
  io.emit("question", "The game has stopped :C - Waiting for more players to join..")

}


const addScore = (name) => {
  const findIndex = users.findIndex( user => {
   return user.username === name
  })
  console.log(findIndex);

  users[findIndex].score += 1;
  io.emit("updated_score", users)

}

const checkAnswer = (data) => {
  try {
    if (win) return
    if(data.message.toLowerCase().replace(/\s/g, "") === newQuiz["answer"].toLowerCase().replace(/\s/g, "")){
      win = true;
      newQuiz = null;
      clearInterval(timer);
      io.emit("question", `${data.name} got it right! - Next question in 3s..`)
      setTimeout(() => {
        game()
      }, 300);
      return addScore(data.name)
    }
  } catch(er){
    console.log(er);

  }

}





io.on("connection", (socket) => {
  connectSockets.add(socket.id);
  console.log(`${socket.id} connected to the server. ${connectSockets.size} Active Sockets`);
  io.emit("updated_score", users)

  console.log(users);

  socket.on("disconnect", () => {
    connectSockets.delete(socket.id)
    users = users.filter( user => {
      if (user.socket_id === socket.id){
        io.emit("server_logs", `${user.username} left the server.`)
        console.log(`${user.username} - Socket ID: ${socket.id} left the server.`)
        return false;
      }
      return true;
    });
    io.emit("updated_score", users)
    if(users.length < 2) stopGame()
  })

  socket.on("send_message", (data) => {
    checkAnswer(data)
    socket.broadcast.emit("incoming_messages", data)
  })

  socket.on("register", (data) => {
    const userInstance = {
      username: data,
      score: 0,
      socket_id: socket.id
    };
    users.push(userInstance)
    console.log(users);
    io.emit("server_logs", `${userInstance.username} just joined the game.`);
    io.emit("updated_score", users)
    if (gameRunning){
      io.emit("server_message", "Game is running")
    }else {
      if (users.length > 1){
        io.emit("server_message", "Game is starting soon..")
        game();
      } else {
        io.emit("server_message", `Need ${2 - users.length} more player(s) to start.`)
      }
    }
  })
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
