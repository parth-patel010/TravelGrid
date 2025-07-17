import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-sm py-3 px-4 flex items-center justify-between fixed top-0 left-0 z-30">
      <div className="text-2xl font-bold text-blue-700 tracking-tight">
        TravelGrid
      </div>
      <div className="flex gap-6 items-center">
        <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</Link>
        <Link to="/trips" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Trips</Link>
        <Link to="/various" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Various</Link>
        <Link to="/discover" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Discover</Link>
        <Link to="/forums" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Forums</Link>
      </div>
    </nav>
  );
};

export default Navbar;
