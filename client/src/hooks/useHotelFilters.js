import { useState, useEffect, useMemo } from 'react';
import hotelService from '../services/hotelService';
import staticHotels, { hotels } from '../data/hotels';

/**
 * Custom hook for handling hotel filtering and pagination with API integration and fallback
 * Provides filters for location, budget, ratings, availability and pagination controls
 */
export const useHotelFilters = (itemsPerPage = 9) => {
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [budgetRange, setBudgetRange] = useState({ min: 0, max: 20000 });
  const [ratingFilter, setRatingFilter] = useState(0);
  const [availabilityDates, setAvailabilityDates] = useState({
    checkIn: '',
    checkOut: ''
  });
  const [onlyPetFriendly, setOnlyPetFriendly] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);

  // API states
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [availableCities, setAvailableCities] = useState([]);
  const [useStaticData, setUseStaticData] = useState(false);

  // Get unique cities from static data for fallback
  const staticCities = useMemo(() => {
    const hotelData = staticHotels || hotels || [];
    const cities = hotelData.map(hotel => hotel.city).filter(Boolean);
    return [...new Set(cities)].sort();
  }, []);

  // Client-side filtering for static data
  const filteredStaticHotels = useMemo(() => {
    if (!useStaticData) return [];
    
    const hotelData = staticHotels || hotels || [];
    console.log('Filtering with:', { searchQuery, locationFilter, budgetRange, ratingFilter, onlyPetFriendly });
    
    const filtered = hotelData.filter(hotel => {
      // Search query filter (name and location)
      const matchesSearch = searchQuery === '' || 
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.city.toLowerCase().includes(searchQuery.toLowerCase());

      // Location filter
      const matchesLocation = locationFilter === '' || hotel.city === locationFilter;

      // Budget filter (based on hotel's minimum price)
      const matchesBudget = hotel.priceRange && 
        hotel.priceRange.min >= budgetRange.min && 
        hotel.priceRange.min <= budgetRange.max;

      // Rating filter
      const matchesRating = ratingFilter === 0 || hotel.rating >= ratingFilter;

      // Pet-friendly filter
      const matchesPetFriendly = !onlyPetFriendly || hotel.isPetFriendly;

      const passes = matchesSearch && matchesLocation && matchesBudget && 
             matchesRating && matchesPetFriendly;
             
      if (!passes) {
        console.log(`Hotel ${hotel.name} filtered out:`, {
          matchesSearch, matchesLocation, matchesBudget, matchesRating, matchesPetFriendly
        });
      }

      return passes;
    });
    
    console.log(`Filtered ${filtered.length} hotels from ${hotelData.length}`);
    return filtered;
  }, [useStaticData, searchQuery, locationFilter, budgetRange, ratingFilter, onlyPetFriendly]);

  // Pagination for static data
  const paginatedStaticHotels = useMemo(() => {
    if (!useStaticData) return [];
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredStaticHotels.slice(startIndex, endIndex);
  }, [useStaticData, filteredStaticHotels, currentPage, itemsPerPage]);

  // Fetch hotels from API
  const fetchHotels = async () => {
    try {
      setLoading(true);
      setError(null);

      const filters = {};
      
      // Add filters if they have values
      if (searchQuery.trim()) {
        filters.search = searchQuery.trim();
      }
      if (locationFilter.trim()) {
        filters.city = locationFilter.trim();
      }
      if (budgetRange.min > 0) {
        filters.minPrice = budgetRange.min;
      }
      if (budgetRange.max < 20000) {
        filters.maxPrice = budgetRange.max;
      }
      if (ratingFilter > 0) {
        filters.minRating = ratingFilter;
      }
      if (availabilityDates.checkIn) {
        filters.checkIn = availabilityDates.checkIn;
      }
      if (availabilityDates.checkOut) {
        filters.checkOut = availabilityDates.checkOut;
      }
      if (onlyPetFriendly) {
        filters.petFriendly = true;
      }

      const options = {
        page: currentPage,
        limit: itemsPerPage,
        sort: '-rating' // Sort by rating descending
      };

      const response = await hotelService.getHotels(filters, options);
      
      if (response.success) {
        setHotels(response.data.hotels);
        setTotalCount(response.data.totalCount);
        setUseStaticData(false);
      } else {
        throw new Error(response.message || 'Failed to fetch hotels');
      }
    } catch (err) {
      console.error('API Error, falling back to static data:', err);
      setError(null); // Don't show error, just fall back
      setUseStaticData(true);
      setHotels([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  // Fetch available cities for dropdown
  const fetchCities = async () => {
    try {
      const response = await hotelService.getSearchSuggestions('');
      if (response.success) {
        setAvailableCities(response.data.cities || []);
      } else {
        throw new Error('Failed to fetch cities');
      }
    } catch (err) {
      console.error('Error fetching cities, using static data:', err);
      setAvailableCities(staticCities);
    }
  };

  // Fetch hotels when filters or pagination change (only if not using static data)
  useEffect(() => {
    fetchHotels();
  }, [searchQuery, locationFilter, budgetRange, ratingFilter, availabilityDates, onlyPetFriendly, currentPage]);

  // Fetch cities on mount
  useEffect(() => {
    fetchCities();
  }, []);

  // Use static cities if API cities are not available
  const finalCities = availableCities.length > 0 ? availableCities : staticCities;

  // Calculate pagination
  const finalHotels = useStaticData ? paginatedStaticHotels : hotels;
  const finalTotalCount = useStaticData ? filteredStaticHotels.length : totalCount;
  const totalPages = Math.ceil(finalTotalCount / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, finalTotalCount);

  // Reset to first page when filters change
  const handleFilterChange = (filterUpdater) => {
    filterUpdater();
    setCurrentPage(1);
  };

  // Pagination controls
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToNextPage = () => goToPage(currentPage + 1);
  const goToPrevPage = () => goToPage(currentPage - 1);

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery('');
    setLocationFilter('');
    setBudgetRange({ min: 0, max: 20000 });
    setRatingFilter(0);
    setAvailabilityDates({ checkIn: '', checkOut: '' });
    setOnlyPetFriendly(false);
    setCurrentPage(1);
  };

  return {
    // Filter states and setters
    searchQuery,
    setSearchQuery: (query) => handleFilterChange(() => setSearchQuery(query)),
    locationFilter,
    setLocationFilter: (location) => handleFilterChange(() => setLocationFilter(location)),
    budgetRange,
    setBudgetRange: (range) => handleFilterChange(() => setBudgetRange(range)),
    ratingFilter,
    setRatingFilter: (rating) => handleFilterChange(() => setRatingFilter(rating)),
    availabilityDates,
    setAvailabilityDates: (dates) => handleFilterChange(() => setAvailabilityDates(dates)),
    onlyPetFriendly,
    setOnlyPetFriendly: (petFriendly) => handleFilterChange(() => setOnlyPetFriendly(petFriendly)),
    
    // Data
    filteredHotels: finalHotels, // Use either API or static data
    paginatedHotels: finalHotels, // Hotels are already paginated
    availableCities: finalCities,
    
    // API states
    loading,
    error,
    useStaticData, // Indicates if we're using fallback data
    
    // Pagination
    currentPage,
    totalPages,
    itemsPerPage,
    goToPage,
    goToNextPage,
    goToPrevPage,
    
    // Helper functions
    clearAllFilters,
    refetch: fetchHotels,
    
    // Stats
    totalResults: finalTotalCount,
    showingStart: finalTotalCount > 0 ? startIndex + 1 : 0,
    showingEnd: Math.min(endIndex, finalTotalCount)
  };
};
