import { useEffect, useMemo, useRef } from "react";


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
    think,
    highlight,
    fade
  } = params;
  
  const messageRef = useRef()

  useEffect( () => {
    messageRef.current.scrollIntoView()
  }, [])

  const msgClass = useMemo( () => {
    let className = ''
    if (from !== user)
      className += ' incoming'
    if (type !== 'notification')
      className += ' bubble'
    if (highlight){
      className += ' highlight'
    }
    if (fade) {
      className += ' fade'
    }
    return className
  }, [type, from, user, fade])

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
    <div ref={messageRef} className={`Message-wrapper${msgClass}`}>
      <div className={`Message${msgClass}`}>
        <h6 style={{color: think ? '#c9c9c9': '#2e2e2e'}}>{message}</h6>
      </div>
    </div>

  )
}

export default Message