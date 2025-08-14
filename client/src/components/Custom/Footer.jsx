// imports
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useThemeStyles } from "../../hooks/useThemeStyles";

// Footer component
const Footer = () => {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const { isDarkMode } = useTheme();
  const themeStyles = useThemeStyles();

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: "", type: "" });
  };

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        hideToast();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      showToast("Please enter a valid email address", "error");
      return;
    }

    // Simulated API call
    setTimeout(() => {
      console.log("Newsletter subscription:", email);
      showToast("Successfully subscribed to our newsletter! 🎉", "success");
      setEmail("");
    }, 500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className={`relative text-white transition-all duration-300 ${isDarkMode
          ? 'bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900'
          : 'bg-gradient-to-br from-gray-900 to-pink-900'
        }`}>
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-20" />

        <div className="relative z-10">
          {/* remove extra padding in footer */}
          <div className="container mx-auto px-4 pt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-left">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <img
                    src="/favicon.ico"
                    alt="TravelGrid Logo"
                    className="w-10 h-10"
                  />
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-pink-300 bg-clip-text text-transparent">
                    TravelGrid
                  </h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Discover amazing destinations and create unforgettable memories with our curated travel experiences around the world. Your journey starts here.
                </p>
                {/* Social Media Links */}
                <div className="flex space-x-4">
                  {/* Icons like Twitter, Pinterest, YouTube, Contributors */}
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-white border-b border-gray-600 pb-2 text-center">
                  Quick Links
                </h4>
                <nav className="flex flex-col space-y-3 items-left">
                  {[
                    { name: "Home", path: "/" },
                    { name: "About Us", path: "/about" },
                    { name: "Trips", path: "/trips" },
                    { name: "Destinations", path: "/destinations" },
                    { name: "Hotels", path: "/hotels" },
                    { name: "Forums", path: "/forum" },
                    { name: "Feedback", path: "/feedback" },
                    { name: "Currency Converter", path: "/enhanced-currency" },
                  ].map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="text-gray-300 hover:text-pink-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Services */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-white border-b border-gray-600 pb-2 text-center">
                  Services
                </h4>
                <nav className="flex flex-col space-y-3 items-left">
                  {[
                    { name: "Travel Planning", path: "/travel-plan-generator" },
                    { name: "Hotel Booking", path: "/hotels" },
                    { name: "Ticket Booking", path: "/ticket" },
                    { name: "Travel Guides", path: "/guides" },
                    { name: "Packing Checklist", path: "/packing-checklist" },
                    { name: "Trip Calculator", path: "/trip-calculator" },
                    { name: "AI Mood Board", path: "/mood-board" },
                    { name: "Music Player", path: "/music" },
                  ].map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="text-gray-300 hover:text-pink-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Newsletter */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-white border-b border-gray-600 pb-2 text-center">
                  Newsletter
                </h4>
                <p className="text-gray-300 text-sm">
                  Subscribe to get travel tips and exclusive offers!
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={`w-full px-3 py-2 rounded-md text-sm ${themeStyles.componentClasses.input} text-gray-900`}
                    required
                  />
                  <button
                    type="submit"
                    className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${themeStyles.componentClasses.button.primary}`}
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Bottom section */}
            <div className="border-t border-gray-600 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-gray-300 text-sm">
                  © 2024 TravelGrid. All rights reserved.
                </div>
                <div className="flex space-x-6 text-sm">
                  <Link
                    to="/privacy"
                    className="text-gray-300 hover:text-pink-400 transition-colors duration-200"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    to="/terms"
                    className="text-gray-300 hover:text-pink-400 transition-colors duration-200"
                  >
                    Terms & Conditions
                  </Link>
                  <Link
                    to="/contact"
                    className="text-gray-300 hover:text-pink-400 transition-colors duration-200"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to top button */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${themeStyles.componentClasses.button.primary}`}
          aria-label="Scroll to top"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </footer>

      {/* Toast notification */}
      {toast.show && (
        <div className={`fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${toast.type === "success"
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
          }`}>
          <div className="flex items-center space-x-2">
            <span>{toast.message}</span>
            <button
              onClick={hideToast}
              className="ml-2 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
