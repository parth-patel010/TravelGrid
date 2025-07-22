import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Custom/Navbar';
import Footer from '../components/Custom/Footer';
import hotels from '../data/hotels';

function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotel = hotels.find((h) => h.id === id);

  if (!hotel) {
    return (
      <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-black to-pink-900 text-white">
        <Navbar />
        <main className="flex flex-col flex-1 items-center justify-center">
          <h2 className="text-3xl font-bold mb-4">Hotel not found</h2>
          <button
            onClick={() => navigate('/hotels')}
            className="bg-gradient-to-r from-pink-600 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Hotels
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-black to-pink-900 overflow-x-hidden">
      <Navbar />
      <main className="flex flex-col flex-1 w-full items-center">
        {/* Hero image */}
        <section className="relative w-full h-72 md:h-96 overflow-hidden">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2">
              {hotel.name}
            </h1>
            <span className="text-pink-300 text-lg md:text-xl">
              {hotel.location}
            </span>
          </div>
        </section>

        {/* Details */}
        <section className="max-w-4xl w-full px-4 py-12 text-pink-100">
          <h2 className="text-2xl font-bold mb-4 text-white">About</h2>
          <p className="leading-relaxed mb-8 text-pink-200 whitespace-pre-line">
            {hotel.description}
          </p>

          <button
            onClick={() => alert('Booking functionality coming soon!')}
            className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Proceed to Book
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default HotelDetails; 