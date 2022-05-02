

const Message = props => {
  const {
    value,
    think,
    timestamp
  } = props;

  return (
    <div className="Message">      
      <h6 style={{color: think ? 'grey': 'black'}}>{value}</h6>
    </div>
  )
}

export default Message