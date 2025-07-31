import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Menu, X, User, LogOut, LogIn, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const location = useLocation();
  const { logout, isAuthenticated } = useAuth();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Ticket", path: "/ticket" },
    { name: "Packages", path: "/packages" },
    { name: "Hotels", path: "/hotels" },
    { name: "Guides", path: "/guides" },
    { name: "Travel Plans", path: "/travel-plan-generator" },
  ];

  const moreLinks = [
    { name: "Contact", path: "/contact" },
    { name: "Trip Expense Calculator", path: "/trip-calculator" },
    { name: "Feedback", path: "/feedback" },
  ];

  const handleLogout = () => {
    logout();
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="mb-12">
      {/* Main Navbar */}
      <nav className={`w-full fixed top-0 left-0 z-50 backdrop-blur-md border-b border-white/10 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a] to-[#2a1a2e] px-4 py-3 flex justify-between items-center`}>
        {/* Logo */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-2xl font-bold text-pink-500 tracking-tight hover:text-pink-600 transition-colors duration-200"
        >
          TravelGrid
        </Link>

        {/* Desktop Nav Links with More dropdown */}
        <div className="hidden md:flex items-center text-pink-500 font-medium flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-4 py-2 rounded-lg hover:text-white hover:bg-pink-500 hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                location.pathname === link.path
                  ? "bg-pink-500/20 text-white shadow-md"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {/* More dropdown */}
          <div className="relative group">
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className={`px-4 py-2 rounded-lg hover:text-white hover:bg-pink-500 hover:shadow-lg justify-center transition-all duration-300 transform hover:scale-105 flex items-center gap-1 ${
                moreLinks.some(link => location.pathname === link.path)
                  ? "bg-pink-500/20 text-white shadow-md"
                  : ""
              }`}
            >
              More <ChevronDown size={16} className={`mt-1 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dropdown menu */}
            <div 
              className={`absolute right-0 mt-2 w-56 bg-gradient-to-r from-[#1a1a1a] to-[#2a1a2e] border border-white/10 rounded-lg shadow-lg overflow-hidden transition-all duration-200 origin-top ${
                isMoreOpen ? "scale-y-100 opacity-100" : "scale-y-95 opacity-0 pointer-events-none"
              }`}
              onMouseLeave={() => setIsMoreOpen(false)}
            >
              {moreLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 hover:bg-pink-500 hover:text-white transition-colors duration-200 ${
                    location.pathname === link.path ? "bg-pink-500/30 text-white" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Auth Buttons - Right Side */}
        <div className="hidden md:flex gap-4 items-center text-pink-500 font-medium">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="hover:text-pink-600 flex items-center gap-1 transition-colors duration-200"
              >
                <User size={18} /> Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-pink-600 flex items-center gap-1 transition-colors duration-200"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white px-4 py-2 rounded-md font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white px-4 py-2 rounded-md font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Icon (Mobile only) */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden text-pink-500 hover:text-pink-600 transition-colors duration-200 p-1 rounded-md hover:bg-pink-500/10"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0  right-0 h-full w-[80%] sm:w-[60%] max-w-[320px] bg-gradient-to-b from-[#1a1a1a] to-[#2a1a2e] z-[500] transition-transform duration-300 ease-in-out transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 flex flex-col h-full text-pink-500 overflow-y-auto">
          {/* Header with Logo and Close Button */}
          <div className="flex justify-between items-center mb-6">
            <Link
              to="/"
              className="text-2xl font-bold hover:text-pink-400 transition-colors duration-200"
              onClick={() => setIsSidebarOpen(false)}
            >
              TravelGrid
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-pink-500 hover:text-pink-400 transition-colors duration-200 p-1 rounded-md hover:bg-pink-500/10"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Nav Links - All visible in mobile */}
          <div className="flex flex-col gap-3">
            {[...navLinks, ...moreLinks].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`py-2 px-3 rounded hover:bg-pink-500/10 transition-all duration-200 ${
                  location.pathname === link.path && "bg-pink-500/20"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex gap-2 items-center py-2 px-3 rounded hover:bg-pink-500/10 transition-all duration-200"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <User size={18} /> Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex gap-2 items-center text-red-400 py-2 px-3 rounded hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 text-left"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex gap-2 items-center py-2 px-3 rounded hover:bg-pink-500/10 transition-all duration-200"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <LogIn size={18} /> Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white py-2 rounded text-center mt-2 transition-all duration-200 hover:shadow-lg hover:scale-105"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;