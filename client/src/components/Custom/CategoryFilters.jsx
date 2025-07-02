import React from 'react';

const categories = [
  { label: 'Search All', icon: '🏠', active: true },
  { label: 'Hotels', icon: '🏨' },
  { label: 'Things to Do', icon: '📸' },
  { label: 'Restaurants', icon: '🍽️' },
  { label: 'Flights', icon: '✈️' },
  { label: 'Holiday Homes', icon: '🏡' },
];

const CategoryFilters = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      {categories.map((cat) => (
        <button
          key={cat.label}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border font-medium transition-all ${cat.active ? 'bg-green-100 border-green-500 text-green-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-green-50'}`}
        >
          <span>{cat.icon}</span>
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilters; 