import { useEffect, useState } from "react"
import "./index.css"

const Input = props => {
  const [input, setInput] = useState('')

  useEffect( () => {

  }, )

  const onFocus = () => {
    window.addEventListener('keypress', handleKeyPress)
  }

  const onBlur = () => {
    window.removeEventListener('keypress', handleKeyPress)
  }

  const handleKeyPress = key => {
    console.log(key)
  }
  const handleChange = e => setInput(e.target.value)
  const sendMessage = e => {

  }

  return (
    <div className="Input-root">
      <input 
        className="Input"
        placeholder="Aa"
        value={input}         
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <button 
        className="Input-button"
        disabled={input === ''}
        onClick={sendMessage}
      >
          Send
      </button>
    </div>
  )
}

export default Input