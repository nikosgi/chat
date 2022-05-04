

const Message = props => {
  const {
    value,
    think,
    timestamp,
    from,
    user
  } = props;

  console.log(from, user)
  return (
    <div className={`Message-wrapper ${from !== user ? 'incoming' : ''}`}>
      <div className={`Message ${from !== user ? 'incoming' : ''}`}>      
        <h6 style={{color: think ? 'grey': 'black'}}>{value}</h6>
      </div>
    </div>

  )
}

export default Message