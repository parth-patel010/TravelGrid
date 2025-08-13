import React from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * Pagination Component
 * Provides navigation controls for paginated hotel results
 */
const HotelPagination = ({
  currentPage,
  totalPages,
  goToPage,
  goToNextPage,
  goToPrevPage,
  totalResults,
  showingStart,
  showingEnd,
  itemsPerPage
}) => {
  const { isDarkMode } = useTheme();

  if (totalPages <= 1) return null;

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show smart pagination
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, currentPage + 2);
      
      // Always show first page
      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('...');
      }
      
      // Show pages around current page
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Always show last page
      if (end < totalPages) {
        if (end < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  const buttonClasses = (isActive = false, isDisabled = false) => `
    px-4 py-2 rounded-lg font-medium transition-all duration-200 
    ${isDisabled 
      ? `cursor-not-allowed opacity-50 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}` 
      : isActive 
        ? 'bg-pink-600 text-white shadow-lg' 
        : `hover:bg-pink-100 hover:text-pink-700 ${isDarkMode ? 'text-gray-300 hover:bg-pink-900/30' : 'text-gray-700'}`
    }
  `;

  return (
    <div className={`${isDarkMode ? 'bg-gray-800/30' : 'bg-white/80'} backdrop-blur-sm rounded-xl p-6 shadow-lg border ${isDarkMode ? 'border-gray-700' : 'border-pink-100'} mt-8`}>
      {/* Results Summary */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 sm:mb-0`}>
          Showing <span className="font-semibold">{showingStart}-{showingEnd}</span> of{' '}
          <span className="font-semibold">{totalResults}</span> hotels
        </p>
        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Page <span className="font-semibold">{currentPage}</span> of{' '}
          <span className="font-semibold">{totalPages}</span>
        </p>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-wrap justify-center items-center gap-2">
        {/* Previous Button */}
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className={buttonClasses(false, currentPage === 1)}
          aria-label="Previous page"
        >
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </span>
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && goToPage(page)}
            disabled={page === '...'}
            className={page === currentPage ? buttonClasses(true) : buttonClasses(false, page === '...')}
            aria-label={`Go to page ${page}`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={buttonClasses(false, currentPage === totalPages)}
          aria-label="Next page"
        >
          <span className="flex items-center gap-1">
            Next
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>

      {/* Quick Jump */}
      {totalPages > 10 && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center gap-3">
            <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Jump to page:
            </label>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={(e) => {
                const page = parseInt(e.target.value);
                if (page >= 1 && page <= totalPages) {
                  goToPage(page);
                }
              }}
              className={`w-16 px-2 py-1 text-center rounded border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-800'
              } focus:outline-none focus:ring-2 focus:ring-pink-500`}
            />
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              of {totalPages}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelPagination;
