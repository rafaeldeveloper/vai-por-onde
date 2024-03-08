import { useState } from 'react'

import { IoIosSend } from "react-icons/io";
import { IoTrashBin } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TextField } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)

  const [conversa, setConversa] = useState([]);
  const [mensagem, setMensagem] = useState('');

  const handleMensagemChange = (event) => {
    setMensagem(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const novaConversa = {
      mensagem: mensagem,
    };

    setConversa([...conversa, novaConversa]);
    setMensagem('');
  };

  const handleDeletar = (index) => {
    const novasConversas = [...conversa];
    novasConversas.splice(index, 1);
    setConversa(novasConversas);
  };

  const handleEditar = (index) => {
    const conversaEditada = conversa[index];
    setMensagem(conversaEditada.mensagem);
    handleDeletar(index);
  }

  return (
    <>
      <img src="src\vpn.jpeg" className="logoicon" alt="logoproject" />
      <h1>Vai Por Onde ?</h1>
      
      <TextField id="filled-basic" label="Email" variant="filled" /><br />
      <TextField id="filled-basic" label="Password" variant="filled" />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
           Logar {  }
        </button>
      
      </div>

      <h2>Chat</h2>

      <section className='chat-box'>

        <form className='chat-form' onSubmit={handleSubmit}>
            <label>
              <input className='chat-input' type='text' value={mensagem} onChange={handleMensagemChange} placeholder='escreva aqui sua mensagem'/>
              <button className='chat-btn' type="submit" ><IoIosSend /></button>
            </label>
        </form>

        <ul className='chat-list'>
          {conversa.map((conversa, index) => (
            <li key={index}>
              {conversa.mensagem}
              <button className='chat-btn' onClick={() => handleEditar(index)}><FaEdit /></button>
              <button className='chat-btn' onClick={() => handleDeletar(index)}><IoTrashBin /></button>
            </li>
          ))}
        </ul>

      </section>
  
    </>
  )
}

export default App
