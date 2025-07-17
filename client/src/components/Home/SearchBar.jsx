import React, { useState } from "react";

const categories = [
  { label: "All Categories", value: "" },
  { label: "Restaurants", value: "restaurants" },
  { label: "Events", value: "events" },
  { label: "Shopping", value: "shopping" },
];

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ location, category });
    }
  };

  return (
    <form
      className="flex justify-center items-center gap-4 bg-white rounded-full shadow-md px-6 py-2 mb-5"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Ex: Borivali, Mumbai, India"
        className="border-none outline-none px-4 py-2 rounded-full text-base bg-gray-100 w-56"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <select
        className="border-none outline-none px-4 py-2 rounded-full text-base bg-gray-100 w-40"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-8 py-2 text-base font-semibold transition-colors"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar; 