import { useEffect, useState } from 'react';
import './App.css';
import { socket } from './socket';
import { useRef } from 'react';
import QuizBox from './components/quizbox';
import { RiRadioButtonLine } from "react-icons/ri";
function App() {

  const listRef = useRef<HTMLUListElement>(null);

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
  const [logs, setLogs] = useState<String[]>([])


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

    socket.on("server_logs", data => setLogs( prev =>{
     return [...prev, data]
    }))

    return () => {
      socket.off("incoming_messages");
      socket.off("server_messages")
    };

  }, [])

  useEffect( () => {
    listRef.current?.scrollTo(0, listRef.current?.scrollHeight)
  }, [logs])

  return (
    <div className="App">
      {/* screen */}
      <div className="align-center" style={{width:'30%'}}>
        <div className="server-logs">
            <h4>
              Server Logs
            </h4>
            <ul ref={listRef} className="ul-logs">

              {
                logs.map( log => <li className="logs-list"><h5>{log}</h5></li>)
              }
              </ul>
        </div>
      </div>
      <div style={{width:'30%'}}>
        <div className="phone-div">
          <h1>Quiz Game</h1>
          <QuizBox message={message} setMessage={setMessage} setMessages={setMessages} messages={messages}/>
          <div>
            {serverMessage}
          </div>
        </div>
      </div>
      <div  className="align-center" style={{width:"30%"}}>


        <div className="scoreboard">
            <h4><span className="active"><RiRadioButtonLine/></span>  Active Players</h4>
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
    </div>
  );
}

export default App;
