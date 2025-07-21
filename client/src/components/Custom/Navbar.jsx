import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full bg-white shadow-sm py-3 px-4 fixed top-0 left-0 z-30">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold text-black tracking-tight">
          TravelGrid
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-6 items-center">
          <Link to="/" className="text-black hover:text-pink-500 font-medium transition-colors">Home</Link>
          <Link to="/ticket" className="text-black hover:text-pink-500 font-medium transition-colors">Ticket</Link>
          <Link to="/packages" className="text-black hover:text-pink-500 font-medium transition-colors">Packages</Link>
          <Link to="/hotels" className="text-black hover:text-pink-500 font-medium transition-colors">Hotels</Link>
          <Link to="/guides" className="text-black hover:text-pink-500 font-medium transition-colors">Guides</Link>
          <Link to="/contact" className="text-black hover:text-pink-500 font-medium transition-colors">Contact</Link>
          <button className="ml-4 bg-zinc-800 hover:bg-zinc-900 text-white px-5 py-2 rounded-lg font-semibold transition-colors">Login</button>
        </div>

        {/* Tablet Menu (hidden on mobile and desktop) */}
        <div className="hidden md:flex lg:hidden gap-4 items-center">
          <Link to="/" className="text-black hover:text-pink-500 font-medium transition-colors text-sm">Home</Link>
          <Link to="/ticket" className="text-black hover:text-pink-500 font-medium transition-colors text-sm">Ticket</Link>
          <Link to="/packages" className="text-black hover:text-pink-500 font-medium transition-colors text-sm">Packages</Link>
          <Link to="/hotels" className="text-black hover:text-pink-500 font-medium transition-colors text-sm">Hotels</Link>
          <button className="bg-zinc-800 hover:bg-zinc-900 text-white px-3 py-1.5 rounded-lg font-semibold transition-colors text-sm">Login</button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 bg-transparent border-none cursor-pointer"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-black mt-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-black mt-1 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="pt-4 pb-2 space-y-3 border-t border-gray-100 mt-3 max-h-96 overflow-y-auto">
          <Link 
            to="/" 
            className="block text-black hover:text-pink-500 font-medium transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/ticket" 
            className="block text-black hover:text-pink-500 font-medium transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Ticket
          </Link>
          <Link 
            to="/packages" 
            className="block text-black hover:text-pink-500 font-medium transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Packages
          </Link>
          <Link 
            to="/hotels" 
            className="block text-black hover:text-pink-500 font-medium transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Hotels
          </Link>
          <Link 
            to="/guides" 
            className="block text-black hover:text-pink-500 font-medium transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Guides
          </Link>
          <Link 
            to="/contact" 
            className="block text-black hover:text-pink-500 font-medium transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <button 
            className="w-full bg-zinc-800 hover:bg-zinc-900 text-white px-5 py-3 rounded-lg font-semibold transition-colors mt-4"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;