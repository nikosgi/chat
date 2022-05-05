import { useEffect, useMemo, useState } from "react"
import { throttle, debounce } from 'throttle-debounce';
import "./index.css"

const Input = props => {
  const {
    handleSend,
    onType
  } = props;
  const [input, setInput] = useState('')

  const onChange = e => {
    setInput(e.target.value)
  }
  
  const onKeyPress = e => {
    if (e.key === "Enter") {
      sendMessage();
    }
    
  }
  const sendMessage = () => {
    if (input !== ''){
      setInput('')
      handleSend(input)
    }
  }

  const onDebouncedInput = useMemo(() => {
    return throttle(2000,onType);
  }, []);

  return (
    <div className="Input-root">
      <input 
        className="Input"
        placeholder="Aa"
        value={input}
        onInput={onDebouncedInput}
        // onKeyDown={ (100,onKeyDown)}
        // onKeyUp={debounce(3000, onKeyUp)}
        onKeyPress={onKeyPress} 
        onChange={onChange}
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