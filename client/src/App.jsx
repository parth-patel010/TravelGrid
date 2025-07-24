import React from 'react'
import { AppProvider } from './context/AppContext'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Custom/Navbar'
import Footer from './components/Custom/Footer'
import { AuthProvider } from './context/AuthContext'
import { DashboardDataProvider } from './context/DashboardDataContext'

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <DashboardDataProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
              <Outlet />
            </div>
            <Footer />
          </div>
        </DashboardDataProvider>
      </AppProvider>
    </AuthProvider>
  )
}

export default App