import { useEffect, useState } from 'react';
import './App.css';
import { socket } from './socket';

import QuizBox from './components/quizbox';

function App() {

  type messageType = {
    name: string,
    message: string
  }
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<messageType[]>([])
  const [serverMessage, setServerMessage] = useState("")


  useEffect( () => {

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
      <QuizBox message={message} setMessage={setMessage} setMessages={setMessages} messages={messages}/>
      {serverMessage}
    </div>
  );
}

export default App;
