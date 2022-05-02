import { useEffect, useState } from "react"
import "./index.css"

const Input = props => {
  const [input, setInput] = useState('')

  const handleChange = e => setInput(e.target.value)
  const onKeyPress = e => {
    if (e.key === "Enter") {
      sendMessage();
    }
  }
  const sendMessage = () => {
    if (input !== ''){
      console.log('sending')
      setInput('')
    }
  }

  return (
    <div className="Input-root">
      <input 
        className="Input"
        placeholder="Aa"
        value={input}
        onKeyPress={onKeyPress} 
        onChange={handleChange}
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