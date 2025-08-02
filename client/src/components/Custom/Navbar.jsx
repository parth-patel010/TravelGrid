import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Menu, X, User, LogOut, LogIn, ChevronDown } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Destinations", path: "/destinations" },
  { name: "Hotels", path: "/hotels" },
  { name: "Hotel Map", path: "/hotel-map" },
  { name: "Forums", path: "/forums" },
  { name: "Packages", path: "/packages" },
  { name: "Trip Calculator", path: "/trip-calculator" },
  { name: "Contact", path: "/contact" },
  { name: "Trending Spots", path: "/trending-spots" },
  {
    name: "Booking",
    subitems: [
      { label: "Ticket", path: "/ticket" },
      { label: "Hotels", path: "/hotels" },
      { label: "Packages", path: "/packages" },
    ],
  },
  {
    name: "Support",
    subitems: [
      { label: "Travel Plans", path: "/travel-plan-generator" },
      { label: "Guide", path: "/guides" },
      { label: "Contact", path: "/contact" },
    ],
  },
  {
    name: "Tools",
    subitems: [
      { label: "Trip Expense Calculator", path: "/trip-calculator" },
      { label: "Packing Checklist", path: "/packing-checklist" },
      { label: "Feedback", path: "/feedback" },
    ],
  },
];

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const token = localStorage.getItem('token');
  const isLoggedIn = isAuthenticated && token;

  useEffect(() => {
    console.log("Navbar isAuthenticated:", isAuthenticated);
  }, [isAuthenticated]);


  // Close sidebar when route changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleGroup = (item) =>
    setExpanded((prev) => (prev === item ? null : item));

  const handleLogout = () => logout();

  const renderNavLinks = (isMobile = false) =>
    navLinks.map((link) =>
      link.subitems ? (
        <div key={link.name} className={isMobile ? "flex flex-col" : "relative group"}>
          {isMobile ? (
            <>
              <button
                className="py-2 px-3 w-full flex justify-between items-center rounded hover:bg-pink-500 transition-all duration-200"
                onClick={() => toggleGroup(link.name)}
              >
                <span className="font-medium">{link.name}</span>
                <span className="text-xl">{expanded === link.name ? "-" : "+"}</span>
              </button>
              {expanded === link.name && (
                <div className="w-full flex flex-col px-4 py-2 border-t border-pink-800">
                  {link.subitems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      className={`w-full py-2 px-2 rounded hover:bg-pink-500 transition-all duration-200 ${location.pathname === item.path ? "bg-pink-600 text-white" : ""
                        }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <button className="py-1 px-2 text-md rounded-sm hover:text-pink-500 flex items-center gap-1 transition-all duration-300">
                {link.name} <ChevronDown size={16} />
              </button>
              <div className="absolute left-0 mt-0 opacity-0 min-w-[180px] rounded-lg bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a] to-[#2c1a31] shadow-md group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300 z-50 p-2">
                {link.subitems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`py-2 px-4 text-md hover:bg-gradient-to-r from-pink-500 to-pink-600 hover:text-white block rounded-md transition-all ${location.pathname === item.path
                      ? "bg-pink-600 text-white"
                      : ""
                      }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <Link
          key={link.name}
          to={link.path}
          className={`py-1.5 px-4 text-md rounded-sm transition-all duration-300 ${location.pathname === link.path
            ? "bg-gradient-to-r from-pink-700 to-pink-500 text-white shadow-md"
            : "hover:text-pink-500"
            }`}
        >
          {link.name}
        </Link>
      )
    );

  return (
    <>
      {/* Top Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 h-20 px-4 sm:px-6 transition-colors border-b border-white/10 shadow-md ${isScrolled
          ? "bg-[#1a1a1a]/90 backdrop-blur-md"
          : "bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a] to-[#2c1a31] backdrop-blur-md"
          }`}
      >
        <div className="max-w-full mx-auto flex justify-between items-center gap-4 px-2 py-6">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-2xl font-bold tracking-tight bg-gradient-to-br from-pink-400 to-pink-600 bg-clip-text text-transparent"
          >
            TravelGrid
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4 text-gray-200 font-medium flex-1 justify-center">
            {renderNavLinks()}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex gap-4 items-center text-pink-500 font-medium">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="hover:text-white flex items-center gap-2 transition-colors"
                >
                  {user?.picture ? (
                    <img
                      src={user.picture}
                      alt="User Avatar"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : user?.name ? (
                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-pink-600 text-white text-xs font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  ) : (
                    <User size={18} />
                  )}
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:text-pink-500 flex items-center gap-1 transition-colors"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-pink-600 to-pink-500 text-white px-4 py-2 rounded-md font-semibold hover:scale-105 transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-pink-600 to-pink-500 text-white px-4 py-2 rounded-md font-semibold hover:scale-105 transition-all"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            aria-label="Toggle menu"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden text-pink-400 hover:text-pink-500 p-1 rounded-md hover:bg-pink-500/20"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 md:hidden ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[80vw] sm:w-[60vw] max-w-[320px] bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a] to-[#2c1a31] z-[1002] transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-5 flex flex-col h-full text-gray-300">
          {/* Close */}
          <div className="flex justify-end mb-6 border-b border-gray-600">
            <button
              aria-label="Close menu"
              onClick={() => setIsSidebarOpen(false)}
              className="text-pink-500 hover:text-pink-400 p-1 rounded-md hover:bg-pink-500/10"
            >
              <X size={24} />
            </button>
          </div>

          {/* Mobile Nav */}
          <div className="flex flex-col gap-4">{renderNavLinks(true)}</div>

          {/* Auth Buttons Mobile */}
          <div className="mt-6 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex gap-2 items-center py-2 px-3 rounded hover:bg-pink-500/30"
                >
                  <User size={18} /> Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex gap-2 items-center text-red-400 py-2 px-3 hover:bg-red-500/10"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex gap-2 items-center py-2 px-3 rounded font-medium hover:bg-pink-500 transition-all"
                >
                  <LogIn size={18} /> Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-b from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white py-2 rounded font-medium text-center mt-2 hover:shadow-lg hover:scale-105 transition-all"
                >
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
