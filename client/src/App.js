import Messages from './App/Messages'
import Input from './App/Input';
import './App.css';
import { useState } from 'react';

function App() {

  const [messages, setMessages] = useState([])
  const handleSend = message => {
    const payload = {
      value: message,
      timestamp: (new Date()).getTime()
    }
    setMessages([payload, ...messages])
  }

  return (
    <div className="App">
      <Messages
        messages={messages}
      />
      <Input 
        handleSend={handleSend}
      />
    </div>
  );
}

export default App;
