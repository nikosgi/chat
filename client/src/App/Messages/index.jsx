import Message from './Message.jsx'
import "./index.css"
import { useEffect } from 'react';

const Messages = props => {
  const { messages, user, typing } = props;
  return (
    <div className="Messages">
      { user 
        ?
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

        : 
          <div>
          Set username to enter chat using the /nick "name" command
        </div>
      }

    </div>
  )
}

export default Messages