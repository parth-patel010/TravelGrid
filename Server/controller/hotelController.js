const Hotel = require('../models/hotel');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get all hotels with advanced filtering and pagination
// @route   GET /api/hotels
// @access  Public
const getHotels = asyncHandler(async (req, res) => {
  try {
    const {
      search,
      city,
      minPrice,
      maxPrice,
      minRating,
      isPetFriendly,
      checkIn,
      checkOut,
      amenities,
      featured,
      page = 1,
      limit = 10,
      sortBy = 'rating',
      sortOrder = 'desc'
    } = req.query;

    // Build filters object
    const filters = {};
    if (search) filters.search = search;
    if (city) filters.city = city;
    if (minPrice) filters.minPrice = parseFloat(minPrice);
    if (maxPrice) filters.maxPrice = parseFloat(maxPrice);
    if (minRating) filters.minRating = parseFloat(minRating);
    if (isPetFriendly) filters.isPetFriendly = isPetFriendly === 'true';
    if (checkIn) filters.checkIn = checkIn;
    if (checkOut) filters.checkOut = checkOut;
    if (featured) filters.featured = featured === 'true';
    if (amenities) {
      filters.amenities = Array.isArray(amenities) ? amenities : [amenities];
    }

    // Build options object
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sortBy,
      sortOrder
    };

    // Get hotels using the static method
    const hotels = await Hotel.searchAndFilter(filters, options);

    // Get total count for pagination
    let countQuery = { 'availability.isActive': true };
    
    // Apply same filters for count
    if (search) countQuery.$text = { $search: search };
    if (city) countQuery.city = new RegExp(city, 'i');
    if (minPrice !== undefined || maxPrice !== undefined) {
      countQuery['priceRange.min'] = {};
      if (minPrice !== undefined) countQuery['priceRange.min'].$gte = parseFloat(minPrice);
      if (maxPrice !== undefined) countQuery['priceRange.max'] = { $lte: parseFloat(maxPrice) };
    }
    if (minRating) countQuery.rating = { $gte: parseFloat(minRating) };
    if (isPetFriendly === 'true') countQuery.isPetFriendly = true;
    if (featured === 'true') countQuery.featured = true;
    if (amenities) {
      const amenitiesArray = Array.isArray(amenities) ? amenities : [amenities];
      countQuery.amenities = { $in: amenitiesArray };
    }

    const totalHotels = await Hotel.countDocuments(countQuery);
    const totalPages = Math.ceil(totalHotels / parseInt(limit));

    // Get unique cities for filter dropdown
    const cities = await Hotel.distinct('city', { 'availability.isActive': true });

    res.status(200).json({
      success: true,
      data: {
        hotels,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalHotels,
          hasNextPage: parseInt(page) < totalPages,
          hasPrevPage: parseInt(page) > 1,
          limit: parseInt(limit)
        },
        filters: {
          availableCities: cities.sort(),
          appliedFilters: filters
        }
      }
    });

  } catch (error) {
    console.error('Error in getHotels:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching hotels',
      error: error.message
    });
  }
});

// @desc    Get single hotel by ID
// @route   GET /api/hotels/:id
// @access  Public
const getHotelById = asyncHandler(async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
      .populate('reviews.userId', 'name email');

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }

    res.status(200).json({
      success: true,
      data: hotel
    });

  } catch (error) {
    console.error('Error in getHotelById:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching hotel',
      error: error.message
    });
  }
});

// @desc    Create new hotel
// @route   POST /api/hotels
// @access  Private (Admin only)
const createHotel = asyncHandler(async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);

    res.status(201).json({
      success: true,
      data: hotel,
      message: 'Hotel created successfully'
    });

  } catch (error) {
    console.error('Error in createHotel:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating hotel',
      error: error.message
    });
  }
});

// @desc    Update hotel
// @route   PUT /api/hotels/:id
// @access  Private (Admin only)
const updateHotel = asyncHandler(async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }

    res.status(200).json({
      success: true,
      data: hotel,
      message: 'Hotel updated successfully'
    });

  } catch (error) {
    console.error('Error in updateHotel:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating hotel',
      error: error.message
    });
  }
});

// @desc    Delete hotel
// @route   DELETE /api/hotels/:id
// @access  Private (Admin only)
const deleteHotel = asyncHandler(async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Hotel deleted successfully'
    });

  } catch (error) {
    console.error('Error in deleteHotel:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting hotel',
      error: error.message
    });
  }
});

// @desc    Check hotel availability for specific dates
// @route   POST /api/hotels/:id/availability
// @access  Public
const checkAvailability = asyncHandler(async (req, res) => {
  try {
    const { checkIn, checkOut } = req.body;

    if (!checkIn || !checkOut) {
      return res.status(400).json({
        success: false,
        message: 'Check-in and check-out dates are required'
      });
    }

    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }

    const isAvailable = hotel.isAvailableForDates(checkIn, checkOut);

    res.status(200).json({
      success: true,
      data: {
        isAvailable,
        checkIn,
        checkOut,
        hotelId: hotel._id,
        hotelName: hotel.name
      }
    });

  } catch (error) {
    console.error('Error in checkAvailability:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while checking availability',
      error: error.message
    });
  }
});

// @desc    Add review to hotel
// @route   POST /api/hotels/:id/reviews
// @access  Private (Authenticated users)
const addReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const userId = req.user.id;
    const userName = req.user.name;

    if (!rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Rating and comment are required'
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }

    // Check if user already reviewed this hotel
    const existingReview = hotel.reviews.find(
      review => review.userId.toString() === userId.toString()
    );

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this hotel'
      });
    }

    await hotel.addReview(userId, userName, rating, comment);

    res.status(201).json({
      success: true,
      data: hotel,
      message: 'Review added successfully'
    });

  } catch (error) {
    console.error('Error in addReview:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding review',
      error: error.message
    });
  }
});

// @desc    Get hotel search suggestions (autocomplete)
// @route   GET /api/hotels/suggestions
// @access  Public
const getSearchSuggestions = asyncHandler(async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.length < 2) {
      return res.status(200).json({
        success: true,
        data: []
      });
    }

    // Get hotel name suggestions
    const hotelSuggestions = await Hotel.find({
      'availability.isActive': true,
      $or: [
        { name: new RegExp(query, 'i') },
        { city: new RegExp(query, 'i') },
        { location: new RegExp(query, 'i') }
      ]
    })
    .select('name city location')
    .limit(5);

    // Get unique city suggestions
    const citySuggestions = await Hotel.distinct('city', {
      'availability.isActive': true,
      city: new RegExp(query, 'i')
    });

    const suggestions = {
      hotels: hotelSuggestions,
      cities: citySuggestions.slice(0, 5)
    };

    res.status(200).json({
      success: true,
      data: suggestions
    });

  } catch (error) {
    console.error('Error in getSearchSuggestions:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching suggestions',
      error: error.message
    });
  }
});

// @desc    Get featured hotels
// @route   GET /api/hotels/featured
// @access  Public
const getFeaturedHotels = asyncHandler(async (req, res) => {
  try {
    const { limit = 6 } = req.query;

    const hotels = await Hotel.find({
      'availability.isActive': true,
      featured: true
    })
    .sort({ rating: -1, averageRating: -1 })
    .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data: hotels
    });

  } catch (error) {
    console.error('Error in getFeaturedHotels:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching featured hotels',
      error: error.message
    });
  }
});

module.exports = {
  getHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
  checkAvailability,
  addReview,
  getSearchSuggestions,
  getFeaturedHotels
};
