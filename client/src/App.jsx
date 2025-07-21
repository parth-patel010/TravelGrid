import React from 'react'
import { AppProvider } from './context/AppContext'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  )
}

export default App
