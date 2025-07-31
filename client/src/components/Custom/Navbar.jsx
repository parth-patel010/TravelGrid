import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Menu, X, User, LogOut, LogIn, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { logout, isAuthenticated } = useAuth();
  const dropdownRef = useRef(null);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Ticket", path: "/ticket" },
    { name: "Packages", path: "/packages" },
    { name: "Hotels", path: "/hotels" },
    { name: "Guides", path: "/guides" },
  ];

  const moreLinks = [
    { name: "Travel Plans", path: "/travel-plan-generator" },
    { name: "Trending Spots", path: "/trending-spots" },
    { name: "Contact", path: "/contact" },
    { name: "Trip Expense Calculator", path: "/trip-calculator" },
    { name: "Feedback", path: "/feedback" },
  ];

  const handleLogout = () => {
    logout();
    setIsSidebarOpen(false);
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = () => setIsMoreOpen(true);
  const handleMouseLeave = () => setIsMoreOpen(false);
  const handleMoreClick = () => setIsMoreOpen((prev) => !prev);

  return (
    <>
      <nav className="w-full fixed top-0 left-0 z-50 backdrop-blur-md border-b border-white/10 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a] to-[#2a1a2e] px-4 sm:px-6">
        <div className="w-full max-w-full mx-auto flex justify-between items-center py-3">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-2xl font-bold text-pink-500 tracking-tight hover:text-pink-600 transition-colors duration-200"
          >
            TravelGrid
          </Link>

          <div className="hidden md:flex gap-8 items-center text-pink-500 font-medium flex-1 justify-center">
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

            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              ref={dropdownRef}
            >
              <button
                onClick={handleMoreClick}
                className="flex items-center gap-1 px-4 py-2 rounded-lg hover:text-white hover:bg-pink-500 transition-all duration-300"
              >
                More <ChevronDown size={16} />
              </button>
              {isMoreOpen && (
                <div className="absolute p-[10px] mt-1 shadow-lg rounded-lg w-48 z-20 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a] to-[#2a1a2e] text-white backdrop-blur-md">
                  {moreLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="block px-4 py-2 rounded-lg hover:text-white hover:bg-pink-500 hover:shadow-lg transition-all duration-300"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="hidden md:flex gap-4 items-center text-pink-500 font-medium">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="flex items-center gap-1 hover:text-pink-600">
                  <User size={18} /> Dashboard
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-1 hover:text-pink-600">
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="bg-gradient-to-r from-pink-600 to-pink-500 text-white px-4 py-2 rounded-md font-semibold hover:scale-105 transition-all">
                  Login
                </Link>
                <Link to="/signup" className="bg-gradient-to-r from-pink-600 to-pink-500 text-white px-4 py-2 rounded-md font-semibold hover:scale-105 transition-all">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden text-pink-500">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[80vw] sm:w-[60vw] max-w-[320px] bg-black z-50 transition-transform duration-300 ease-in-out transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 flex flex-col h-full text-pink-500">
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="text-2xl font-bold">TravelGrid</Link>
            <button onClick={() => setIsSidebarOpen(false)} className="text-pink-500">
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="py-2 px-3 rounded hover:bg-pink-500/10">
                {link.name}
              </Link>
            ))}

            <div>
              <button
                className="w-full flex justify-between items-center py-2 px-3 rounded hover:bg-pink-500/10"
                onClick={() => setIsMoreOpen(!isMoreOpen)}
              >
                More <ChevronDown size={18} className={`transform transition-transform ${isMoreOpen ? "rotate-180" : ""}`} />
              </button>
              {isMoreOpen && (
                <div className="pl-4 mt-1 flex flex-col gap-2">
                  {moreLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="py-1 px-2 text-sm rounded hover:bg-pink-500/10"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="flex gap-2 items-center py-2 px-3 hover:bg-pink-500/10">
                  <User size={18} /> Dashboard
                </Link>
                <button onClick={handleLogout} className="flex gap-2 items-center text-red-400 py-2 px-3 hover:bg-red-500/10">
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex gap-2 items-center py-2 px-3 hover:bg-pink-500/10">
                  <LogIn size={18} /> Login
                </Link>
                <Link to="/signup" className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-2 rounded text-center mt-2 hover:scale-105 transition-all">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
