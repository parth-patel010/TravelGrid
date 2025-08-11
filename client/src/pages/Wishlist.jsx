import { useState, useEffect } from 'react';
import { useWishlist } from '../context/WishlistContext';
<<<<<<< HEAD
import TravelCard from '../components/TravelCard';
import { FaHeart, FaPlaneDeparture, FaMapMarkedAlt } from 'react-icons/fa';
=======
import WishlistCard from '../components/WishlistCard';
import { Heart, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Custom/Navbar';
import { useTheme } from '../context/ThemeContext';
>>>>>>> 0531bfd256309dd4115a08a67209b078fe86e76c

const ITEMS_PER_PAGE = 6;

const Wishlist = () => {
  const { wishlist } = useWishlist();
  const [page, setPage] = useState(1);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Add animation effect when component mounts
    setAnimate(true);

    // Reset page to 1 when wishlist changes
    setPage(1);
  }, [wishlist.length]);

  const totalPages = Math.ceil(wishlist.length / ITEMS_PER_PAGE);
  const startIdx = (page - 1) * ITEMS_PER_PAGE;
  const paginated = wishlist.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const handleNavigateToTrending = () => {
    navigate('/trending-spots');
  };

  return (
<<<<<<< HEAD
    <div className="p-6 min-h-screen bg-gradient-to-br from-black via-gray-900 to-pink-900 pt-20">
      {wishlist.length === 0 ? (
      
        <div className="flex flex-col md:flex-row h-[80vh] px-4 md:px-12 gap-6 mt-8">
          {/* LEFT HALF */}
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-pink-900 rounded-3xl overflow-hidden shadow-lg">
            <div className="max-w-lg p-8 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-6">
                <FaHeart className="text-pink-400 text-5xl" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Your Wishlist Awaits</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Every adventure starts with a dream. This is your personal space to collect
                the destinations that inspire you, the places you want to see, and the
                experiences you can’t wait to live.
              </p>
             
            </div>
          </div>

          {/* RIGHT HALF */}
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-pink-900 rounded-3xl shadow-lg">
            <div className="p-10 text-center max-w-lg">
              <div className="flex justify-center gap-6 mb-6">
                <div className="w-20 h-20 rounded-full bg-pink-500 flex items-center justify-center shadow-lg">
                  <FaPlaneDeparture className="text-white text-2xl" />
                </div>
                <div className="w-20 h-20 rounded-full bg-pink-400 flex items-center justify-center shadow-lg">
                  <FaMapMarkedAlt className="text-white text-2xl" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">Save Now, Travel Later</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Find amazing destinations, save them here, and we’ll help you plan
                the perfect trip when the time comes. From hidden beaches to bustling
                cities, your next adventure is just a click away.
              </p>
              <a
                href="https://travel-grid.vercel.app/trending-spots"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg transform hover:-translate-y-0.5 transition text-center"
              >
                Explore Popular Destinations
              </a>
            </div>
          </div>
        </div>
      ) : (
       
        <>
          <h2 className="text-2xl font-bold mb-4 text-white">Your Wishlist</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {paginated.map((pkg) => (
              <TravelCard key={pkg.id} pkg={pkg} />
            ))}
=======
    <div className="min-h-screen transition-colors duration-300" 
      style={{ 
        background: isDarkMode ? 'var(--bg-primary)' : 'linear-gradient(to right bottom, #f9fafb, #f3f4f6)', 
        color: 'var(--text-primary)'
      }}
    >
      <Navbar lightBackground />

      {/* Hero Section */}
      <div className="pt-24 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center transition-all duration-700 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex justify-center mb-4">
              <div className="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-full">
                <Heart className="h-8 w-8 text-pink-600 dark:text-pink-400" fill="currentColor" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Your <span className="text-pink-600 dark:text-pink-400">Wishlist</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              All your favorite destinations saved in one place for your future adventures.
            </p>
>>>>>>> 0531bfd256309dd4115a08a67209b078fe86e76c
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          {wishlist.length === 0 ? (
            <div className={`text-center py-16 rounded-xl bg-white dark:bg-gray-800 shadow-md transition-all duration-700 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex justify-center mb-6">
                <Heart className="h-16 w-16 text-gray-300 dark:text-gray-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                Your wishlist is empty
              </h3>
              <p className="text-md max-w-md mx-auto mb-6" style={{ color: 'var(--text-secondary)' }}>
                Start saving your dream destinations to plan your next adventure!
              </p>
              <button 
                onClick={handleNavigateToTrending}
                className="inline-flex items-center px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-full font-medium transition-colors duration-200"
              >
                <TrendingUp className="h-5 w-5 mr-2" />
                Explore Trending Spots
              </button>
            </div>
          ) : (
            <>
              <div className={`mb-8 transition-all duration-700 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                    Saved Destinations ({wishlist.length})
                  </h2>
                  <button 
                    onClick={handleNavigateToTrending}
                    className="text-sm flex items-center text-pink-600 dark:text-pink-400 hover:underline"
                  >
                    <TrendingUp className="h-4 w-4 mr-1" />
                    View Trending
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginated.map((item, index) => (
                    <div 
                      key={item.id} 
                      className={`transition-all duration-700 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <WishlistCard item={item} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-10">
                    <button
                      className="px-4 py-2 rounded-full bg-white dark:bg-gray-800 text-pink-600 dark:text-pink-400 shadow-md hover:shadow-lg disabled:opacity-50 disabled:shadow-none transition-shadow flex items-center"
                      onClick={() => setPage(page - 1)}
                      disabled={page === 1}
                    >
                      <ChevronLeft className="h-5 w-5 mr-1" />
                      <span>Previous</span>
                    </button>
                    <span className="text-sm font-medium px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-md" style={{ color: 'var(--text-primary)' }}>
                      Page {page} of {totalPages}
                    </span>
                    <button
                      className="px-4 py-2 rounded-full bg-white dark:bg-gray-800 text-pink-600 dark:text-pink-400 shadow-md hover:shadow-lg disabled:opacity-50 disabled:shadow-none transition-shadow flex items-center"
                      onClick={() => setPage(page + 1)}
                      disabled={page === totalPages}
                    >
                      <span>Next</span>
                      <ChevronRight className="h-5 w-5 ml-1" />
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
