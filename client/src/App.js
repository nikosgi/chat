import { useState, useEffect, useContext } from 'react';
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

  const onMessage = msg => {
    const {
      value,
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
        // case 'countdown':
        //   console.log(from, user)
        //   if (from !== user) startCountdown(value)
        //   return;
        default: 
      }
    }
    setMessages( messages => [...messages, msg])
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
      case 'countdown': {
        sendMessage(value, 'notification', {
          action
        })
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
      default :
        break;
    }
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
    let msgIdx = -1
    for(let i = 0; i < messages.length ; i++){
      if (messages[i].type !== 'notification') 
        msgIdx = i
    }
    if (msgIdx !== -1){
      setMessages( messages => {
        messages[msgIdx].params = {...messages[msgIdx].params, fade: true}
        return [...messages]        
      })  
    }
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

  return (
    <div className="App">
      <div className="App-header">
        <h2>{chatee || 'Waiting for user to connect'}</h2>
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
