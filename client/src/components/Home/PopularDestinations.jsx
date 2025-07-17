import React from "react";

const destinations = [
  {
    name: "Paris",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80",
    desc: "The city of lights, romance, and art.",
    category: "shopping"
  },
  {
    name: "Tokyo",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    desc: "A vibrant blend of tradition and technology.",
    category: "events"
  },
  {
    name: "New York",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    desc: "The city that never sleeps.",
    category: "restaurants"
  },
  {
    name: "Sydney",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&q=80",
    desc: "Famous for its harbourfront Sydney Opera House.",
    category: "events"
  }
];

const PopularDestinations = ({ filter }) => {
  const filtered = destinations.filter(dest => {
    const matchLocation = !filter?.location || dest.name.toLowerCase().includes(filter.location.toLowerCase());
    const matchCategory = !filter?.category || filter.category === "" || dest.category === filter.category;
    return matchLocation && matchCategory;
  });

  return (
    <section className="w-full max-w-5xl mx-auto my-12 px-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-700 text-center">Popular Destinations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">No destinations found.</div>
        ) : (
          filtered.map((dest, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <img src={dest.image} alt={dest.name} className="w-full h-40 object-cover" />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold mb-1">{dest.name}</h3>
                <p className="text-gray-600 text-sm">{dest.desc}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default PopularDestinations; 