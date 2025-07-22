import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Custom/Navbar';
import Footer from '../components/Custom/Footer';
import hotels from '../data/hotels';


function Hotels() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const filteredHotels = hotels.filter((hotel) => {
    const q = query.toLowerCase();
    return (
      hotel.name.toLowerCase().includes(q) ||
      hotel.location.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-black to-pink-900 overflow-x-hidden">
      {/* <Navbar /> */}
      <main className="flex flex-col flex-1 w-full items-center">
        {/* Hero + Search */}
        <section className="w-full py-24 flex flex-col items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Explore World-Class <span className="text-pink-400">Hotels</span>
          </h1>
          <p className="text-lg md:text-xl text-pink-200 max-w-2xl">
            Browse and book from our curated list of the top luxury hotels worldwide.
          </p>
          <div className="mt-8 w-full max-w-lg">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by hotel or destination..."
              className="w-full px-6 py-3 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-pink-500/30"
            />
          </div>
        </section>

        {/* Hotel List */}
        <section className="max-w-7xl w-full px-4 pb-16 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="backdrop-blur-sm bg-white/5 border border-pink-400/20 rounded-2xl shadow-xl overflow-hidden flex flex-col"
            >
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-56 object-cover object-center"
              />
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-semibold text-white mb-1">
                  {hotel.name}
                </h3>
                <span className="text-pink-300 font-medium mb-3">
                  {hotel.location}
                </span>
                <p className="text-sm text-pink-200 line-clamp-3 flex-1">
                  {hotel.description}
                </p>
                <button
                  onClick={() => navigate(`/hotels/${hotel.id}`)}
                  className="mt-4 self-start bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white px-5 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Book Hotel
                </button>
              </div>
            </div>
          ))}
          {filteredHotels.length === 0 && (
            <p className="col-span-full text-center text-pink-200">
              No hotels match your search.
            </p>
          )}
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default Hotels; 