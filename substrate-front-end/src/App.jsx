import { useState } from 'react'
import './App.css'
import SherryModule from "./components/sherryModule";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>Connecting substrate with polkadot</h1>

    
     <SherryModule />
    
    </>
  )
}

export default App
