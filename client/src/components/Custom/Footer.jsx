import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t mt-8 py-6 flex flex-col md:flex-row items-center justify-between px-4 md:px-16 text-gray-600 text-sm">
      <div className="mb-2 md:mb-0">&copy; {new Date().getFullYear()} Travel Grid. All rights reserved.</div>
      <div className="flex gap-4">
        <a href="/" className="hover:text-green-700">Home</a>
        <a href="/discover" className="hover:text-green-700">Discover</a>
        <a href="/trips" className="hover:text-green-700">Trips</a>
        <a href="/review" className="hover:text-green-700">Review</a>
        <a href="/forums" className="hover:text-green-700">Forums</a>
      </div>
    </footer>
  );
};

export default Footer;
