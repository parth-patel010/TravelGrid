import React from 'react';
import { toast } from 'react-hot-toast';
import Navbar from '../components/Custom/Navbar';
import Footer from '../components/Custom/Footer';
import HotelFilters from '../components/HotelFilters';
import HotelPagination from '../components/HotelPagination';
import HotelCard from '../components/HotelCard';
import { useTheme } from "../context/ThemeContext";
import { useHotelFilters } from '../hooks/useHotelFilters';

/**
 * Enhanced Hotels Page Component
 * Features:
 * - Advanced filtering (location, budget, rating, availability)
 * - Pagination with configurable page size
 * - Enhanced hotel cards with pricing information
 * - Responsive design with consistent UI
 * - API integration for real-time data
 */
function Hotels() {
  const { isDarkMode } = useTheme();
  
  // Use the custom hook for filtering and pagination
  const {
    // Filter states and setters
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
    
    // Data
    paginatedHotels,
    availableCities,
    
    // API states
    loading,
    error,
    useStaticData,
    
    // Pagination
    currentPage,
    totalPages,
    goToPage,
    goToNextPage,
    goToPrevPage,
    
    // Helper functions
    clearAllFilters,
    refetch,
    
    // Stats
    totalResults,
    showingStart,
    showingEnd,
    itemsPerPage
  } = useHotelFilters(9); // Show 9 hotels per page

  // Handle hotel like/save functionality
  const handleLike = async (hotel) => {
    const body = {
      placeId: hotel._id || hotel.id,
      name: hotel.name,
      location: hotel.location,
      description: hotel.description,
    };

    try {
      // Use the API base URL from config or environment
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/save/save-place`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // ✅ Required for cookie-based auth
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Place saved successfully to dashboard!');
      } else {
        toast.error(data.message || '⚠️ This place is already saved.');
      }
    } catch (err) {
      console.error('Save failed:', err);
      toast.error('🚨 Failed to save place. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-black to-pink-900 overflow-x-hidden">
      <Navbar lightBackground />

      <main className="flex flex-col flex-1 w-full items-center">
        {/* Hero Section - unchanged from original */}
        <section className="w-full py-24 flex flex-col items-center text-center px-4 bg-gradient-to-br from-black to-pink-900">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 my-6">
            Explore World-Class <span className="text-pink-600">Hotels</span>
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl mb-8">
            Browse and book from our curated list of the top luxury hotels worldwide.
          </p>
          
          {/* Quick Search - maintaining original search functionality */}
          <div className="w-full max-w-lg">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by hotel or destination..."
              className="w-full px-6 py-4 rounded-xl bg-white border-2 border-pink-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-pink-500/30 focus:border-pink-500 shadow-lg transition-all my-4"
            />
          </div>
        </section>

        {/* Filters Section */}
        <section className="max-w-7xl w-full px-4 pt-8">
          <HotelFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            budgetRange={budgetRange}
            setBudgetRange={setBudgetRange}
            ratingFilter={ratingFilter}
            setRatingFilter={setRatingFilter}
            availabilityDates={availabilityDates}
            setAvailabilityDates={setAvailabilityDates}
            onlyPetFriendly={onlyPetFriendly}
            setOnlyPetFriendly={setOnlyPetFriendly}
            availableCities={availableCities}
            clearAllFilters={clearAllFilters}
            totalResults={totalResults}
            showingStart={showingStart}
            showingEnd={showingEnd}
          />
        </section>

        {/* Status Indicator for Static Data */}
        {useStaticData && (
          <section className="max-w-7xl w-full px-4">
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-r-lg mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm">
                    <strong>Demo Mode:</strong> API connection unavailable. Showing sample data with working filters.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Hotels Grid Section */}
        <section className="max-w-7xl w-full px-4 pb-8">
          {loading ? (
            // Loading state
            <div className="flex flex-col items-center justify-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-500 border-t-transparent mb-4"></div>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Loading hotels...
              </p>
            </div>
          ) : error ? (
            // Error state
            <div className="text-center py-16">
              <div className={`text-6xl mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}>
                ⚠️
              </div>
              <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Error Loading Hotels
              </h3>
              <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {error}
              </p>
              <button
                onClick={refetch}
                className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Try Again
              </button>
            </div>
          ) : paginatedHotels.length > 0 ? (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedHotels.map((hotel) => (
                <HotelCard 
                  key={hotel._id || hotel.id} 
                  hotel={hotel} 
                  onLike={handleLike}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className={`text-6xl mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}>
                🏨
              </div>
              <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                No hotels found
              </h3>
              <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Try adjusting your filters or search criteria
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </section>

        {/* Pagination Section */}
        {!loading && !error && paginatedHotels.length > 0 && (
          <section className="max-w-7xl w-full px-4 pb-16">
            <HotelPagination
              currentPage={currentPage}
              totalPages={totalPages}
              goToPage={goToPage}
              goToNextPage={goToNextPage}
              goToPrevPage={goToPrevPage}
              totalResults={totalResults}
              showingStart={showingStart}
              showingEnd={showingEnd}
              itemsPerPage={itemsPerPage}
            />
          </section>
        )}
      </main>
    </div>
  );
}

export default Hotels;
