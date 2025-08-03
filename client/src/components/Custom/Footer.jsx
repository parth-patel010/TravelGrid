// imports
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Footer component
const Footer = () => {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

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
      <footer className="relative bg-gradient-to-br from-black to-pink-900 text-white">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-20" />

        <div className="relative z-10">
          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-left">
              
              {/* Company Info */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1..." />
                    </svg>
                  </div>
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
                  {/* ... No changes needed here ... */}
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-white border-b border-gray-600 pb-2">
                  Quick Links
                </h4>
                <nav className="flex flex-col space-y-3 items-start">
                  {[
                    { name: "Home", path: "/" },
                    { name: "About Us", path: "/about" },
                    { name: "Trips", path: "/trips" },
                    { name: "Destinations", path: "/destinations" },
                    { name: "Hotels", path: "/hotels" },
                    { name: "Forums", path: "/forum" },
                    { name: "Feedback", path: "/feedback" },
                  ].map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={scrollToTop}
                      className="text-gray-300 hover:text-pink-300 transition-all duration-300 text-sm flex items-center group"
                    >
                      <span className="w-2 h-2 bg-pink-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-white border-b border-gray-600 pb-2">
                  Contact Info
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mt-1">
                      {/* Location icon */}
                    </div>
                    <div className="text-left">
                      <a href="https://www.google.com/maps?q=123+Travel+Street,+Adventure+City,+AC+12345"
                        target="_blank" rel="noopener noreferrer"
                        className="text-gray-300 text-sm hover:underline block"
                      >
                        123 Travel Street<br />
                        Adventure City, AC 12345
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mt-1">
                      {/* Phone icon */}
                    </div>
                    <div className="text-left">
                      <p className="text-gray-300 text-sm">+1 (555) 123-4567</p>
                      <p className="text-gray-300 text-sm">Mon-Fri 9AM-6PM</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mt-1">
                      {/* Email icon */}
                    </div>
                    <div className="text-left">
                      <p className="text-gray-300 text-sm">hello@travelgrid.com</p>
                      <p className="text-gray-300 text-sm">support@travelgrid.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-white border-b border-gray-600 pb-2">
                  Newsletter
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Subscribe to get the latest travel tips, exclusive offers, and destination guides delivered to your inbox.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      {/* Envelope icon */}
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-3 px-4 rounded-lg text-sm font-medium flex items-center justify-center space-x-2">
                    <span>Subscribe</span>
                    {/* Send icon */}
                  </button>
                </form>
                <div className="text-xs text-gray-400">
                  🔒 We respect your privacy. Unsubscribe at any time.
                </div>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-gray-700 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
                <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                  <p className="text-gray-400 text-sm">
                    © 2025 TravelGrid. All rights reserved.
                  </p>
                  <div className="flex space-x-4 text-sm">
                    <Link to="/privacy" className="text-gray-400 hover:text-pink-300 transition-colors">Privacy Policy</Link>
                    <Link to="/terms" className="text-gray-400 hover:text-pink-300 transition-colors">Terms of Service</Link>
                    <Link to="/contact" className="text-gray-400 hover:text-pink-300 transition-colors">Contact</Link>
                    <Link to="/feedback" className="text-gray-400 hover:text-pink-300 transition-colors">Feedback</Link>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm mt-4">
                <span>Made with</span>
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4..." />
                </svg>
                <span>by TravelGrid Team</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
          <div className={`max-w-sm w-full bg-white rounded-lg shadow-xl border-l-4 p-4 flex items-center space-x-3 ${toast.type === "success" ? "border-green-500" : "border-red-500"}`}>
            <div className="flex-shrink-0">
              {toast.type === "success" ? (
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="..." />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="..." />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${toast.type === "success" ? "text-green-800" : "text-red-800"}`}>{toast.message}</p>
            </div>
            <button onClick={hideToast} className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="..." />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
