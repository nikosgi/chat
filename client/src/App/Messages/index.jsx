import Message from './Message.jsx'
import "./index.css"

const Messages = props => {
  const { messages, user } = props;
  return (
    <div className="Messages">
      { user 
        ?
          messages.reverse().map( m => (
            <Message
              key={m.timestamp}
              value={m.value}
              timestamp={m.timestamp}
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