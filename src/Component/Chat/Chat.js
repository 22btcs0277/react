import React from 'react'
import "./Chat.css"
import io from "socket.io-client"
import { useState,useEffect } from 'react';
import {user} from "../Join/Join"
import Message from "../Message/Message"
import ReactScrollToBottom from "react-scroll-to-bottom";

 let socket;
function Chat() {


  const [id, setid] = useState("");
  const [messages, setMessages] = useState([])


  const send = () => {
    const message = document.getElementById('chatInput').value;
    socket.emit('message', { message, id });
    document.getElementById('chatInput').value = "";
}



  useEffect(() => {
  //  socket = io("http://localhost:4000/")
      socket = io("https://new-ochre.vercel.app/")
    // socket = socketIo(ENDPOINT, { transports: ['websocket'] });

    socket.on('connect', () => {
        console.log("connected")
        // alert('Connected');
        setid(socket.id)
      })
        setid(socket.id);
        socket.emit("joined",{user})

        socket.on("welcome",(data)=>{
          console.log(`${data.user}  ${data.message}`)
        })

        socket.on("userJoined",(data)=>{
          console.log(`${data.user}  ${data.message}`)
        })

        socket.on("leve",(data)=>{
          console.log(`${data} has left`)
        })
 
    
       return()=>{
       socket.emit("disconnect")
       socket.off();
    }

}, [])

useEffect(() => {
  socket.on('sendMessage', (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message, data.id);
  })
  return () => {
      socket.off();
  }
}, [messages])

  return (
    <div className="chatPage">
    <div className="chatContainer">
        <div className="header">
            <h2>C CHAT</h2>
            <a href="/">hi</a>
        </div>
        <ReactScrollToBottom className="chatBox">
            {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
        </ReactScrollToBottom>
        <div className="inputBox">
            <input onKeyPress={(event) => event.key === 'Enter' ? send() : null} type="text" id="chatInput" />
            <button onClick={send} className="sendBtn"> Send</button>
        </div>
    </div>

</div>
  )
}
export default Chat