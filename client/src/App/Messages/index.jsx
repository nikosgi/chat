import "./index.css"

const Messages = props => {
  const { messages, user } = props;
  return (
    <div className="Messages">
      { user 
        ?
          messages.map( m => (
            <div key={m.timestamp}>{m.value}</div>
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