import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2>Hello, Welcome To GSSOC 2025</h2>
      <Button>Start Contributing</Button>

    </>
  )
}

export default App
