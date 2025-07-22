import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'

<<<<<<< Updated upstream
// Placeholder pages (to be created if not exist)
=======
//Created guides page to display travel guides
import TravelGuidesCarousel from './pages/TravelGuidesProfiles.jsx'
import Contact from './pages/Contact'

>>>>>>> Stashed changes
import Discover from './pages/Discover'
import Trips from './pages/Trips'
import Review from './pages/Review'
import Forums from './pages/Forums'
import Contributors from './pages/Contributors'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App provides context and layout
    children: [
      { path: '/', element: <Home /> },
      { path: '/discover', element: <Discover /> },
      { path: '/trips', element: <Trips /> },
      { path: '/review', element: <Review /> },
      { path: '/forums', element: <Forums /> },
      { path: '/contributors', element: <Contributors /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
) 
