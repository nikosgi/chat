import Message from './Message.jsx'
import "./index.css"
import { useEffect } from 'react';

const Messages = props => {
  const { messages, user } = props;

  return (
    <div className="Messages">
      { user 
        ?
          messages.map( m => (
            <Message
              user={user}
              key={m.timestamp}
              value={m.value}
              timestamp={m.timestamp} 
              from={m.user}
              type={m.type}
              think={m.think}
            />
          ))
        : 
          <div>
          Set username to enter chat using the /nick "name" command
        </div>
      }

    </div>
  )
}

export default Messages