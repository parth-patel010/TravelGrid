import React from "react";

const categories = [
  { label: "Restaurants", value: "restaurants" },
  { label: "Events", value: "events" },
  { label: "Shopping", value: "shopping" },
];

const CategoryFilters = () => {
  return (
    <div className="flex justify-center gap-4 mb-6">
      {categories.map((cat) => (
        <button
          key={cat.value}
          className="bg-white text-gray-800 border border-gray-200 rounded-full px-6 py-2 text-base font-medium transition-colors hover:bg-rose-500 hover:text-white hover:border-rose-500"
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilters; 