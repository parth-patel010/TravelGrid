import { StrictMode, lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Spinner from './components/Spinner';
import ErrorBoundary from './components/ErrorHandle/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import { MapProvider } from './context/MapContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthLayout from './components/AuthLayout';

// Lazy imports
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const Discover = lazy(() => import('./pages/Discover'));
const Trips = lazy(() => import('./pages/Trips'));
const Review = lazy(() => import('./pages/Review'));
const Contributors = lazy(() => import('./pages/Contributors'));
const Hotels = lazy(() => import('./pages/Hotels'));
const HotelDetails = lazy(() => import('./pages/HotelDetails'));
const TicketBooking = lazy(() => import('./pages/TicketBooking'));
const TravelGuidesCarousel = lazy(() => import('./pages/TravelGuidesProfiles'));
const TravelPackages = lazy(() => import('./pages/TravelPackages'));
const DiscovermoreDestination = lazy(() => import('./pages/DiscovermoreDestination'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./components/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/Privacypolicy'));
const TermsAndConditions = lazy(() => import('./pages/Terms&Conditions'));
const TripCalculatorPage = lazy(() => import('./pages/TripCalculator'));
const HotelMapPage = lazy(() => import('./pages/HotelMapPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const TripsPlanned = lazy(() => import('./pages/TripsPlanned'));
const SavedPlaces = lazy(() => import('./pages/SavedPlaces'));
const CountriesVisited = lazy(() => import('./pages/CountriesVisited'));
const PackageDetails = lazy(() => import('./pages/PackageDetails'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const NetworkError = lazy(() => import('./components/ErrorHandle/NetworkError'));
const ServerError = lazy(() => import('./components/ErrorHandle/ServerError'));
const NotFound = lazy(() => import('./pages/NotFound'));
const HotelBookingPage = lazy(() => import('./pages/HotelBookingPage'));
const CurrencyConverter = lazy(() => import('./pages/currencyconverter'));
const Feedback = lazy(() => import('./pages/Feedback'));
const TravelPlanGenerator = lazy(() => import('./pages/TravelPlanGenerator'));
const TravelForum = lazy(() => import('./pages/TravelForum'));
const TrendingSpots = lazy(() => import('./pages/TrendingSpots.jsx'));
const PackingChecklistPage = lazy(() => import('./pages/PackingChecklist.jsx'));

// Router config
const router = createBrowserRouter([
  { path: '/login', element: <AuthLayout><Login /></AuthLayout> },
  { path: '/signup', element: <AuthLayout><Signup /></AuthLayout> },
  { path: '/forgot-password', element: <AuthLayout><ForgotPassword /></AuthLayout> },
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: '/', element: <Suspense fallback={<Spinner />}><Home /></Suspense> },
      { path: '/about', element: <Suspense fallback={<Spinner />}><About /></Suspense> },
      { path: '/blog', element: <Suspense fallback={<Spinner />}><Blog /></Suspense> },
      { path: '/discover', element: <Suspense fallback={<Spinner />}><Discover /></Suspense> },
      { path: '/trips', element: <Suspense fallback={<Spinner />}><Trips /></Suspense> },
      { path: '/review', element: <Suspense fallback={<Spinner />}><Review /></Suspense> },
      { path: '/contributors', element: <Suspense fallback={<Spinner />}><Contributors /></Suspense> },
      { path: '/hotels', element: <Suspense fallback={<Spinner />}><Hotels /></Suspense> },
      { path: '/hotels/:id', element: <Suspense fallback={<Spinner />}><HotelDetails /></Suspense> },
      { path: '/ticket', element: <Suspense fallback={<Spinner />}><TicketBooking /></Suspense> },
      { path: '/guides', element: <Suspense fallback={<Spinner />}><TravelGuidesCarousel /></Suspense> },
      { path: '/packages', element: <Suspense fallback={<Spinner />}><TravelPackages /></Suspense> },
      { path: '/discovermore', element: <Suspense fallback={<Spinner />}><DiscovermoreDestination /></Suspense> },
      { path: '/faq', element: <Suspense fallback={<Spinner />}><FAQ /></Suspense> },
      { path: '/contact', element: <Suspense fallback={<Spinner />}><Contact /></Suspense> },
      { path: '/privacy', element: <Suspense fallback={<Spinner />}><PrivacyPolicy /></Suspense> },
      { path: '/terms', element: <Suspense fallback={<Spinner />}><TermsAndConditions /></Suspense> },
      { path: '/trip-calculator', element: <Suspense fallback={<Spinner />}><TripCalculatorPage /></Suspense> },
      { path: '/hotel-map', element: <Suspense fallback={<Spinner message="Loading map..." />}><HotelMapPage /></Suspense> },
      { path: '/currency-converter', element: <Suspense fallback={<Spinner />}><CurrencyConverter /></Suspense> },
      { path: '/feedback', element: <Suspense fallback={<Spinner />}><Feedback /></Suspense> },
      { path: '/forum', element: <Suspense fallback={<Spinner />}><TravelForum /></Suspense> },
      { path: '/travel-plan-generator', element: <Suspense fallback={<Spinner />}><TravelPlanGenerator /></Suspense> },
      { path: '/packing-checklist', element: <Suspense fallback={<Spinner />}><PackingChecklistPage /></Suspense> },
      { path: '/trending-spots', element: <Suspense fallback={<Spinner />}><TrendingSpots /></Suspense> },
      { path: '/dashboard', element: <Suspense fallback={<Spinner />}><Dashboard /></Suspense> },
      { path: '/dashboard/trips', element: <Suspense fallback={<Spinner />}><TripsPlanned /></Suspense> },
      { path: '/dashboard/saved', element: <Suspense fallback={<Spinner />}><SavedPlaces /></Suspense> },
      { path: '/dashboard/countries', element: <Suspense fallback={<Spinner />}><CountriesVisited /></Suspense> },
      { path: '/package/:id', element: <Suspense fallback={<Spinner />}><PackageDetails /></Suspense> },
      { path: '/hotel-booking', element: <Suspense fallback={<Spinner />}><HotelBookingPage /></Suspense> },
      { path: '/network-error', element: <Suspense fallback={<Spinner />}><NetworkError /></Suspense> },
      { path: '/server-error', element: <Suspense fallback={<Spinner />}><ServerError /></Suspense> },
      { path: '*', element: <Suspense fallback={<Spinner />}><NotFound /></Suspense> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <ErrorBoundary>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <MapProvider>
            <RouterProvider router={router} />
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{
                duration: 5000,
                style: {
                  background: '#333',
                  color: '#fff',
                  fontSize: '16px',
                },
              }}
            />
          </MapProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </ErrorBoundary>
  </StrictMode>
);
