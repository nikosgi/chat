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
  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState([])
  const socket = useContext(SocketContext)

  useEffect(() => {
    console.log('emitting')
    socket.emit('join', {}, user => {
      setUser(user)
    })
  }, [])

  useEffect( () => {
    if (typing){
      setTimeout( () => setTyping(false), 2000)
    }
  }, [typing])

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
      case 'highlight': {
        sendMessage(value, 'message', {
          highlight: true,
          think: false
        });
        break;
      }
      case 'fadelast': {
        sendMessage(value, 'notification', {
          action
        });
        break;
      }
      case 'think': 
        sendMessage(value, 'message', {
          think: true,
          highlight: false
        });
        break;
      case 'send': 
        sendMessage(value, 'message', {
          think: false,
          highlight: false
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
    
    if (type === 'notification') {
      switch(params.action) {
        case 'joined':
          if (user && from !== user) setChatee(from)
          break;
        case 'nick':
          if (user && from !== user) setChatee(value)
          break;
        case 'chatee':
          if (!chatee) {
            setChatee(value)
            break;
          }
          return;
        case 'oops':
          deleteLastMessage(params.from);
          return;
        case 'typing':
          setTyping(from !== user)
          return;
        case 'fadelast':
          fadeLastMessage()
          return;
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

  const fadeLastMessage = () => {
    setMessages( messages => {
      const {params} = messages[messages.length - 1]
      messages[messages.length - 1].params = {...params, fade: true}
      return [...messages]
    })
  }
  const deleteLastMessage = from => {
    let msgIdx = -1
    for(let i = 0; i < messages.length ; i++){
      const m = messages[i]
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

  const onType = ()  => {
    const payload = {
      type: 'notification', 
      params: {
        action: 'typing'
      }
    }
    socket.emit('message', payload)
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>{chatee || 'Waiting for user to connect'}</h1>
      </div>
      <Messages
        socket={socket}
        user={user}
        messages={messages}
        typing={typing}
      />
      <Input 
        handleSend={handleSend}
        onType={onType}
      />
    </div>
  );
}

export default App;
