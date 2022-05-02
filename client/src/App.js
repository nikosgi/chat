import Messages from './App/Messages'
import Input from './App/Input';
import './App.css';
import { useState } from 'react';

function App() {

  const [user, setUser] = useState()
  const [messages, setMessages] = useState([])
  const handleSend = message => {
    const {action, value} = parseMessage(message)

    switch(action){
      case '/nick': setUser(value); break;
      case '/oops': deleteLastMessage(); break;
      case '/think': sendMessage(value,'think'); break;
      case '/send': sendMessage(value); break;
    }

  }

  return (
    <div className="App">
      <Messages
        user={user}
        messages={messages}
      />
      <Input 
        handleSend={handleSend}
      />
    </div>
  );
}

export default App;
