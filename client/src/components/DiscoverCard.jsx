import React from 'react'

function DiscoverCard({
    index,
    place,
    handleBookNowClick
}) {
  return (
    <div
        key={index}
        className="group bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20"
    >
        <div className="relative overflow-hidden">
            <img
                src={place.image}
                alt={place.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>
        <div className="p-4">
            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-pink-300 transition-colors duration-300">
            {place.name}
            </h3>
            <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">{place.description}</p>
        </div>
        <div className="p-4">
            <button
                onClick={handleBookNowClick}
                className="mt-auto w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl"
            >
                Book Now
            </button>
        </div>
    </div>
  )
}

export default DiscoverCard;
