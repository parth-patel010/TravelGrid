const mongoose = require('mongoose');

// Room type schema for hotel room information
const roomTypeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  amenities: [{ type: String }],
  maxOccupancy: { type: Number, default: 2 },
  images: [{ type: String }]
});

// Review schema for hotel reviews
const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Enhanced hotel schema with search and filtering support
const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  location: { type: String, required: true, index: true },
  city: { type: String, required: true, index: true },
  country: { type: String, required: true, index: true },
  rating: { type: Number, required: true, min: 1, max: 5, index: true },
  image: { type: String, required: true },
  images: [{ type: String }], // Additional images
  description: { type: String, required: true },
  
  // Pricing information
  priceRange: {
    min: { type: Number, required: true, index: true },
    max: { type: Number, required: true, index: true }
  },
  
  // Room types with detailed information
  roomTypes: [roomTypeSchema],
  
  // Hotel features and amenities
  amenities: [{ type: String }],
  isPetFriendly: { type: Boolean, default: false, index: true },
  hasWifi: { type: Boolean, default: true },
  hasParking: { type: Boolean, default: false },
  hasPool: { type: Boolean, default: false },
  hasSpa: { type: Boolean, default: false },
  hasGym: { type: Boolean, default: false },
  hasRestaurant: { type: Boolean, default: false },
  
  // Location coordinates for map integration
  coordinates: {
    latitude: { type: Number },
    longitude: { type: Number }
  },
  
  // Contact information
  contact: {
    phone: { type: String },
    email: { type: String },
    website: { type: String }
  },
  
  // Address details
  address: {
    street: { type: String },
    zipCode: { type: String },
    landmark: { type: String }
  },
  
  // Reviews and ratings
  reviews: [reviewSchema],
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  
  // Availability and booking information
  availability: {
    isActive: { type: Boolean, default: true },
    blackoutDates: [{ 
      startDate: Date, 
      endDate: Date, 
      reason: String 
    }]
  },
  
  // SEO and search optimization
  tags: [{ type: String, index: true }],
  featured: { type: Boolean, default: false, index: true },
  verified: { type: Boolean, default: false },
  
  // Business information
  businessInfo: {
    checkInTime: { type: String, default: "15:00" },
    checkOutTime: { type: String, default: "11:00" },
    cancellationPolicy: { type: String },
    policies: [{ type: String }]
  }
}, { 
  timestamps: true,
  // Create text index for search functionality
  index: {
    name: 'text',
    description: 'text',
    location: 'text',
    city: 'text',
    tags: 'text'
  }
});

// Indexes for optimal query performance
hotelSchema.index({ city: 1, rating: -1 });
hotelSchema.index({ 'priceRange.min': 1, 'priceRange.max': 1 });
hotelSchema.index({ rating: -1, featured: -1 });
hotelSchema.index({ isPetFriendly: 1, city: 1 });
hotelSchema.index({ 'availability.isActive': 1, featured: -1 });

// Virtual for price per night (minimum room price)
hotelSchema.virtual('pricePerNight').get(function() {
  if (this.roomTypes && this.roomTypes.length > 0) {
    return Math.min(...this.roomTypes.map(room => room.price));
  }
  return this.priceRange ? this.priceRange.min : 0;
});

// Method to check availability for specific dates
hotelSchema.methods.isAvailableForDates = function(checkIn, checkOut) {
  if (!this.availability.isActive) return false;
  
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  
  // Check against blackout dates
  return !this.availability.blackoutDates.some(blackout => {
    const blackoutStart = new Date(blackout.startDate);
    const blackoutEnd = new Date(blackout.endDate);
    
    // Check if dates overlap with blackout period
    return (checkInDate <= blackoutEnd && checkOutDate >= blackoutStart);
  });
};

// Method to add a review
hotelSchema.methods.addReview = function(userId, userName, rating, comment) {
  this.reviews.push({ userId, userName, rating, comment });
  
  // Recalculate average rating
  const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  this.averageRating = totalRating / this.reviews.length;
  this.totalReviews = this.reviews.length;
  
  return this.save();
};

// Static method for advanced search and filtering
hotelSchema.statics.searchAndFilter = function(filters = {}, options = {}) {
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
    featured
  } = filters;
  
  const {
    page = 1,
    limit = 10,
    sortBy = 'rating',
    sortOrder = 'desc'
  } = options;
  
  let query = { 'availability.isActive': true };
  
  // Text search
  if (search) {
    query.$text = { $search: search };
  }
  
  // City filter
  if (city) {
    query.city = new RegExp(city, 'i');
  }
  
  // Price range filter
  if (minPrice !== undefined || maxPrice !== undefined) {
    query['priceRange.min'] = {};
    if (minPrice !== undefined) query['priceRange.min'].$gte = minPrice;
    if (maxPrice !== undefined) query['priceRange.max'] = { $lte: maxPrice };
  }
  
  // Rating filter
  if (minRating) {
    query.rating = { $gte: minRating };
  }
  
  // Pet-friendly filter
  if (isPetFriendly) {
    query.isPetFriendly = true;
  }
  
  // Featured filter
  if (featured) {
    query.featured = true;
  }
  
  // Amenities filter
  if (amenities && amenities.length > 0) {
    query.amenities = { $in: amenities };
  }
  
  // Date availability filter (basic implementation)
  if (checkIn && checkOut) {
    // In a real implementation, this would check against booking records
    // For now, we'll just exclude hotels with blackout dates in this period
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    query.$nor = [{
      'availability.blackoutDates': {
        $elemMatch: {
          startDate: { $lte: checkOutDate },
          endDate: { $gte: checkInDate }
        }
      }
    }];
  }
  
  // Build sort object
  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
  
  // Add secondary sort by rating for consistent results
  if (sortBy !== 'rating') {
    sort.rating = -1;
  }
  
  // Calculate pagination
  const skip = (page - 1) * limit;
  
  return this.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate('reviews.userId', 'name email');
};

module.exports = mongoose.model('Hotel', hotelSchema);
