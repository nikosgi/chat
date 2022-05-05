import Message from './Message.jsx'
import "./index.css"
import { useEffect, useRef } from 'react';

const Messages = props => {
  const { messages, user, typing } = props;
  const messagesRef = useRef()

  useEffect( () => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages, typing])

  return (
    <div ref={messagesRef} className="Messages">
      <>
        {messages.sort( (a,b) => a.timestamp > b.timestamp).map( m => (
          <Message
            user={user}
            key={m.timestamp}
            value={m.value}
            timestamp={m.timestamp} 
            from={m.from}
            type={m.type}
            params={m.params}
          />
        ))}
        { typing && 
          <div className="Message-typing">
            <h6>Typing ...</h6>
          </div>
        }
      </>
    </div>
  )
}

export default Messages