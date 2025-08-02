import { StrictMode, lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Spinner from './components/Spinner';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Trips from './pages/Trips';
import TravelGuidesCarousel from './pages/TravelGuidesProfiles.jsx';
import Contact from './components/Contact.jsx';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Review from './pages/Review';
import Contributors from './pages/Contributors';
import About from './pages/About';
import Hotels from './pages/Hotels';
import HotelDetails from './pages/HotelDetails';
import TicketBooking from './pages/TicketBooking';
import TravelPackages from './pages/TravelPackages';
import PackageDetails from './pages/PackageDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import PrivacyPolicy from './pages/Privacypolicy.jsx';
import TermsAndConditions from './pages/Terms&Conditions.jsx';
import FAQ from './pages/FAQ.jsx';
import TripsPlanned from './pages/TripsPlanned';
import SavedPlaces from './pages/SavedPlaces';
import CountriesVisited from './pages/CountriesVisited';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorHandle/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import { MapProvider } from './context/MapContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
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

const router = createBrowserRouter([
  { 
    path: '/login', 
    element: (
      <Suspense fallback={<Spinner />}>
        <Login />
      </Suspense>
    ) 
  },
  { 
    path: '/signup', 
    element: (
      <Suspense fallback={<Spinner />}>
        <Signup />
      </Suspense>
    ) 
  },
  { 
    path: '/forgot-password', 
    element: (
      <Suspense fallback={<Spinner />}>
        <ForgotPassword />
      </Suspense>
    ) 
  },
import Blog from './pages/Blog';
import TripCalculatorPage from './pages/TripCalculator';
import CurrencyConverter from './pages/currencyconverter';
import DiscovermoreDestination from './pages/DiscovermoreDestination';
import Feedback from './pages/Feedback';
import TravelPlanGenerator from './pages/TravelPlanGenerator';
import TravelForum from './pages/TravelForum';
import AuthLayout from './components/AuthLayout';
import TrendingSpots from './pages/TrendingSpots.jsx';
import PackingChecklistPage from './pages/PackingChecklist.jsx';

const router = createBrowserRouter([
  { path: '/login', element: <AuthLayout><Login /></AuthLayout> },
  { path: '/signup', element: <AuthLayout><Signup /></AuthLayout> },
  { path: '/forgot-password', element: <AuthLayout><ForgotPassword /></AuthLayout> },
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      { 
        path: '/', 
        element: (
          <Suspense fallback={<Spinner />}>
            <Home />
          </Suspense>
        ) 
      },
      { 
        path: '/about', 
        element: (
          <Suspense fallback={<Spinner />}>
            <About />
          </Suspense>
        ) 
      },
      { 
        path: '/blog', 
        element: (
          <Suspense fallback={<Spinner />}>
            <Blog />
          </Suspense>
        ) 
      },
      { 
        path: '/discover', 
        element: (
          <Suspense fallback={<Spinner />}>
            <Discover />
          </Suspense>
        ) 
      },
      { 
        path: '/trips', 
        element: (
          <Suspense fallback={<Spinner />}>
            <Trips />
          </Suspense>
        ) 
      },
      { 
        path: '/review', 
        element: (
          <Suspense fallback={<Spinner />}>
            <Review />
          </Suspense>
        ) 
      },
      { 
        path: '/contributors', 
        element: (
          <Suspense fallback={<Spinner />}>
            <Contributors />
          </Suspense>
        ) 
      },
      { 
        path: '/hotels', 
        element: (
          <Suspense fallback={<Spinner />}>
            <Hotels />
          </Suspense>
        ) 
      },
      { 
        path: '/hotels/:id', 
        element: (
          <Suspense fallback={<Spinner />}>
            <HotelDetails />
          </Suspense>
        ) 
      },
      { 
        path: '/ticket', 
        element: (
          <Suspense fallback={<Spinner />}>
            <TicketBooking />
          </Suspense>
        ) 
      },
      { 
        path: '/guides', 
        element: (
          <Suspense fallback={<Spinner />}>
            <TravelGuidesCarousel />
          </Suspense>
        ) 
      },
      { 
        path: '/packages', 
        element: (
          <Suspense fallback={<Spinner />}>
            <TravelPackages />
          </Suspense>
        ) 
      },
      { 
        path: '/discovermore', 
        element: (
          <Suspense fallback={<Spinner />}>
            <DiscovermoreDestination />
          </Suspense>
        ) 
      },
      { 
        path: '/faq', 
        element: (
          <Suspense fallback={<Spinner />}>
            <FAQ />
          </Suspense>
        ) 
      },
      { 
        path: '/contact', 
        element: (
          <Suspense fallback={<Spinner />}>
            <Contact />
          </Suspense>
        ) 
      },
      { 
        path: '/privacy', 
        element: (
          <Suspense fallback={<Spinner />}>
            <PrivacyPolicy />
          </Suspense>
        ) 
      },
      { 
        path: '/terms', 
        element: (
          <Suspense fallback={<Spinner />}>
            <TermsAndConditions />
          </Suspense>
        ) 
      },
      { 
        path: '/trip-calculator', 
        element: (
          <Suspense fallback={<Spinner />}>
            <TripCalculatorPage />
          </Suspense>
        ) 
      },
      {
        path: '/hotel-map',
        element: (
          <Suspense fallback={<Spinner message="Loading map..." />}>
              <HotelMapPage />
          </Suspense>
        )
      },
      { path: '/', element: <Home /> },
      {
        path: "/trending-spots", // Add this route
        element: <TrendingSpots />
      },
      {
        path: "/trending", // Alternative route
        element: <TrendingSpots />
      },
      { path: '/about', element: <About /> },
      { path: '/blog', element: <Blog /> },
      { path: '/discover', element: <Discover /> },
      { path: '/currency-converter', element: <CurrencyConverter /> },
      { path: '/trips', element: <Trips /> },
      { path: '/review', element: <Review /> },
      // { path: '/forums', element: <Forums /> },
      { path: '/forum', element: <TravelForum /> }, // ✅ Added this route
      { path: '/contributors', element: <Contributors /> },
      { path: '/hotels', element: <Hotels /> },
      { path: '/hotels/:id', element: <HotelDetails /> },
      { path: '/ticket', element: <TicketBooking /> },
      { path: '/guides', element: <TravelGuidesCarousel /> },
      { path: '/packages', element: <TravelPackages /> },
      { path: '/destinations', element: <DiscovermoreDestination /> },
      { path: '/faq', element: <FAQ /> },
      { path: '/contact', element: <Contact /> },
      { path: '/feedback', element: <Feedback /> },
      { path: '/privacy', element: <PrivacyPolicy /> },
      { path: '/terms', element: <TermsAndConditions /> },
      { path: '/trip-calculator', element: <TripCalculatorPage /> },
      { path: '/travel-plan-generator', element: <TravelPlanGenerator /> },
      { path: '/packing-checklist', element: <PackingChecklistPage /> },
      { path: '/trending-spots', element: <TrendingSpots /> }, // ✅ Add this route
      { path: '/trending', element: <TrendingSpots /> }, // ✅ Alternative route
      {
        path: '/dashboard',
        element: (
          <Suspense fallback={<Spinner />}>
              <Dashboard />
          </Suspense>
        )
      },
      {
        path: '/dashboard/trips',
        element: (
          <Suspense fallback={<Spinner />}>
              <TripsPlanned />
          </Suspense>
        )
      },
      {
        path: '/dashboard/saved',
        element: (
          <Suspense fallback={<Spinner />}>
              <SavedPlaces />
          </Suspense>
        )
      },
      {
        path: '/dashboard/countries',
        element: (
          <Suspense fallback={<Spinner />}>
              <CountriesVisited />
          </Suspense>
        )
      },
      { 
        path: '/network-error', 
        element: (
          <Suspense fallback={<Spinner />}>
            <NetworkError />
          </Suspense>
        ) 
      },
      { 
        path: '/server-error', 
        element: (
          <Suspense fallback={<Spinner />}>
            <ServerError />
          </Suspense>
        ) 
      },
      { 
        path: '*', 
        element: (
          <Suspense fallback={<Spinner />}>
            <NotFound />
          </Suspense>
        ) 
      },
      { 
        path: '/package/:id', 
        element: (
          <Suspense fallback={<Spinner />}>
            <PackageDetails />
          </Suspense>
        ) 
      },
      { 
        path: '/hotel-booking', 
        element: (
          <Suspense fallback={<Spinner />}>
            <HotelBookingPage />
          </Suspense>
        ) 
      },
      { path: '/network-error', element: <NetworkError /> },
      { path: '/server-error', element: <ServerError /> },
      { path: '*', element: <NotFound /> },
      { path: '/package/:id', element: <PackageDetails /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <MapProvider>
      <GoogleOAuthProvider clientId="1047267709802-k05pdjqojcal19h24fd75opev1evaf6j.apps.googleusercontent.com">
        <AuthProvider>
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
        </AuthProvider>
      </GoogleOAuthProvider>
    </ErrorBoundary>
  </StrictMode>
);