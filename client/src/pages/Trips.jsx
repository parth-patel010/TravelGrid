import React from 'react';
import { useNavigate } from 'react-router-dom';

function Trips() {
  const navigate = useNavigate();

  return (
    <div className="pt-20 w-full min-h-screen flex flex-col items-center pt-16 px-4 bg-gray-50 text-center relative bg-gradient-to-br from-black to-pink-900 text-white">
      <h2 className="text-4xl font-bold bg-gradient-to-br from-pink-1200 to-pink-500 bg-clip-text text-transparent">Need help in planning trip, we are there for you!</h2>
      {/* First Row: Book Ticket & Explore Packages */}
      <div className=" pt-16 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mb-10">
        {/* Section 1: Book a Ticket */}
        <section className="bg-white shadow-lg p-6 rounded-2xl">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Do you want to book a ticket?</h3>
          <button 
            onClick={() => navigate('/ticket')}
            className="mt-4 px-6 py-2 bg-pink-900 text-white rounded-xl hover:bg-gradient-to-br from-black to-pink-900"
          >
            Go to Booking Page
          </button>
        </section>

        {/* Section 2: Explore Packages */}
        <section className="bg-white shadow-lg p-6 rounded-2xl ">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Interested in exploring our packages?</h3>
          <button 
            onClick={() => navigate('/packages')}
            className="mt-4 px-6 py-2 bg-pink-900 text-white rounded-xl hover:bg-gradient-to-br from-black to-pink-900"
          >
            View Packages
          </button>
        </section>
      </div>

      {/* Second Row: Book Hotel & Consult Guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* Section 3: Book a Hotel */}
        <section className="bg-white shadow-lg p-6 rounded-2xl">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Want to book a hotel?</h3>
          <button 
            onClick={() => navigate('/hotels')}
            className="mt-4 px-6 py-2 bg-pink-900 text-white rounded-xl hover:bg-gradient-to-br from-black to-pink-900"
          >
            Book a Hotel
          </button>
        </section>

        {/* Section 4: Consult a Guide */}
        <section className="bg-white shadow-lg p-6 rounded-2xl">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Need a guide for your trip?</h3>
          <button 
            onClick={() => navigate('/guides')}
            className="mt-4 px-6 py-2 bg-pink-900 text-white rounded-xl hover:bg-gradient-to-br from-black to-pink-900"
          >
            Consult a Guide
          </button>
        </section>
      </div>
    </div>
  );
}

export default Trips;
