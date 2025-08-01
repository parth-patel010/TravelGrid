import React from "react";

const testimonials = [
  {
    name: "Amit P.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    review: "TravelGrid made my trip planning effortless and fun! Highly recommended.",
    rating: 5,
  },
  {
    name: "Sara L.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    review: "The curated guides and easy booking saved me so much time.",
    rating: 5,
  },
  {
    name: "John D.",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    review: "Loved the user community and support. Will use again!",
    rating: 4,
  },
  {
    name: "Priya S.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    review: "A beautiful, intuitive platform for all my travel needs.",
    rating: 5,
  },
];

const Testimonials = () => (
  <section className="w-full bg-gradient-to-br from-yellow-900 via-zinc-900 to-neutral-950 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
        What Our Users Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col items-center text-center text-white"
          >
            <img
              src={t.avatar}
              alt={t.name}
              className="w-16 h-16 rounded-full mb-4 object-cover border-2 border-yellow-400"
            />
            <h3 className="text-lg font-semibold mb-1 text-white">{t.name}</h3>
            <p className="text-white/80 text-sm mb-3">{t.review}</p>
            <div className="flex gap-1 mb-1">
              {[...Array(5)].map((_, idx) => (
                <svg
                  key={idx}
                  className={`w-5 h-5 ${idx < t.rating ? 'text-yellow-400' : 'text-gray-400'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
                </svg>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials; 