import './App.css';
import socketIO from 'socket.io-client'
import { useEffect, useState } from 'react';

const socket = socketIO.connect('http://localhost:4000')

function App() {
  const [msg, setMsg] = useState('')

  const[messages, setMessages] = useState([])

  useEffect(() => {
    socket.on('reply', (data) => {
      setMessages([...messages, data])
    })
  }, [messages])

  const sendMsg = (e) => {
    e.preventDefault()
    if(msg){
    socket.emit('message', {
      text: msg,
      id: `${Math.random()}`
    })
  }
  setMsg('')
  }

  return (
    <div className="App">
      <h2>Simple Chat App</h2>

      <ul>
        {
          messages.map(message => <li key={message.id}>{message.text}</li>)
        }
      </ul>

      <form onSubmit={sendMsg}>
        <input 
        type ="text"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        />
        <button>
          send
        </button>
      </form>
    </div>
  );
}

export default App;