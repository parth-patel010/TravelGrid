const hotels = [
  {
    id: 'taj-mahal-palace',
    name: 'The Taj Mahal Palace',
    location: 'Mumbai, India',
    city: 'Mumbai',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1488747279002-c8523379faaa?auto=format&fit=crop&w=800&q=80',
    description:
      'Since 1903 this waterfront icon has welcomed presidents, royalty, and celebrities with legendary Indian hospitality overlooking the Gateway of India.',
    isPetFriendly: false,
    priceRange: {
      min: 3500,
      max: 8500
    },
    roomTypes: [
      { id: 'standard', name: 'Standard Room', price: 3500, description: 'Comfortable room with luxury amenities' },
      { id: 'deluxe', name: 'Deluxe Room', price: 5500, description: 'Spacious room with premium amenities' },
      { id: 'suite', name: 'Executive Suite', price: 7500, description: 'Luxury suite with separate living area' },
      { id: 'presidential', name: 'Presidential Suite', price: 8500, description: 'Ultimate luxury with panoramic views' }
    ]
  },
  {
    id: 'the-plaza',
    name: 'The Plaza',
    location: 'New York, USA',
    city: 'New York',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80',
    description:
      'A timeless New York City icon overlooking Central Park, The Plaza blends elegant history with world-class luxury and service since 1907.',
    isPetFriendly: false,
    priceRange: {
      min: 4000,
      max: 9000
    },
    roomTypes: [
      { id: 'standard', name: 'Standard Room', price: 4000, description: 'Comfortable room with city views' },
      { id: 'deluxe', name: 'Deluxe Room', price: 6000, description: 'Spacious room with Central Park views' },
      { id: 'suite', name: 'Executive Suite', price: 8000, description: 'Luxury suite with living area' },
      { id: 'presidential', name: 'Presidential Suite', price: 9000, description: 'Ultimate luxury with panoramic park views' }
    ]
  },
  {
    id: 'hotel-de-paris',
    name: 'Hotel de Paris',
    location: 'Monte-Carlo, Monaco',
    city: 'Monte-Carlo',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=800&q=80',
    description:
      'Nestled on the glamorous Casino Square, Hotel de Paris offers Belle Époque opulence, Michelin-starred dining, and privileged access to the best of Monaco.',
    isPetFriendly: true,
    priceRange: {
      min: 5000,
      max: 12000
    },
    roomTypes: [
      { id: 'standard', name: 'Standard Room', price: 5000, description: 'Elegant room with Monaco charm' },
      { id: 'deluxe', name: 'Deluxe Room', price: 7500, description: 'Spacious room with casino views' },
      { id: 'suite', name: 'Executive Suite', price: 10000, description: 'Luxury suite with Mediterranean views' },
      { id: 'presidential', name: 'Presidential Suite', price: 12000, description: 'Ultimate luxury with private terrace' }
    ]
  },
  {
    id: 'the-ritz-london',
    name: 'The Ritz',
    location: 'London, UK',
    city: 'London',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    description:
      'Synonymous with refinement, The Ritz London pairs Edwardian grandeur with impeccable afternoon teas and service worthy of royalty.',
    isPetFriendly: true,
    priceRange: {
      min: 3000,
      max: 7500
    },
    roomTypes: [
      { id: 'standard', name: 'Standard Room', price: 3000, description: 'Classic room with Edwardian elegance' },
      { id: 'deluxe', name: 'Deluxe Room', price: 4500, description: 'Spacious room with park views' },
      { id: 'suite', name: 'Executive Suite', price: 6500, description: 'Luxury suite with period features' },
      { id: 'presidential', name: 'Presidential Suite', price: 7500, description: 'Royal luxury with private balcony' }
    ]
  },
  {
    id: 'the-peninsula',
    name: 'The Peninsula',
    location: 'Hong Kong, China',
    city: 'Hong Kong',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80',
    description:
      'Hong Kong\'s "Grand Dame" boasts harbour-view suites, legendary hospitality, and a fleet of Rolls-Royces for the ultimate arrival.',
    isPetFriendly: false,
    priceRange: {
      min: 2800,
      max: 6500
    },
    roomTypes: [
      { id: 'standard', name: 'Standard Room', price: 2800, description: 'Comfortable room with city views' },
      { id: 'deluxe', name: 'Deluxe Room', price: 4200, description: 'Spacious room with harbour glimpses' },
      { id: 'suite', name: 'Executive Suite', price: 5500, description: 'Luxury suite with harbour views' },
      { id: 'presidential', name: 'Presidential Suite', price: 6500, description: 'Ultimate luxury with panoramic harbour views' }
    ]
  },
  {
    id: 'four-seasons-george-v',
    name: 'Four Seasons George V',
    location: 'Paris, France',
    city: 'Paris',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    description:
      'Steps from the Champs-Élysées, this palace hotel wows with Art-Deco elegance, triple-Michelin-star dining, and legendary floral displays.',
    isPetFriendly: true,
    priceRange: {
      min: 4500,
      max: 11000
    },
    roomTypes: [
      { id: 'standard', name: 'Standard Room', price: 4500, description: 'Elegant room with Parisian charm' },
      { id: 'deluxe', name: 'Deluxe Room', price: 6500, description: 'Spacious room with courtyard views' },
      { id: 'suite', name: 'Executive Suite', price: 9000, description: 'Luxury suite with Art-Deco features' },
      { id: 'presidential', name: 'Presidential Suite', price: 11000, description: 'Ultimate luxury with Champs-Élysées views' }
    ]
  },
  {
    id: 'raffles-singapore',
    name: 'Raffles',
    location: 'Singapore',
    city: 'Singapore',
    rating: 5,
    image: 'https://plus.unsplash.com/premium_photo-1661878434394-7f7e3d032b2a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Where the Singapore Sling was born, Raffles is an oasis of colonial-style luxury, tropical gardens, and storied heritage suites.',
    isPetFriendly: false,
    priceRange: {
      min: 3200,
      max: 7800
    },
    roomTypes: [
      { id: 'standard', name: 'Standard Room', price: 3200, description: 'Colonial-style room with garden views' },
      { id: 'deluxe', name: 'Deluxe Room', price: 4800, description: 'Spacious room with heritage features' },
      { id: 'suite', name: 'Executive Suite', price: 6500, description: 'Luxury suite with tropical garden access' },
      { id: 'presidential', name: 'Presidential Suite', price: 7800, description: 'Ultimate colonial luxury with private garden' }
    ]
  },
  {
    id: 'the-langham-chicago',
    name: 'The Langham',
    location: 'Chicago, USA',
    city: 'Chicago',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1516637090014-cb1ab78511f5?auto=format&fit=crop&w=800&q=80',
    description:
      'Occupying a Mies van der Rohe landmark on the Chicago River, The Langham marries mid-century design with award-winning service and Chuan Spa.',
    isPetFriendly: false,
    priceRange: {
      min: 2500,
      max: 6000
    },
    roomTypes: [
      { id: 'standard', name: 'Standard Room', price: 2500, description: 'Modern room with river views' },
      { id: 'deluxe', name: 'Deluxe Room', price: 3800, description: 'Spacious room with skyline views' },
      { id: 'suite', name: 'Executive Suite', price: 5000, description: 'Luxury suite with panoramic river views' },
      { id: 'presidential', name: 'Presidential Suite', price: 6000, description: 'Ultimate luxury with private terrace' }
    ]
  },
  {
    id: 'the-savoy',
    name: 'The Savoy',
    location: 'London, UK',
    city: 'London',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1488747279002-c8523379faaa?auto=format&fit=crop&w=800&q=80',
    description:
      'An enduring London legend, The Savoy blends Art Deco glamour, theatre-district location, and the American Bar—one of the world\'s best cocktail spots.',
    isPetFriendly: true,
    priceRange: {
      min: 3500,
      max: 8000
    },
    roomTypes: [
      { id: 'standard', name: 'Standard Room', price: 3500, description: 'Art Deco room with Thames views' },
      { id: 'deluxe', name: 'Deluxe Room', price: 5000, description: 'Spacious room with Strand views' },
      { id: 'suite', name: 'Executive Suite', price: 6800, description: 'Luxury suite with river terrace' },
      { id: 'presidential', name: 'Presidential Suite', price: 8000, description: 'Ultimate luxury with panoramic Thames views' }
    ]
  }
];

// Export as default
export default hotels;

// Also provide named export for compatibility
export { hotels };