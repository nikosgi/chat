import { useMemo } from "react";


const Message = props => {
  const {
    value,
    params,
    timestamp,
    from,
    type,
    user
  } = props;

  const {
    action,
    think
  } = params;

  const msgClass = useMemo( () => {
    let className = ''
    if (from !== user)
      className += ' incoming'
    if (type !== 'notification')
      className += ' bubble'
    return className
  }, [type, from, user])

  const message = useMemo( () => {
    switch(action) {
      case 'joined': 
        return user === from 
          ? `You joined the chat as user ${from}`
          : `User ${from} joined the chat`
      case 'left': 
        return `User ${from} left the chat`
      case 'nick':
        return user === from 
          ? `Name changed to ${value}`
          : `${from} changed his name to ${value}`
      default: 
        return value.replaceAll(':)','🙂').replaceAll(';)','😜');
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