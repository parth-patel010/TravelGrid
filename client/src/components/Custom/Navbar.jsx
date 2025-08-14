import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";
import { useTheme } from "../../context/ThemeContext";
import { useThemeStyles } from "../../hooks/useThemeStyles";
import { useTranslation } from "react-i18next";
import { Menu, X, User, LogOut, LogIn, ChevronDown, Mail, AlertTriangle } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "../LanguageSelector";

const Navbar = () => {
  const { t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const { wishlist } = useWishlist();
  const { isDarkMode } = useTheme();
  const themeStyles = useThemeStyles();

  const navLinks = [
    { name: t('navigation.home'), path: "/" },
    { name: t('navigation.about'), path: "/about" },
    { name: t('navigation.trendingSpots'), path: "/trending-spots" },
    {
      name: t('navigation.booking'),
      subitems: [
        { label: t('navigation.ticket'), path: "/ticket" },
        { label: t('navigation.hotels'), path: "/hotels" },
        { label: t('navigation.packages'), path: "/packages" },
        { label: t('navigation.bookingHistory'), path: "/booking-history" },
      ],
    },
    {
      name: t('navigation.support'),
      subitems: [
        { label: t('navigation.travelPlans'), path: "/travel-plan-generator" },
        { label: t('navigation.guide'), path: "/guides" },
        { label: t('navigation.contact'), path: "/contact" },
        { label: t('navigation.reviewSummarizer'), path: "/Summarizer" },
      ],
    },
    {
      name: t('navigation.tools'),
      subitems: [
        { label: t('navigation.tripCalculator'), path: "/trip-calculator" },
        { label: t('navigation.packingChecklist'), path: "/packing-checklist" },
        { label: t('navigation.travelRecommendations'), path: "/recommendation" },
        { label: t('navigation.feedback'), path: "/feedback" },
        { label: "AI Mood Board", path: "/mood-board" },
        { label: "AI Travel Planner", path: "/ai-travel-planner" },
        { label: "Travel Countdown Timer", path: "/countdown-demo" },
        { label: "Music", path: "/music" },
        { label: "Map", path: "/itinerary-map" },

        { label: t('navigation.petTravelGuide'), path: "/pettravel" },
        { label: "Enhanced Currency Converter", path: "/enhanced-currency" }
      ],
    },
    { name: t('navigation.wishlist'), path: "/wishlist" },
  ];

  const getActiveParentTab = () => {
    for (const link of navLinks) {
      if (link.subitems) {
        for (const sub of link.subitems) {
          if (location.pathname.startsWith(sub.path)) {
            return link.name;
          }
        }
      }
    }
    return null;
  };

  const activeParentTab = getActiveParentTab();

  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(user && isAuthenticated);

  const toggleGroup = (item) => {
    setExpanded((prev) => (prev === item ? null : item));
  };

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);
  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error("Logout failed", e);
    }
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* Sticky Translucent Navbar */}
      <nav className={`w-full fixed top-0 left-0 z-50 backdrop-blur-md bg-black/90 border-b border-white/20 px-4 py-3 flex justify-between items-center`}>
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-pink-500 tracking-tight hover:text-pink-600 transition-colors duration-200"
        >
          TravelGrid
        </Link>

        {/* Desktop Nav Links - Centered */}
        <div className="hidden md:flex gap-8 items-center text-pink-500 font-medium flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-4 py-2 rounded-lg hover:text-white hover:bg-pink-500 hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${location.pathname === link.path
                ? "bg-pink-500/20 text-white shadow-md"
                : ""
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Top Navbar */}
      <nav
        className={`box-border w-full fixed top-0 left-0 z-50 h-20 backdrop-blur-md border-b transition-all duration-300 px-4 sm:px-6 ${themeStyles.componentClasses.navbar} ${isScrolled ? "shadow-xl" : "shadow-md"}`}
      >
        <div className="w-full max-w-full mx-auto flex justify-between items-center gap-4 px-2 py-6">
          {/* Logo */}
          <NavLink
            to="/"
            onClick={() =>
              typeof window !== "undefined" &&
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="flex items-center gap-2 text-2xl font-bold tracking-tight bg-gradient-to-br from-pink-400 to-pink-600 bg-clip-text text-transparent transition-colors duration-200"
          >
            <img
              src="/favicon.ico"
              alt="TravelGrid Logo"
              className="w-10 h-10 rounded-full border border-pink-300 shadow-md"
            />
            TravelGrid
          </NavLink>

          {/* Desktop Nav */}
          <div
            className={`hidden md:flex items-center gap-4 font-medium flex-1 justify-center ${themeStyles.text.secondary}`}
          >
            {navLinks.map((link) =>
              link.subitems ? (
                <div className="relative group" key={link.name}>
                  <button
                    className={`py-1.5 px-4 text-sm font-medium rounded-sm transition-all duration-300 flex items-center gap-1 break-words ${activeParentTab === link.name
                      ? "bg-gradient-to-r from-pink-700 to-pink-500 shadow-md text-white"
                      : `hover:text-pink-500 hover:shadow-sm ${themeStyles.text.primary}`
                      }`}
                  >
                    {link.name} <ChevronDown fontSize={16} />
                  </button>
                  {/* Dropdown menu */}
                  <div
                    className={`absolute left-0 mt-0 top-full opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 z-50 p-2 min-w-[200px] max-w-[280px] rounded-lg shadow-lg ${themeStyles.componentClasses.card}`}
                  >
                    {link.subitems.map((item) => (
                      <NavLink
                        key={item.label}
                        to={item.path}
                        className={({ isActive }) =>
                          `block w-full px-3 py-2 text-sm rounded-md transition-all duration-200 ${isActive
                            ? "bg-pink-500 text-white shadow-md"
                            : `hover:bg-pink-500/10 ${themeStyles.text.primary}`
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `py-1.5 px-4 text-sm font-medium rounded-sm transition-all duration-300 ${isActive
                      ? "bg-gradient-to-r from-pink-700 to-pink-500 shadow-md text-white"
                      : `hover:text-pink-500 hover:shadow-sm ${themeStyles.text.primary}`
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              )
            )}
          </div>

          {/* Right side - Theme toggle, language, user menu */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSelector />

            {/* User Menu */}
            <div className="relative">
              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={user?.profilePicture || "/defaultprofile.svg"}
                      alt="Profile"
                      className="w-8 h-8 rounded-full border-2 border-pink-300 shadow-md"
                    />
                    <span className={`hidden sm:block text-sm font-medium ${themeStyles.text.primary}`}>
                      {user?.name || user?.email}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-lg hover:bg-pink-500/10 transition-colors duration-200"
                    title="Logout"
                  >
                    <LogOut size={18} className="text-pink-500" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${themeStyles.componentClasses.button.outline}`}
                  >
                    <LogIn size={16} className="mr-2 inline" />
                    {t('auth.login')}
                  </Link>
                  <Link
                    to="/signup"
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${themeStyles.componentClasses.button.primary}`}
                  >
                    {t('auth.signup')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)} />
          <div className={`fixed right-0 top-0 h-full w-80 max-w-[85vw] ${themeStyles.componentClasses.navbar} shadow-2xl transform transition-transform duration-300 ease-in-out`}>
            {/* Sidebar content */}
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {/* Mobile navigation items */}
                {navLinks.map((link) => (
                  <div key={link.name} className="mb-4">
                    {link.subitems ? (
                      <div>
                        <button
                          onClick={() => toggleGroup(link.name)}
                          className={`w-full text-left py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-between ${expanded === link.name
                            ? "bg-pink-500 text-white"
                            : `hover:bg-pink-500/10 ${themeStyles.text.primary}`
                            }`}
                        >
                          {link.name}
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${expanded === link.name ? "rotate-180" : ""
                              }`}
                          />
                        </button>
                        {expanded === link.name && (
                          <div className="ml-4 mt-2 space-y-1">
                            {link.subitems.map((item) => (
                              <NavLink
                                key={item.label}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={({ isActive }) =>
                                  `block py-2 px-3 rounded-lg text-sm transition-all duration-200 ${isActive
                                    ? "bg-pink-500 text-white"
                                    : `hover:bg-pink-500/10 ${themeStyles.text.secondary}`
                                  }`
                                }
                              >
                                {item.label}
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <NavLink
                        to={link.path}
                        onClick={() => setIsSidebarOpen(false)}
                        className={({ isActive }) =>
                          `block py-2 px-3 rounded-lg transition-all duration-200 ${isActive
                            ? "bg-pink-500 text-white"
                            : `hover:bg-pink-500/10 ${themeStyles.text.primary}`
                          }`
                        }
                      >
                        {link.name}
                      </NavLink>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed top-6 right-4 z-40 p-2 rounded-lg bg-pink-500 text-white shadow-lg hover:bg-pink-600 transition-colors duration-200"
      >
        <Menu size={20} />
      </button>
    </div>
  );
};

export default Navbar;
