import "./quizbox.css"
import React, { useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { RiSave2Fill } from "react-icons/ri";
import {socket} from "../socket"

type messageType = {
  name: string,
  message: string
}
type PropsType = {
  setMessage: React.Dispatch<React.SetStateAction<string>>
  setMessages: React.Dispatch<React.SetStateAction<messageType[]>>
  message: string
  messages:messageType[];

}

export default function QuizBox({messages, message, setMessage, setMessages}: PropsType){


  const [usernameHolder, setUsername] = useState({tempholder: "", username: ""})
  const list = useRef<HTMLUListElement>(null);

  const elementCreator = (transform_message: messageType) => {
    return `<li class="message-current-user">
    ${transform_message.message}
    <span>${transform_message.name} 20-11-2024</span>
  </li>`
  }
  useEffect(() => {
    const parent = list.current?.parentElement;
    parent?.scrollTo(0, parent.scrollHeight)
  }, [messages])

  const sendMessage = (e: { preventDefault: () => void; }) => {
    console.log(socket);

    e.preventDefault()
    const transform_message = {
      name: usernameHolder.username,
      message: message
    }
    const elem = elementCreator(transform_message)
    list.current!.innerHTML += elem;
;
    socket.emit("send_message", transform_message );
  }

  const handleSetUsername = () => {
    console.log(socket);

    setUsername((prev) => ({...prev, username: prev.tempholder}))
    socket.emit("register", usernameHolder.tempholder, (error: any) => {
      if (error) {
        console.error("Error during registration:", error);
      }
      console.log("hi")
    });
    socket.on("server_message", (data) => {
      console.log(data);
    })
  }

  return (
    <>
    {
        !usernameHolder.username && (
          <div className="username-popup">
            <span>
              Add your display name
            </span>

            <div>
              <input onChange={ (e) => setUsername((prev) => ({...prev, tempholder: e.target.value}) )} type="text" placeholder="John Smith" />
              <button onClick={ handleSetUsername }><RiSave2Fill/></button>
            </div>
          </div>
        )
    }
    <div className={`quizbox ${!usernameHolder.username ? "blur" : ""}`}>

      <div className={`main-display`}>
        <ul ref={list}>
          {
            messages.map((msg) => <li className={msg.name === "Server" ? "message-server" : "message-other-user"}>{msg.message} <span>{msg.name !== "Server" ? msg.name : ""}</span></li>)
          }
        </ul>
      </div>
      <form onSubmit={sendMessage} action="">
        <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" />
        <button>
          <IoIosSend/>
        </button>
      </form>
    </div>
    </>
  )
}
