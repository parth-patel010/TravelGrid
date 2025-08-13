const mongoose = require('mongoose');
const Hotel = require('../models/hotel');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Sample hotel data matching our frontend data structure
const sampleHotels = [
  {
    name: 'The Taj Mahal Palace',
    location: 'Mumbai, India',
    city: 'Mumbai',
    country: 'India',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1488747279002-c8523379faaa?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1488747279002-c8523379faaa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Since 1903 this waterfront icon has welcomed presidents, royalty, and celebrities with legendary Indian hospitality overlooking the Gateway of India.',
    priceRange: {
      min: 3500,
      max: 8500
    },
    roomTypes: [
      { id: 'standard', name: 'Standard Room', price: 3500, description: 'Comfortable room with luxury amenities', maxOccupancy: 2 },
      { id: 'deluxe', name: 'Deluxe Room', price: 5500, description: 'Spacious room with premium amenities', maxOccupancy: 3 },
      { id: 'suite', name: 'Executive Suite', price: 7500, description: 'Luxury suite with separate living area', maxOccupancy: 4 },
      { id: 'presidential', name: 'Presidential Suite', price: 8500, description: 'Ultimate luxury with panoramic views', maxOccupancy: 4 }
    ],
    amenities: ['WiFi', 'Spa', 'Restaurant', 'Pool', 'Gym', 'Room Service'],
    isPetFriendly: false,
    hasWifi: true,
    hasParking: true,
    hasPool: true,
    hasSpa: true,
    hasGym: true,
    hasRestaurant: true,
    coordinates: {
      latitude: 18.9220,
      longitude: 72.8332
    },
    contact: {
      phone: '+91 22 6665 3366',
      email: 'reservations@tajhotels.com',
      website: 'https://www.tajhotels.com'
    },
    address: {
      street: 'Apollo Bunder',
      zipCode: '400001'
    },
    tags: ['luxury', 'heritage', 'waterfront', 'business'],
    featured: true,
    verified: true,
    availability: {
      isActive: true,
      blackoutDates: []
    }
  },
  {
    name: 'The Plaza',
    location: 'New York, USA',
    city: 'New York',
    country: 'USA',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A timeless New York City icon overlooking Central Park, The Plaza blends elegant history with world-class luxury and service since 1907.',
    priceRange: {
      min: 4000,
      max: 9000
    },
    roomTypes: [
      { id: 'standard', name: 'Standard Room', price: 4000, description: 'Comfortable room with city views', maxOccupancy: 2 },
      { id: 'deluxe', name: 'Deluxe Room', price: 6000, description: 'Spacious room with Central Park views', maxOccupancy: 3 },
      { id: 'suite', name: 'Executive Suite', price: 8000, description: 'Luxury suite with living area', maxOccupancy: 4 },
      { id: 'presidential', name: 'Presidential Suite', price: 9000, description: 'Ultimate luxury with panoramic park views', maxOccupancy: 4 }
    ],
    amenities: ['WiFi', 'Spa', 'Restaurant', 'Gym', 'Concierge', 'Valet'],
    isPetFriendly: false,
    hasWifi: true,
    hasParking: true,
    hasPool: false,
    hasSpa: true,
    hasGym: true,
    hasRestaurant: true,
    coordinates: {
      latitude: 40.7640,
      longitude: -73.9744
    },
    contact: {
      phone: '+1 212-759-3000',
      email: 'reservations@theplaza.com',
      website: 'https://www.fairmont.com/the-plaza-new-york'
    },
    address: {
      street: '768 5th Avenue',
      zipCode: '10019'
    },
    tags: ['luxury', 'historic', 'central park', 'iconic'],
    featured: true,
    verified: true,
    availability: {
      isActive: true,
      blackoutDates: []
    }
  },
  {
    name: 'Hotel de Paris',
    location: 'Monte-Carlo, Monaco',
    city: 'Monte-Carlo',
    country: 'Monaco',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Nestled on the glamorous Casino Square, Hotel de Paris offers Belle Époque opulence, Michelin-starred dining, and privileged access to the best of Monaco.',
    priceRange: {
      min: 5000,
      max: 12000
    },
    roomTypes: [
      { id: 'standard', name: 'Standard Room', price: 5000, description: 'Elegant room with Monaco charm', maxOccupancy: 2 },
      { id: 'deluxe', name: 'Deluxe Room', price: 7500, description: 'Spacious room with casino views', maxOccupancy: 3 },
      { id: 'suite', name: 'Executive Suite', price: 10000, description: 'Luxury suite with Mediterranean views', maxOccupancy: 4 },
      { id: 'presidential', name: 'Presidential Suite', price: 12000, description: 'Ultimate luxury with private terrace', maxOccupancy: 4 }
    ],
    amenities: ['WiFi', 'Spa', 'Restaurant', 'Casino', 'Concierge', 'Pet Friendly'],
    isPetFriendly: true,
    hasWifi: true,
    hasParking: true,
    hasPool: false,
    hasSpa: true,
    hasGym: true,
    hasRestaurant: true,
    coordinates: {
      latitude: 43.7403,
      longitude: 7.4281
    },
    contact: {
      phone: '+377 98 06 30 00',
      email: 'reservation@hoteldeparismontecarlo.com',
      website: 'https://www.hoteldeparismontecarlo.com'
    },
    address: {
      street: 'Place du Casino',
      zipCode: '98000'
    },
    tags: ['luxury', 'casino', 'mediterranean', 'michelin'],
    featured: true,
    verified: true,
    availability: {
      isActive: true,
      blackoutDates: []
    }
  },
  {
    name: 'The Ritz',
    location: 'London, UK',
    city: 'London',
    country: 'UK',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Synonymous with refinement, The Ritz London pairs Edwardian grandeur with impeccable afternoon teas and service worthy of royalty.',
    priceRange: {
      min: 3000,
      max: 7500
    },
    roomTypes: [
      { id: 'standard', name: 'Standard Room', price: 3000, description: 'Classic room with Edwardian elegance', maxOccupancy: 2 },
      { id: 'deluxe', name: 'Deluxe Room', price: 4500, description: 'Spacious room with park views', maxOccupancy: 3 },
      { id: 'suite', name: 'Executive Suite', price: 6500, description: 'Luxury suite with period features', maxOccupancy: 4 },
      { id: 'presidential', name: 'Presidential Suite', price: 7500, description: 'Royal luxury with private balcony', maxOccupancy: 4 }
    ],
    amenities: ['WiFi', 'Spa', 'Restaurant', 'Afternoon Tea', 'Concierge', 'Pet Friendly'],
    isPetFriendly: true,
    hasWifi: true,
    hasParking: true,
    hasPool: false,
    hasSpa: true,
    hasGym: true,
    hasRestaurant: true,
    coordinates: {
      latitude: 51.5074,
      longitude: -0.1278
    },
    contact: {
      phone: '+44 20 7493 8181',
      email: 'enquiries@theritzlondon.com',
      website: 'https://www.theritzlondon.com'
    },
    address: {
      street: '150 Piccadilly',
      zipCode: 'W1J 9BR'
    },
    tags: ['luxury', 'edwardian', 'afternoon tea', 'royal'],
    featured: true,
    verified: true,
    availability: {
      isActive: true,
      blackoutDates: []
    }
  },
  {
    name: 'The Peninsula',
    location: 'Hong Kong, China',
    city: 'Hong Kong',
    country: 'China',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Hong Kong\'s "Grand Dame" boasts harbour-view suites, legendary hospitality, and a fleet of Rolls-Royces for the ultimate arrival.',
    priceRange: {
      min: 2800,
      max: 6500
    },
    roomTypes: [
      { id: 'standard', name: 'Standard Room', price: 2800, description: 'Comfortable room with city views', maxOccupancy: 2 },
      { id: 'deluxe', name: 'Deluxe Room', price: 4200, description: 'Spacious room with harbour glimpses', maxOccupancy: 3 },
      { id: 'suite', name: 'Executive Suite', price: 5500, description: 'Luxury suite with harbour views', maxOccupancy: 4 },
      { id: 'presidential', name: 'Presidential Suite', price: 6500, description: 'Ultimate luxury with panoramic harbour views', maxOccupancy: 4 }
    ],
    amenities: ['WiFi', 'Spa', 'Restaurant', 'Pool', 'Gym', 'Rolls-Royce Fleet'],
    isPetFriendly: false,
    hasWifi: true,
    hasParking: true,
    hasPool: true,
    hasSpa: true,
    hasGym: true,
    hasRestaurant: true,
    coordinates: {
      latitude: 22.2943,
      longitude: 114.1722
    },
    contact: {
      phone: '+852 2920 2888',
      email: 'phk@peninsula.com',
      website: 'https://www.peninsula.com/en/hong-kong'
    },
    address: {
      street: 'Salisbury Road, Tsim Sha Tsui',
      zipCode: 'Kowloon'
    },
    tags: ['luxury', 'harbour view', 'rolls royce', 'heritage'],
    featured: true,
    verified: true,
    availability: {
      isActive: true,
      blackoutDates: []
    }
  },
  {
    name: 'Four Seasons George V',
    location: 'Paris, France',
    city: 'Paris',
    country: 'France',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Steps from the Champs-Élysées, this palace hotel wows with Art-Deco elegance, triple-Michelin-star dining, and legendary floral displays.',
    priceRange: {
      min: 4500,
      max: 11000
    },
    roomTypes: [
      { id: 'standard', name: 'Standard Room', price: 4500, description: 'Elegant room with Parisian charm', maxOccupancy: 2 },
      { id: 'deluxe', name: 'Deluxe Room', price: 6500, description: 'Spacious room with courtyard views', maxOccupancy: 3 },
      { id: 'suite', name: 'Executive Suite', price: 9000, description: 'Luxury suite with Art-Deco features', maxOccupancy: 4 },
      { id: 'presidential', name: 'Presidential Suite', price: 11000, description: 'Ultimate luxury with Champs-Élysées views', maxOccupancy: 4 }
    ],
    amenities: ['WiFi', 'Spa', 'Restaurant', 'Michelin Star', 'Concierge', 'Pet Friendly'],
    isPetFriendly: true,
    hasWifi: true,
    hasParking: true,
    hasPool: false,
    hasSpa: true,
    hasGym: true,
    hasRestaurant: true,
    coordinates: {
      latitude: 48.8689,
      longitude: 2.3012
    },
    contact: {
      phone: '+33 1 49 52 70 00',
      email: 'reservation.par@fourseasons.com',
      website: 'https://www.fourseasons.com/paris'
    },
    address: {
      street: '31 Avenue George V',
      zipCode: '75008'
    },
    tags: ['luxury', 'michelin star', 'art deco', 'champs elysees'],
    featured: true,
    verified: true,
    availability: {
      isActive: true,
      blackoutDates: []
    }
  },
  {
    name: 'Raffles',
    location: 'Singapore',
    city: 'Singapore',
    country: 'Singapore',
    rating: 5,
    image: 'https://plus.unsplash.com/premium_photo-1661878434394-7f7e3d032b2a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    images: [
      'https://plus.unsplash.com/premium_photo-1661878434394-7f7e3d032b2a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    description: 'Where the Singapore Sling was born, Raffles is an oasis of colonial-style luxury, tropical gardens, and storied heritage suites.',
    priceRange: {
      min: 3200,
      max: 7800
    },
    roomTypes: [
      { id: 'standard', name: 'Standard Room', price: 3200, description: 'Colonial-style room with garden views', maxOccupancy: 2 },
      { id: 'deluxe', name: 'Deluxe Room', price: 4800, description: 'Spacious room with heritage features', maxOccupancy: 3 },
      { id: 'suite', name: 'Executive Suite', price: 6500, description: 'Luxury suite with tropical garden access', maxOccupancy: 4 },
      { id: 'presidential', name: 'Presidential Suite', price: 7800, description: 'Ultimate colonial luxury with private garden', maxOccupancy: 4 }
    ],
    amenities: ['WiFi', 'Spa', 'Restaurant', 'Pool', 'Gardens', 'Heritage Bar'],
    isPetFriendly: false,
    hasWifi: true,
    hasParking: true,
    hasPool: true,
    hasSpa: true,
    hasGym: true,
    hasRestaurant: true,
    coordinates: {
      latitude: 1.2943,
      longitude: 103.8467
    },
    contact: {
      phone: '+65 6337 1886',
      email: 'singapore@raffles.com',
      website: 'https://www.raffles.com/singapore'
    },
    address: {
      street: '1 Beach Road',
      zipCode: '189673'
    },
    tags: ['heritage', 'colonial', 'singapore sling', 'gardens'],
    featured: true,
    verified: true,
    availability: {
      isActive: true,
      blackoutDates: []
    }
  },
  {
    name: 'The Langham',
    location: 'Chicago, USA',
    city: 'Chicago',
    country: 'USA',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1516637090014-cb1ab78511f5?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1516637090014-cb1ab78511f5?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Occupying a Mies van der Rohe landmark on the Chicago River, The Langham marries mid-century design with award-winning service and Chuan Spa.',
    priceRange: {
      min: 2500,
      max: 6000
    },
    roomTypes: [
      { id: 'standard', name: 'Standard Room', price: 2500, description: 'Modern room with river views', maxOccupancy: 2 },
      { id: 'deluxe', name: 'Deluxe Room', price: 3800, description: 'Spacious room with skyline views', maxOccupancy: 3 },
      { id: 'suite', name: 'Executive Suite', price: 5000, description: 'Luxury suite with panoramic river views', maxOccupancy: 4 },
      { id: 'presidential', name: 'Presidential Suite', price: 6000, description: 'Ultimate luxury with private terrace', maxOccupancy: 4 }
    ],
    amenities: ['WiFi', 'Spa', 'Restaurant', 'Pool', 'Gym', 'River Views'],
    isPetFriendly: false,
    hasWifi: true,
    hasParking: true,
    hasPool: true,
    hasSpa: true,
    hasGym: true,
    hasRestaurant: true,
    coordinates: {
      latitude: 41.8887,
      longitude: -87.6355
    },
    contact: {
      phone: '+1 312-923-9988',
      email: 'tlchi.reservations@langhamhotels.com',
      website: 'https://www.langhamhotels.com/en/the-langham/chicago'
    },
    address: {
      street: '330 N Wabash Ave',
      zipCode: '60611'
    },
    tags: ['modern', 'river views', 'mies van der rohe', 'spa'],
    featured: false,
    verified: true,
    availability: {
      isActive: true,
      blackoutDates: []
    }
  },
  {
    name: 'The Savoy',
    location: 'London, UK',
    city: 'London',
    country: 'UK',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1488747279002-c8523379faaa?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1488747279002-c8523379faaa?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'An enduring London legend, The Savoy blends Art Deco glamour, theatre-district location, and the American Bar—one of the world\'s best cocktail spots.',
    priceRange: {
      min: 3500,
      max: 8000
    },
    roomTypes: [
      { id: 'standard', name: 'Standard Room', price: 3500, description: 'Art Deco room with Thames views', maxOccupancy: 2 },
      { id: 'deluxe', name: 'Deluxe Room', price: 5000, description: 'Spacious room with Strand views', maxOccupancy: 3 },
      { id: 'suite', name: 'Executive Suite', price: 6800, description: 'Luxury suite with river terrace', maxOccupancy: 4 },
      { id: 'presidential', name: 'Presidential Suite', price: 8000, description: 'Ultimate luxury with panoramic Thames views', maxOccupancy: 4 }
    ],
    amenities: ['WiFi', 'Spa', 'Restaurant', 'American Bar', 'Theatre District', 'Pet Friendly'],
    isPetFriendly: true,
    hasWifi: true,
    hasParking: true,
    hasPool: false,
    hasSpa: true,
    hasGym: true,
    hasRestaurant: true,
    coordinates: {
      latitude: 51.5105,
      longitude: -0.1209
    },
    contact: {
      phone: '+44 20 7836 4343',
      email: 'info@the-savoy.co.uk',
      website: 'https://www.fairmont.com/savoy-london'
    },
    address: {
      street: 'Strand',
      zipCode: 'WC2R 0EZ'
    },
    tags: ['art deco', 'thames', 'american bar', 'theatre district'],
    featured: false,
    verified: true,
    availability: {
      isActive: true,
      blackoutDates: []
    }
  }
];

// Seed function
const seedHotels = async () => {
  try {
    // Clear existing hotels
    await Hotel.deleteMany({});
    console.log('Existing hotels cleared');

    // Insert new hotels
    const hotels = await Hotel.insertMany(sampleHotels);
    console.log(`${hotels.length} hotels seeded successfully`);

    // Create text indexes
    await Hotel.createIndexes();
    console.log('Database indexes created');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding hotels:', error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  connectDB().then(() => {
    seedHotels();
  });
}

module.exports = { seedHotels, sampleHotels };
