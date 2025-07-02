import React from 'react';

const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center bg-pink-200 rounded-xl mt-10 mx-2 md:mx-20 p-6 md:p-12 gap-8">
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
        alt="Travel"
        className="w-full md:w-1/2 rounded-lg shadow-lg object-cover h-64 md:h-80"
      />
      <div className="flex-1 flex flex-col justify-center items-start">
        <h2 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-4">Book the best part of your trip</h2>
        <p className="text-lg text-green-900 mb-6">Browse unforgettable things to do—right here. Find hotels, restaurants, and more for your next adventure with Travel Grid.</p>
        <button className="bg-green-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-800">Start Exploring</button>
      </div>
    </section>
  );
};

export default HeroSection; 