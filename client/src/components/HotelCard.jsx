import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

/**
 * Enhanced Hotel Card Component
 * Displays hotel information with pricing, rating, and features
 */
const HotelCard = ({ hotel, onLike }) => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating 
            ? 'text-yellow-400' 
            : isDarkMode ? 'text-gray-600' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div
      className={`${isDarkMode
        ? "backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 border border-pink-400/20 dark:border-pink-400/30 rounded-2xl shadow-xl hover:bg-white/95 dark:hover:bg-gray-800/95 transition-all duration-300 hover:shadow-2xl"
        : "backdrop-blur-lg bg-white/95 border border-pink-300/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col hover:shadow-pink-200/30 transition-all duration-300 transform hover:scale-105"
      }`}
    >
      {/* Hotel Image */}
      <div className="relative">
        <img
          src={hotel.images?.[0] || hotel.image || '/placeholder-hotel.jpg'}
          alt={hotel.name}
          className="w-full h-56 object-cover object-center"
        />
        
        {/* Price Badge */}
        {hotel.priceRange && (
          <div className="absolute top-3 right-3 bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            ₹{hotel.priceRange.min}+
          </div>
        )}

        {/* Pet Friendly Badge */}
        {hotel.isPetFriendly && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            🐾 Pet Friendly
          </div>
        )}
      </div>

      {/* Hotel Details */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? "text-gray-800 dark:text-white" : "text-gray-950"}`}>
              {hotel.name}
            </h3>
            <p className="text-pink-600 dark:text-pink-400 font-medium text-sm">
              {hotel.location}
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex">
            {renderStars(hotel.rating)}
          </div>
          <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {hotel.rating}/5
          </span>
        </div>

        {/* Description */}
        <p className={`text-sm line-clamp-3 flex-1 mb-4 ${isDarkMode ? "dark:text-gray-300" : "text-gray-700"}`}>
          {hotel.description}
        </p>

        {/* Pricing Information */}
        {hotel.priceRange && (
          <div className={`mb-4 p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
            <div className="flex justify-between items-center">
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Price Range:
              </span>
              <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                ₹{hotel.priceRange.min} - ₹{hotel.priceRange.max}
              </span>
            </div>
            <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              per night, varies by room type
            </p>
          </div>
        )}

        {/* Room Types Preview */}
        {hotel.roomTypes && hotel.roomTypes.length > 0 && (
          <div className="mb-4">
            <p className={`text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Available Room Types:
            </p>
            <div className="flex flex-wrap gap-1">
              {hotel.roomTypes.slice(0, 2).map(room => (
                <span
                  key={room.id}
                  className={`text-xs px-2 py-1 rounded-full ${
                    isDarkMode 
                      ? 'bg-pink-900/30 text-pink-300' 
                      : 'bg-pink-100 text-pink-700'
                  }`}
                >
                  {room.name}
                </span>
              ))}
              {hotel.roomTypes.length > 2 && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  isDarkMode 
                    ? 'bg-gray-700/50 text-gray-400' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  +{hotel.roomTypes.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2 mt-auto">
          <button
            onClick={() => navigate(`/hotels/${hotel.id}`)}
            className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            View Details & Book
          </button>
          <button
            onClick={() => onLike(hotel)}
            className={`w-full px-4 py-2 rounded-lg text-sm font-semibold transition ${
              isDarkMode 
                ? "bg-pink-100 dark:bg-pink-900/30 hover:bg-pink-200 dark:hover:bg-pink-900/50 text-pink-600 dark:text-pink-400" 
                : "bg-pink-50 hover:bg-pink-100 text-pink-700"
            }`}
          >
            ❤️ Save to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
