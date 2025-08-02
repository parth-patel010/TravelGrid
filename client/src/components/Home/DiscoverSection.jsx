import React from "react";
import { useNavigate } from "react-router-dom";
import DiscoverCard from "../DiscoverCard.jsx";

const destinations = [
  {
    name: "Manali, Himachal",
    description: "A beautiful hill station known for its scenic beauty and adventure sports.",
    image: "https://images.unsplash.com/photo-1712388430474-ace0c16051e2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuYWxpfGVufDB8fDB8fHww"
  },
  {
    name: "Jaipur, Rajasthan",
    description: "The Pink City with rich history, forts, and vibrant culture.",
    image: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFpcHVyfGVufDB8fDB8fHww"
  },
  {
    name: "Goa",
    description: "Popular beach destination with nightlife, water sports, and culture.",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29hfGVufDB8fDB8fHww"
  },
  {
    name: "Rishikesh, Uttarakhand",
    description: "The yoga capital of the world, nestled on the banks of the Ganges.",
    image: "https://plus.unsplash.com/premium_photo-1697730398251-40cd8dc57e0b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmlzaGlrZXNofGVufDB8fDB8fHww"
  },
];

const DiscoverSection = () => {
  const navigate = useNavigate();

  const handleBookNowClick = () => {
    navigate(`/package/${pkg.id}`);
  };

  const handleDiscoverMore = () => {
    navigate("/destinations")
  }

  return (
    <section className="w-full py-20 text-center">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">New Destinations</span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg mb-10 leading-relaxed">
            Explore trending places, hidden gems, and must-visit spots curated just for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-2 mb-16">
          {destinations.map((place, index) => (
            <DiscoverCard key={index} index={index} place={place} handleBookNowClick={() => navigate(`/package/${index+5}`)} />
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-white">
            Ready to plan your next adventure?
          </h3>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Discover more travel ideas, tips, and personalized recommendations.
          </p>
          <button
            onClick={handleDiscoverMore}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium rounded-full shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Discover More Destinations
          </button>
        </div>
      </div>
    </section>
  );
};

export default DiscoverSection;
