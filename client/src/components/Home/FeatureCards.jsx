import React from "react";

const features = [
  {
    icon: "💸",
    title: "Great Prices",
    desc: "Save more on every trip."
  },
  {
    icon: "❤️",
    title: "Loved by Travelers",
    desc: "Trusted by thousands worldwide."
  },
  {
    icon: "✈️",
    title: "Easy Booking",
    desc: "Book flights and hotels in seconds."
  },
  {
    icon: "🤝",
    title: "24/7 Support",
    desc: "We’re here whenever you need us."
  }
];

const FeatureCards = () => {
  return (
    <section className="w-full max-w-5xl mx-auto my-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((f, i) => (
          <div
            className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center border border-gray-100"
            key={i}
          >
            <div className="text-3xl mb-2">{f.icon}</div>
            <h3 className="text-base font-semibold mb-1">{f.title}</h3>
            <p className="text-gray-500 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards; 