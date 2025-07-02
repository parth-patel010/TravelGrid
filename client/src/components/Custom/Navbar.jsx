import React from 'react';
import { Button } from '../ui/button';

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between px-4 py-3 bg-white shadow-md">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-green-700">Travel Grid</span>
      </div>
      <div className="hidden md:flex gap-6 items-center">
        <a href="/" className="text-gray-700 hover:text-green-700 font-medium">Home</a>
        <a href="/discover" className="text-gray-700 hover:text-green-700 font-medium">Discover</a>
        <a href="/trips" className="text-gray-700 hover:text-green-700 font-medium">Trips</a>
        <a href="/review" className="text-gray-700 hover:text-green-700 font-medium">Review</a>
        <a href="/forums" className="text-gray-700 hover:text-green-700 font-medium">Forums</a>
        <a href="/signin">
          <Button className="ml-4 bg-black hover:bg-gray-900 text-white px-6 py-2">Sign In</Button>
        </a>
      </div>
      {/* Mobile menu icon */}
      <div className="md:hidden">
        <button>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
