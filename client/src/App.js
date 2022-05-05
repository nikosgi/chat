import { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { io } from "socket.io-client";
import Messages from './App/Messages'
import Input from './App/Input';
import './App.css';
import parseMessage from './utils/parseMessage';
import { SocketContext } from './socket';

function App() {
  const [chatee, setChatee] = useState()
  const [user, setUser] = useState()
  const [messages, setMessages] = useState([])
  const socket = useContext(SocketContext)
  
  useEffect(() => {
    socket.emit('join', {}, user => {
      setUser(user)
    })
    socket.on('message', onMessage)
    socket.on('name', onNameChange)
  }, [])

  const handleSend = message => {
    const {action, value} = parseMessage(message)
    switch(action){
      case 'nick': nameChange(value); break;
      case 'oops': deleteLastMessage(); break;
      case 'think': sendMessage(value, true); break;
      case 'send': sendMessage(value, false); break;
    }
  }

  const onNameChange = user => {
    setChatee(user)
  }

  const onMessage = msg => {    
    console.log('receievd message', msg)
    if (msg.type === 'joined' && msg.user !== user){
      setChatee(msg.user)
    }
    setMessages( messages => [...messages, msg])
  }

  const nameChange = name => {
    socket.emit('name', name)
  }

  const sendMessage = (message, think) => {
    const payload = {
      user,
      value: message,
      timestamp: (new Date()).getTime(),
      think,
      type: 'bubble'
    }
    socket.emit('message', payload)
  }

  const deleteLastMessage = () => {
    setMessages( messages => {
      messages.pop()
      return [...messages]
    })
  }

  return (
    <div className="App">
      <h1>{chatee}</h1>
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
