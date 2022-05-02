import "./index.css"

const Messages = props => {
  const { messages } = props;
  console.log(messages)
  return (
    <div className="Messages">
      {messages.map( m => (
        <div key={m.timestamp}>{m.value}</div>
      ))}
    </div>
  )
}

export default Messages