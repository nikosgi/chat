

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
        <h6 style={{color: think ? '#c9c9c9': '#2e2e2e'}}>{value}</h6>
      </div>
    </div>

  )
}

export default Message