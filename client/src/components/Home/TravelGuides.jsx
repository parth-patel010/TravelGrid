import React from "react";

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

const TravelGuides = () => (
  <section className="w-full bg-gradient-to-br from-blue-50 to-pink-50 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 text-center">
        Meet Our Top Travel Guides
      </h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {guides.map((guide, i) => (
          <div
            key={i}
            className="
              min-w-full max-w-full
              md:min-w-[260px] md:max-w-xs
              bg-gradient-to-br from-blue-100 to-pink-100
              rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300
              overflow-hidden flex-shrink-0 flex flex-col items-center p-6
            "
          >
            <img
              src={guide.image}
              alt={guide.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-pink-400 mb-4"
            />
            <h3 className="text-lg font-semibold mb-1 text-gray-800">{guide.name}</h3>
            <p className="text-pink-600 text-sm font-medium mb-1">{guide.expertise}</p>
            <p className="text-gray-600 text-sm mb-4 text-center">{guide.bio}</p>
            <button className="bg-zinc-800 hover:bg-zinc-900 text-white font-semibold py-2 px-4 rounded-xl transition-colors duration-200 transform hover:scale-105">
              View Profile
            </button>
          </div>
        ))}
        <style>{`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    </div>
  </section>
);

export default TravelGuides;
