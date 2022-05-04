import { useState, useRef, useEffect } from 'react';
import { io } from "socket.io-client";
import Messages from './App/Messages'
import Input from './App/Input';
import './App.css';
import parseMessage from './utils/parseMessage';

function App() {
  const [user, setUser] = useState()
  const [messages, setMessages] = useState([])
  const socket = useRef(io());

  useEffect(() => {
    socket.current.emit("login")
  }, [])

  const handleSend = message => {
    const {action, value} = parseMessage(message)

    switch(action){
      case 'nick': setUser(value); break;
      case 'oops': deleteLastMessage(); break;
      case 'think': sendMessage(value, true); break;
      case 'send': sendMessage(value, false); break;
    }
  }

  const sendMessage = (message, think) => {
    const payload = {
      value: message,
      timestamp: (new Date()).getTime(),
      think
    }
    setMessages([...messages, payload])
  }

  const deleteLastMessage = () => {
    setMessages( messages => {
      messages.pop()
      return [...messages]
    })
  }

  return (
    <div className="App">
      <Messages
        socket={socket}
        user={user}
        messages={messages}
      />
      <Input 
        handleSend={handleSend}
      />
    </div>
  );
}

export default App;
