import React, { useState, useEffect } from 'react';
import { MapPin, TrendingUp, Star, Users, Calendar, Heart, Share2, Eye, Trash2 } from 'lucide-react';
import Navbar from '../components/Custom/Navbar';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom'; 
import { useWishlist } from '../context/WishlistContext';
import trendingLocationsData from '../data/TrendingLocationsData.json';

const TrendingSpots = () => {
  const [spots, setSpots] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(9);

  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    setTimeout(() => {
      setSpots(trendingLocationsData.trendingSpots);
      setLoading(false);
    }, 1000);
  }, []);

  const handleLoadMoreSpots = () => {
    setVisibleCount((prev) => prev + 9);
  }

  const filteredSpots = filter === 'all'
    ? spots
    : spots.filter(spot => spot.category === filter);

  const categories = [
    { key: 'all', label: 'All Spots', icon: TrendingUp },
    { key: 'beach', label: 'Beach', icon: '🏖️' },
    { key: 'cultural', label: 'Cultural', icon: '🏛️' },
    { key: 'nature', label: 'Nature', icon: '🏔️' },
    { key: 'city', label: 'City', icon: '🏙️' }
  ];

   //function to navigate to location detail
  const handleExploreLocation = (locationId) =>{
    navigate(`/location/${locationId}`);
  }
  
  // Function to toggle wishlist status
  const handleToggleWishlist = (e, spot) => {
    e.stopPropagation();
    if (isInWishlist(spot.id)) {
      removeFromWishlist(spot.id);
    } else {
      addToWishlist(spot);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--accent-primary)' }}></div>
          <p className="text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>Loading trending spots...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden transition-colors duration-300" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)',marginTop:"5rem" }}>

      <Navbar lightBackground />
  {/* Hero Section */}
      <div className="relative text-white py-24 md:py-46 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3000&q=80"
            alt="World travel destinations"
            className="w-full h-full object-cover object-center brightness-100"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-pink-900/40 to-black/30" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
