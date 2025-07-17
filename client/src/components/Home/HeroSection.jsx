import React from "react";
import SearchBar from "./SearchBar";
import CategoryFilters from "./CategoryFilters";

const HeroSection = ({ onSearch }) => {
  return (
    <section className="relative w-screen min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#eaf6fb]">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center opacity-85 z-10" />
      <div className="relative z-20 text-center text-white max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">
          Explore <span className="text-yellow-400">your amazing city</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 font-normal">Find great places to stay, eat, shop, or visit from local experts</p>
        <SearchBar onSearch={onSearch} />
        <CategoryFilters />
      </div>
    </section>
  );
};

export default HeroSection; 