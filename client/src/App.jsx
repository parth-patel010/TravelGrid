import React from 'react'
import { AppProvider } from './context/AppContext'
import { Outlet } from 'react-router-dom'
import ErrorBoundary from './components/ErrorHandle/ErrorBoundary'
import Navbar from './components/Custom/Navbar'
import Footer from './components/Custom/Footer'
import Spinner from './components/Spinner'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
function App() {
  const location = useLocation(); 
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [location]);
  return (
    <AppProvider>
      <div className="flex flex-col min-h-screen">
        {loading && <Spinner />}
        <Navbar />
        <div className="flex-grow">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </div>
        <Footer />
      </div>
    </AppProvider>
  )
}

export default App