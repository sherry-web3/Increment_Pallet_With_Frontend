import { useState } from 'react'
import './App.css'
import SherryModule from "./components/sherryModule";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h2>Increment Pallet substrate Polkadot</h2>

    
     <SherryModule />
    
    </>
  )
}

export default App