<div className="text-center bg-white/10 backdrop-blur-md border border-white/30 shadow-lg rounded-xl p-4 w-[700px] mx-auto">


            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg text-pink-800">
              Trending <span className='text-pink-800'>Spots</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 drop-shadow-md">
              Discover the hottest destinations everyone's talking about
            </p>
            <div className="flex items-center justify-center space-x-2 text-gray-100 drop-shadow-sm">
              <TrendingUp className="h-5 w-5" />
              <span>Updated daily based on bookings and reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-pink-900 shadow-sm sticky top-0 z-10" style={{marginTop:"-5rem",marginBottom:"5rem"}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-start md:justify-center space-x-2 md:space-x-4 py-3 md:py-4 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setFilter(category.key)}
                className={`flex items-center space-x-1 md:space-x-2 px-3 md:px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 cursor-pointer text-sm md:text-base ${filter === category.key
                    ? 'bg-white text-pink-600 font-semibold shadow-md'
                    : 'border border-pink-300/20 text-pink-100 hover:bg-white/10 hover:border-pink-200/30'
                  }`}
              >
                {typeof category.icon === 'string' ? (
                  <span className="text-base md:text-lg">{category.icon}</span>
                ) : (
                  <category.icon className="h-4 w-4 md:h-5 md:w-5" />
                )}
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>


      {/* Trending Stats Banner */}
      <div className="border-b" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="border-white/20 hover:border-white/40 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20 rounded-2xl border shadow-lg overflow-hidden transition-all duration-300 group p-4 md:p-6 text-center" style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
              <div className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--accent-primary)' }}>{filteredSpots.length}+</div>
              <div className="text-sm md:text-base" style={{ color: 'var(--accent-secondary)' }}>Trending Destinations</div>
            </div>
            <div className="border-white/20 hover:border-white/40 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20 rounded-2xl border shadow-lg overflow-hidden transition-all duration-300 group p-4 md:p-6 text-center" style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
              <div className="text-2xl md:text-3xl font-bold text-green-400">23%</div>
              <div className="text-sm md:text-base" style={{ color: 'var(--accent-secondary)' }}>Average Growth</div>
            </div>
            <div className="border-white/20 hover:border-white/40 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20 rounded-2xl border shadow-lg overflow-hidden transition-all duration-300 group p-4 md:p-6 text-center" style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
              <div className="text-2xl md:text-3xl font-bold text-purple-400">—</div>
              <div className="text-sm md:text-base" style={{ color: 'var(--accent-secondary)' }}>Monthly Searches</div>
            </div>
            <div className="border-white/20 hover:border-white/40 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20 rounded-2xl border shadow-lg overflow-hidden transition-all duration-300 group p-4 md:p-6 text-center" style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
              <div className="text-2xl md:text-3xl font-bold text-red-400">4.7★</div>
              <div className="text-sm md:text-base" style={{ color: 'var(--accent-secondary)' }}>Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Spots Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredSpots.slice(0, visibleCount).map((spot, index) => (
            <div
              key={spot.id}
              className=" hover:border-white/40 hover:scale-105 hover:shadow-pink-500/20 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full bg-white border border-gray-200"
            >
              {/* Image Container */}
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                <img
                  src={spot.image}
                  alt={spot.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <div className="px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-semibold flex items-center space-x-1" style={{ background: 'var(--accent-primary)', color: '#fff' }}>
                    <TrendingUp className="h-3 w-3" />
                    <span>#{index + 1}</span>
                  </div>
                </div>
                <div className="absolute top-3 right-3 flex space-x-2">
                  <button 
                    className="p-1.5 md:p-2 rounded-full transition-all cursor-pointer hover:scale-110" 
                    style={{ 
                      background: 'var(--card-bg)', 
                      color: isInWishlist(spot.id) ? 'red' : 'var(--text-primary)', 
                      border: '1px solid var(--border-primary)' 
                    }}
                    onClick={(e) => handleToggleWishlist(e, spot)}
                  >
                    {isInWishlist(spot.id) ? (
                      <Trash2 className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
                    ) : (
                      <Heart className="h-3 w-3 md:h-4 md:w-4" />
                    )}
                  </button>
                  <button className="p-1.5 md:p-2 rounded-full transition-all cursor-pointer hover:scale-110" style={{ background: 'var(--card-bg)', color: 'var(--text-primary)', border: '1px solid var(--border-primary)' }}>
                    <Share2 className="h-3 w-3 md:h-4 md:w-4" />
                  </button>
                </div>
                <div className="absolute bottom-3 right-3">
                  <div className="px-2 py-1 rounded text-xs font-semibold" style={{ background: 'var(--success-color)', color: '#fff' }}>
                    +{spot.growth_percentage}%
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 md:p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-3 md:mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 truncate" style={{ color: 'var(--text-primary)' }}>
                      {spot.name}
                    </h3>
                    <div className="flex items-center" style={{ color: 'var(--text-secondary)' }}>
                      <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 flex-shrink-0" />
                      <span className="text-sm md:text-base truncate">{spot.country}</span>
                    </div>
                  </div>
                  <div className="text-right ml-2 md:ml-4 flex-shrink-0">
                    <div className="flex items-center justify-end space-x-1 mb-1">
                      <Star className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" style={{ color: 'var(--warning-color)' }} />
                      <span className="text-xs md:text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>{spot.rating}</span>
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{spot.price_range}</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4 text-xs md:text-sm">
                  <div className="flex items-center space-x-1 md:space-x-2">
                    <Users className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" style={{ color: 'var(--accent-primary)' }} />
                    <span className="truncate" style={{ color: 'var(--text-muted)' }}>{spot.visitors_count} visitors</span>
                  </div>
                  <div className="flex items-center space-x-1 md:space-x-2">
                    <Calendar className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" style={{ color: 'var(--accent-primary)' }} />
                    <span className="truncate" style={{ color: 'var(--text-muted)' }}>{spot.best_time}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-3 md:mb-4">
                  <div className="flex flex-wrap gap-1 md:gap-2">
                    {spot.highlights.slice(0, 2).map((highlight, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-medium truncate max-w-full"
                        style={{ background: 'var(--bg-tertiary)', color: 'var(--accent-primary)' }}
                      >
                        {highlight}
                      </span>
                    ))}
                    {spot.highlights.length > 2 && (
                      <span className="px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-medium" style={{ background: 'var(--accent-secondary)', color: '#fff' }}>
                        +{spot.highlights.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Stats */}
                <div className="flex items-center justify-between pt-3 md:pt-4 border-t mt-auto" style={{ borderColor: 'var(--border-primary)' }}>
                  <div className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm" style={{ color: 'var(--text-muted)' }}>
                    <Eye className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                    <span className="truncate">{spot.recent_reviews} recent reviews</span>
                  </div>
                  <div className="text-xs md:text-sm font-semibold" style={{ color: 'var(--accent-primary)' }}>
                    Trending Score: {spot.trending_score}
                  </div>
                </div>

                {/* CTA Button */}
                 <button className="w-full mt-4 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white py-3 px-6 rounded-lg font-semibold transition-all transform hover:scale-105 cursor-pointer duration-200"
                onClick={() => handleExploreLocation(spot.id)}>
                  Explore {spot.name}
                </button>
              </div>
            </div>
          ))}
          {filteredSpots.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-lg md:text-xl font-medium" style={{ color: 'var(--text-secondary)' }}>
                No spots match the selected category.
              </p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredSpots.length && (
          <div className="text-center mt-8 md:mt-12">
            <button
              onClick={handleLoadMoreSpots}
              className="bg-gradient-to-r from-pink-600 to-pink-500 shadow-md hover:shadow-lg text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold transition-all transform hover:scale-105 duration-200 cursor-pointer text-sm md:text-base"
            >
              Load More Trending Spots
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingSpots;
