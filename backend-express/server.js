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
let newQuiz = {
  "question": "apple",
  "answer": "apple"
};


const game = () => {

  const generateQuiz = () => {
    return quiz[Math.floor(Math.random() * quiz.length)]
  }
  setInterval(() => {
    // console.log("triggered game");
    // if(newQuiz) io.emit("question", `Previous answer was ${newQuiz["answer"]}`)

    // newQuiz = generateQuiz();

    io.emit("question", newQuiz["question"])
  }, 10000);

}

const addScore = (name) => {
  const findIndex = users.findIndex( user => {
    console.log(`username = ${name}`);

    const keys = Object.keys(user)
    console.log(keys);
    const answer = keys.includes(name)
    console.log(answer);
    return answer
  })

  users[findIndex][name] += 1;
  console.log(users[findIndex]);

  io.emit("updated_score", users)

}

const checkAnswer = (data) => {
  if(data.message === newQuiz["answer"]){
    console.log("correct_answer");

    return addScore(data.name)
  }
  console.log("incorrect_answer");

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
    checkAnswer(data)
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
      io.emit("server_message", "Game is starting soon..")
      game();
    } else {
      io.emit("server_message", `Need ${2 - users.length} more player(s) to start.`)
    }
  })
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
