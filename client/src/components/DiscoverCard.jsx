import React from 'react'

function DiscoverCard({
    index,
    place,
    handleBookNowClick
}) {
  return (
    <div
        key={index}
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
    >
        <img
            src={place.image}
            alt={place.name}
            className="w-full h-48 object-cover"
        />
        <div className="p-4">
            <h3 className="text-xl font-semibold text-black mb-2">
            {place.name}
            </h3>
            <p className="text-gray-600 text-sm">{place.description}</p>
        </div>
        <div className="p-4">
            <button
                onClick={handleBookNowClick} // Attach the redirect function
                className="mt-auto w-full bg-zinc-800 hover:bg-zinc-900 text-white font-semibold py-2 px-4 rounded-xl transition-colors duration-200 transform hover:scale-105 cursor-pointer"
            >
                Book Now
            </button>
        </div>
    </div>
  )
}

export default DiscoverCard;
