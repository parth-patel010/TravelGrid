
import React from 'react';
import { AppProvider } from './context/AppContext';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Custom/Navbar';
import Footer from './components/Custom/Footer';
import { AuthProvider } from './context/AuthContext';
import GoToTopButton from './components/GoToTopButton'; 




function App() {
  const location = useLocation(); 
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [location]);
  return (



<AuthProvider>

    <AppProvider>
      <div className="flex flex-col min-h-screen">
        {loading && <Spinner />}
        <Navbar />
        <div className="flex-grow">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary >
          </div>
          {/* Place the GoToTopButton here, outside the flex-grow div
              but within the main flex container, so it's always visible and fixed. */}
          <GoToTopButton />
          <Footer />
        </div>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
