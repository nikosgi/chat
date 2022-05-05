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
          action,
          from: user
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
    if (type === 'notification') {
      switch(params.action) {
        case 'joined':
          if (user && from !== user) setChatee(from)
          break;
        case 'nick':
          if (user && from !== user) setChatee(value)
          break;
        case 'oops':
          deleteLastMessage(params.from)
      }
    }

    setMessages( messages => [...messages, msg])
  }

  const sendMessage = (message, type, params) => {
    const payload = {
      value: message,
      type, 
      params
    }
    socket.emit('message', payload)
  }

  const deleteLastMessage = from => {
    let msgIdx = -1
    for(let i = 0; i < messages.length ; i++){
      const m = messages[i]
      console.log(m.from, user, m.type)
      if (m.from === from && m.type !== 'notification'){
        msgIdx = i
      }
    }
    
    if (msgIdx !== -1){
      setMessages( messages => {
        messages.splice(msgIdx,1)
        return [...messages]        
      })  
    }
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
