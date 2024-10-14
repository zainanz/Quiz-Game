import { useEffect, useState } from 'react';
import './App.css';
import { socket } from './socket';

import QuizBox from './components/quizbox';

function App() {

  type messageType = {
    name: string,
    message: string
  }
  type Stats = {
    username: string,
    score: number,
    socket_id: string
  };
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<messageType[]>([])
  const [serverMessage, setServerMessage] = useState("")
  const [userStats, setUserStats] = useState<Stats[]>();


  useEffect( () => {
    socket.on("updated_score", (data) => {
      setUserStats(data)
    })
    socket.on("incoming_messages", (data) => {
      setMessages((prev) => [...prev, data])
    }
    )

    socket.on("question", data => setMessages( (prev) => {
      return (
        [...prev, {name:"Server", message:data}]
      )
    }))
    socket.on( "server_message", data => setServerMessage(data) )

    return () => {
      socket.off("incoming_messages");
      socket.off("server_messages")
    };

  }, [])

  return (
    <div className="App">
      {/* screen */}
      <div className="phone-div">
        <QuizBox message={message} setMessage={setMessage} setMessages={setMessages} messages={messages}/>
        <div>
          {serverMessage}
        </div>
      </div>
      <div className="scoreboard">
          <ol>
            {
              userStats?.map( stat => (<li>
                <span>
                  {stat.username}
                </span>
                <span>
                  {stat.score}
                </span>
                </li>))

  }
          </ol>
      </div>
    </div>
  );
}

export default App;
