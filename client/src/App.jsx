import React from 'react'
import { AppProvider } from './context/AppContext'
import { Outlet } from 'react-router-dom'
import ErrorBoundary from './components/ErrorHandle/ErrorBoundary'

function App() {
  return (
    <AppProvider>
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </AppProvider>
  )
}

export default App
