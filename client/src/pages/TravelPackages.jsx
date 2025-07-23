import React from 'react';

const packages = [
  {
    id: 1,
    title: "Tropical Paradise – Maldives",
    price: "₹49,999",
    duration: "5 Days / 4 Nights",
    image: "https://plus.unsplash.com/premium_photo-1692897456929-5774bd1c8e28?q=80&w=2090&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "European Explorer – Italy & France",
    price: "₹89,999",
    duration: "7 Days / 6 Nights",
    image: "https://images.unsplash.com/photo-1533333980833-8340a468dfec?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Desert Delight – Dubai",
    price: "₹59,999",
    duration: "4 Days / 3 Nights",
    image: "https://images.unsplash.com/photo-1624664929067-5bc278a7c57e?q=80&w=1195&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title: "Himalayan Adventure – Manali",
    price: "₹19,999",
    duration: "6 Days / 5 Nights",
    image: "https://plus.unsplash.com/premium_photo-1661964400999-264ce5993f8d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const TravelPackages = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-black to-pink-900 overflow-x-hidden">
      <main className="flex flex-col flex-1 w-full items-center">
        {/* Header Section */}
        <section className="w-full py-24 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Discover Our <span className="text-pink-400">Travel Packages</span>
          </h1>
          <p className="text-lg md:text-xl text-pink-200 max-w-2xl mx-auto">
            Handpicked vacation deals crafted for unforgettable experiences.
          </p>
        </section>

        {/* Package Grid */}
        <section className="max-w-7xl w-full px-4 pb-16 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="backdrop-blur-sm bg-white/5 border border-pink-400/20 rounded-2xl shadow-xl overflow-hidden flex flex-col"
            >
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-56 object-cover object-center"
              />
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-semibold text-white mb-1">
                  {pkg.title}
                </h3>
                <span className="text-pink-300 font-medium mb-2">
                  {pkg.duration}
                </span>
                <p className="text-pink-200 font-semibold mb-4">
                  {pkg.price}
                </p>
                <button
                  className="mt-auto self-start bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white px-5 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default TravelPackages;
