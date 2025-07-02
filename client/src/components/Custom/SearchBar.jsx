import React from 'react';

const SearchBar = () => {
  return (
    <form className="flex w-full max-w-2xl mx-auto mt-6 shadow-md rounded-full overflow-hidden bg-white">
      <input
        type="text"
        placeholder="Places to go, things to do, hotels..."
        className="flex-1 px-4 py-3 outline-none text-gray-700"
      />
      <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 font-semibold">
        Search
      </button>
    </form>
  );
};

export default SearchBar; 