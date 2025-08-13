import React from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * Hotel Filters Component
 * Provides all filtering options for hotels including location, budget, rating, and availability
 */
const HotelFilters = ({
  searchQuery,
  setSearchQuery,
  locationFilter,
  setLocationFilter,
  budgetRange,
  setBudgetRange,
  ratingFilter,
  setRatingFilter,
  availabilityDates,
  setAvailabilityDates,
  onlyPetFriendly,
  setOnlyPetFriendly,
  availableCities,
  clearAllFilters,
  totalResults,
  showingStart,
  showingEnd
}) => {
  const { isDarkMode } = useTheme();

  const inputClasses = `w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-pink-500/30 ${
    isDarkMode 
      ? 'bg-gray-800/50 border-gray-600 text-white focus:border-pink-400' 
      : 'bg-white border-pink-200 text-gray-800 focus:border-pink-500'
  }`;

  const selectClasses = `w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-pink-500/30 ${
    isDarkMode 
      ? 'bg-gray-800/50 border-gray-600 text-white focus:border-pink-400' 
      : 'bg-white border-pink-200 text-gray-800 focus:border-pink-500'
  }`;

  const labelClasses = `block text-sm font-semibold mb-2 ${
    isDarkMode ? 'text-gray-200' : 'text-gray-700'
  }`;

  return (
    <div className={`${isDarkMode ? 'bg-gray-800/30' : 'bg-white/80'} backdrop-blur-sm rounded-xl p-6 shadow-lg border ${isDarkMode ? 'border-gray-700' : 'border-pink-100'} mb-8`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Filter Hotels
        </h2>
        <button
          onClick={clearAllFilters}
          className="px-4 py-2 text-sm font-medium text-pink-600 hover:text-pink-700 hover:bg-pink-50 rounded-lg transition-all"
        >
          Clear All
        </button>
      </div>

      {/* Results Count */}
      <div className={`mb-6 p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-pink-50'}`}>
        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Showing <span className="font-semibold">{showingStart}-{showingEnd}</span> of{' '}
          <span className="font-semibold">{totalResults}</span> hotels
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Search Query */}
        <div>
          <label className={labelClasses}>Search Hotels</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or destination..."
            className={inputClasses}
          />
        </div>

        {/* Location Filter */}
        <div>
          <label className={labelClasses}>Location</label>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className={selectClasses}
          >
            <option value="">All Locations</option>
            {availableCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Budget Range */}
        <div>
          <label className={labelClasses}>
            Budget Range: ₹{budgetRange.min} - ₹{budgetRange.max}
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="20000"
              step="500"
              value={budgetRange.min}
              onChange={(e) => setBudgetRange(prev => ({ ...prev, min: parseInt(e.target.value) }))}
              className="w-full accent-pink-500"
            />
            <input
              type="range"
              min="0"
              max="20000"
              step="500"
              value={budgetRange.max}
              onChange={(e) => setBudgetRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
              className="w-full accent-pink-500"
            />
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <label className={labelClasses}>Minimum Rating</label>
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(parseInt(e.target.value))}
            className={selectClasses}
          >
            <option value="0">Any Rating</option>
            <option value="3">3+ Stars</option>
            <option value="4">4+ Stars</option>
            <option value="5">5 Stars Only</option>
          </select>
        </div>

        {/* Availability Dates */}
        <div>
          <label className={labelClasses}>Check-in Date</label>
          <input
            type="date"
            value={availabilityDates.checkIn}
            onChange={(e) => setAvailabilityDates(prev => ({ ...prev, checkIn: e.target.value }))}
            min={new Date().toISOString().split('T')[0]}
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Check-out Date</label>
          <input
            type="date"
            value={availabilityDates.checkOut}
            onChange={(e) => setAvailabilityDates(prev => ({ ...prev, checkOut: e.target.value }))}
            min={availabilityDates.checkIn || new Date().toISOString().split('T')[0]}
            className={inputClasses}
          />
        </div>

        {/* Pet Friendly Filter */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="petFriendly"
            checked={onlyPetFriendly}
            onChange={(e) => setOnlyPetFriendly(e.target.checked)}
            className="w-5 h-5 text-pink-500 border-2 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
          />
          <label 
            htmlFor="petFriendly" 
            className={`text-sm font-medium cursor-pointer ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
          >
            🐾 Pet-Friendly Only
          </label>
        </div>
      </div>
    </div>
  );
};

export default HotelFilters;
