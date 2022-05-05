import { useMemo } from "react";


const Message = props => {
  const {
    value,
    think,
    timestamp,
    from,
    type,
    user
  } = props;

  const msgClass = useMemo( () => {
    let className = ''
    if (from !== user)
      className += ' incoming'
    if (type !== 'joined' && type !== 'left')
      className += ' bubble'
    return className
  }, [type, from, user])

  console.log(type)

  const message = useMemo( () => {
    switch(type) {
      case 'joined': 
        return user === from 
          ? `You joined the chat as user ${from}`
          : `User ${from} joined the chat`
      case 'left': 
        return `User ${from} left the chat`
      default: 
        return value
    }
  }, [value])

  return (
    <div className={`Message-wrapper ${msgClass}`}>
      <div className={`Message ${msgClass}`}>
        <h6 style={{color: think ? '#c9c9c9': '#2e2e2e'}}>{message}</h6>
      </div>
    </div>

  )
}

export default Message