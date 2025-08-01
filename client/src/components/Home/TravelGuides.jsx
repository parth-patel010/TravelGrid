import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const guides = [
  {
    name: "Aarav Mehta",
    expertise: "Himalayan Treks",
    bio: "Certified mountain guide with 10+ years of experience leading treks in the Indian Himalayas.",
    image: "https://randomuser.me/api/portraits/men/51.jpg",
  },
  {
    name: "Sofia Rossi",
    expertise: "Italian Cities & Culture",
    bio: "Passionate about art, food, and history. Fluent in English and Italian. Rome-based.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "James Carter",
    expertise: "African Safaris",
    bio: "Wildlife expert and safari guide, specializing in Kenya and Tanzania national parks.",
    image: "https://randomuser.me/api/portraits/men/34.jpg",
  },
  {
    name: "Mei Lin",
    expertise: "East Asia Tours",
    bio: "Licensed guide for Japan, China, and South Korea. Loves sharing local traditions and cuisine.",
    image: "https://randomuser.me/api/portraits/women/43.jpg",
  },
];

const TravelGuides = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const prev = () => setIndex((index - 1 + guides.length) % guides.length);
  const next = () => setIndex((index + 1) % guides.length);

  const getVisibleIndices = () => {
    const left = (index - 1 + guides.length) % guides.length;
    const center = index;
    const right = (index + 1) % guides.length;
    return [left, center, right];
  };

  const handleguide = (name) => {
    navigate("/guides", { state: { selectedGuideId: name } });
  };

  return (
    <section className="w-full bg-gradient-to-br from-[#f5ede3] to-[#e8ddd1] py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-10">
          Meet Our Top Travel Guides
        </h2>

        <div className="relative">
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-[#f3e7da] hover:shadow-lg"
          >
            <ChevronLeft className="w-6 h-6 text-[#a9673b]" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-[#f3e7da] hover:shadow-lg"
          >
            <ChevronRight className="w-6 h-6 text-[#a9673b]" />
          </button>

          <div className="overflow-hidden px-12">
            <div className="flex justify-center gap-6">
              {getVisibleIndices().map((i, pos) => {
                const guide = guides[i];
                const isCenter = i === index;

                return (
                  <motion.div
                    key={guide.name}
                    initial={{
                      opacity: 0,
                      scale: 0.85,
                      x: pos === 0 ? -100 : pos === 2 ? 100 : 0,
                    }}
                    animate={{
                      opacity: 1,
                      scale: isCenter ? 1 : 0.9,
                      x: 0,
                    }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{
                      y: -10,
                      boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.25)",
                    }}
                    className={`flex-shrink-0 w-[280px] md:w-[300px] h-[400px] bg-gradient-to-br from-[#f1e3d3] to-[#f4e8da] rounded-2xl p-4 flex flex-col items-center transition-all duration-100 ease-in-out cursor-pointer ${
                      isCenter ? "z-10 scale-100" : "opacity-80"
                    }`}
                  >
                    {/* Card Content */}
                    <div className="flex flex-col items-center text-center flex-grow justify-center relative">
                      <img
                        src={guide.image}
                        alt={guide.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-[#d4976c] mb-1 mt-[-8px]"
                      />
                      <h3 className="text-[18px] font-semibold text-gray-900 mb-1">
                        {guide.name}
                      </h3>
                      <p className="text-[#b26a3b] text-[15px] font-medium mb-1">
                        {guide.expertise}
                      </p>
                      <p className="text-gray-700 text-[15px] leading-snug px-2 mb-2">
                        {guide.bio}
                      </p>
                    </div>

                    {/* Button slightly moved up */}
                    <div className="mt-2 mb-1">
                      <button
                        onClick={() => handleguide(guide.name)}
                        className="bg-zinc-800 hover:bg-zinc-900 text-white text-sm font-medium py-2 px-5 rounded-xl transition-transform transform hover:scale-105"
                      >
                        View Profile
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelGuides;
