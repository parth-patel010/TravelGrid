import { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import TravelCard from '../components/TravelCard';
import { FaHeart, FaPlaneDeparture, FaMapMarkedAlt } from 'react-icons/fa';

const ITEMS_PER_PAGE = 6;

const Wishlist = () => {
  const { wishlist } = useWishlist();
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(wishlist.length / ITEMS_PER_PAGE);
  const startIdx = (page - 1) * ITEMS_PER_PAGE;
  const paginated = wishlist.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  return (
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
          </div>
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              className="px-4 py-2 rounded bg-pink-700 text-white disabled:opacity-50"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Prev
            </button>
            <span className="text-white">
              Page {page} of {totalPages}
            </span>
            <button
              className="px-4 py-2 rounded bg-pink-700 text-white disabled:opacity-50"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;
