import React, { useState } from "react";
import Typewriter from "typewriter-effect";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import TravelTips from "../TravelTips"; // ✅ Add this import

const HeroSection = ({ onSearch }) => {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("All Categories");
  const { isDarkMode } = useTheme();

  const handleSearch = () => {
    const isLoggedIn = false;

    if (!isLoggedIn) {
      toast.error("Please sign in to search for destinations.");
      return;
    }

    onSearch({ location, category });
  };

  const categories = [
    "All Categories",
    "Restaurants",
    "Hotels",
    "Events",
    "Shopping",
    "Attractions",
    "Transportation"
  ];

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full min-h-[90vh] flex items-center justify-center py-20 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50 z-10"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1695045038427-3acc1c0df23c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fG5pZ2h0JTIwYmVhY2h8ZW58MHx8MHx8fDA%3D')",
          }}
        ></div>

        <div className={`absolute inset-0 z-15 ${
          isDarkMode 
            ? 'bg-gradient-to-b from-black/60 via-black/40 to-black/70' 
            : 'bg-gradient-to-b from-black/30 via-black/20 to-black/50'
        }`} />

        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">

            {/* Left Text Side */}
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex-1 text-center lg:text-left text-white"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight font-[Playfair Display]">
                Explore&nbsp;
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 inline-block min-h-[1.5em]">
                  <Typewriter
                    options={{
                      strings: ['Restaurants!', 'Events!', 'Shopping!', 'Hotels!', 'Your City!'],
                      autoStart: true,
                      loop: true,
                      delay: 50,
                      deleteSpeed: 20,
                    }}
                  />
                </span>
              </h1>

              <p className="text-lg md:text-xl mb-8 font-medium text-gray-200 max-w-2xl font-[Poppins] leading-relaxed">
                Find great places to stay, eat, shop, or visit from local experts. Discover hidden gems and create unforgettable memories.
              </p>
            </motion.div>

            {/* Right Search Box Side */}
            <motion.div
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex-1 w-full max-w-md"
            >
              <div className={`backdrop-blur-md rounded-2xl shadow-2xl p-6 space-y-4 border transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-white/10 border-white/20' 
                  : 'bg-white/90 border-white/30'
              }`}>
                <div className="space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ex: Borivali, Mumbai, India"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className={`w-full px-4 py-3 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-white/90 text-gray-700 placeholder-gray-500 border-white/30' 
                          : 'bg-white/90 text-gray-700 placeholder-gray-500 border-white/30'
                      }`}
                    />
                  </div>

                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className={`w-full px-4 py-3 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent appearance-none transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-white/90 text-gray-700 border-white/30' 
                          : 'bg-white/90 text-gray-700 border-white/30'
                      }`}
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSearch}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 ease-in-out transform cursor-pointer shadow-lg hover:shadow-xl"
                  >
                    Search
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ✅ Travel Tips Section */}
      <div className="mt-12">
        <TravelTips city={location} />
      </div>
    </>
  );
};

export default HeroSection;