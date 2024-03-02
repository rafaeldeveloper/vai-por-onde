import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TextField } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)

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
  
    </>
  )
}

export default App
