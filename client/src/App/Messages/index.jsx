import "./index.css"

const Messages = props => {
  const { messages, user } = props;
  return (
    <div className="Messages">
      { user 
        ?
          messages.reverse().map( m => (
            <div key={m.timestamp}>
              <h5 style={{color: 'white', backgroundColor: m.think ? 'grey' : 'red'}}>{m.value}</h5>
            </div>
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