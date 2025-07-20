import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-sm py-3 px-4 flex items-center justify-between fixed top-0 left-0 z-30">
      <div className="text-2xl font-bold text-black tracking-tight">
        TravelGrid
      </div>
      <div className="flex gap-6 items-center">
        <Link to="/" className="text-black hover:text-pink-500 font-medium transition-colors">Home</Link>
        <Link to="/ticket" className="text-black hover:text-pink-500 font-medium transition-colors">Ticket</Link>
        <Link to="/packages" className="text-black hover:text-pink-500 font-medium transition-colors">Packages</Link>
        <Link to="/hotels" className="text-black hover:text-pink-500 font-medium transition-colors">Hotels</Link>
        <Link to="/guides" className="text-black hover:text-pink-500 font-medium transition-colors">Guides</Link>
        <Link to="/contact" className="text-black hover:text-pink-500 font-medium transition-colors">Contact</Link>
        <button className="ml-4 bg-zinc-800 hover:bg-zinc-900 text-white px-5 py-2 rounded-lg font-semibold transition-colors">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
