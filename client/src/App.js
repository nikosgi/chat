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
    console.log('emitting')
    socket.emit('join', {}, user => {
      setUser(user)
    })
  }, [])

  useEffect(() => {
    socket.on('message', onMessage)
    return () => {
      socket.off('message', onMessage)
    }
  }, [messages, user])

  const handleSend = message => {
    const {action, value} = parseMessage(message)
    switch(action){
      case 'nick': 
      case 'oops': {
        sendMessage(value, 'notification', {
          action
        })
        break;
      } 
      case 'think': 
        sendMessage(value, 'message', {
          think: true
        });
        break;
      case 'send': 
        sendMessage(value, 'message', {
          think: false
        });
        break;
    }
  }

  const onMessage = msg => {
    const {
      value,
      timestamp,
      type,
      from,
      params,
    } = msg
    console.log(msg, user)
    if (user && from !== user && type === 'notification') {
      
      switch(params.action) {
        case 'joined':
          
          setChatee(from)
          break;
        case 'nick':
          
          setChatee(value)
          break;
      }
    }
    setMessages([...messages, msg])
  }

  const sendMessage = (message, type, params) => {
    const payload = {
      value: message,
      type, 
      params
    }
    console.log('sending message', payload)
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
