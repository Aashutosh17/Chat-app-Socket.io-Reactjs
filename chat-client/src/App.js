import './App.css';
import socketIO from 'socket.io-client'
import { useState } from 'react';

const socket = socketIO.connect('http://localhost:4000')

function App() {
  const [msg, setMsg] = useState('')

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
        <li>first message</li>
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