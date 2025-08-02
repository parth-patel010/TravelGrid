import { useState } from 'react';
import HotelMap from './HotelMap';
import hotelsData from '../data/hotels';

const HotelMapPage = () => {
  return (
    <div className="min-h-screen bg-black pt-28 pb-20 px-4"> {/* ⬅️ added pt-40 instead of py-20 */}
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold text-pink-500 mb-4 leading-tight tracking-wide">
          ✨ Discover Luxury Hotels Across the Globe
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Explore iconic destinations. Click on a marker to reveal stunning hotel details and real-time weather info.
        </p>
      </div>

      <div className="max-w-6xl mx-auto rounded-2xl shadow-2xl overflow-hidden border border-pink-500">
        <HotelMap hotels={hotelsData} />
      </div>
    </div>
  );
};

export default HotelMapPage;
