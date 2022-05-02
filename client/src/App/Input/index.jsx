import { useState } from "react"
import "./index.css"

const Input = props => {
  const [input, setInput] = useState('')

  const onChange = e => setInput(e.target.value)

  return (
    <div className="Input-root">
      <input placeholder="Aa" onChange={onChange} value={input} className="Input"/>
      <button className="Input-button">Send</button>
    </div>
  )
}

export default Input