import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/HotelBookingPage.css";

const hotelsData = [
  { id: 1, name: "The Grand Palace", price: 2200, rating: 4.5 },
  { id: 2, name: "Oceanview Resort", price: 3500, rating: 4.8 },
  { id: 3, name: "Mountain Escape", price: 1500, rating: 4.2 },
  { id: 4, name: "City Central Inn", price: 1800, rating: 4.0 },
  { id: 5, name: "Sunset Boulevard Hotel", price: 2700, rating: 4.6 },
  { id: 6, name: "Desert Mirage Stay", price: 1300, rating: 3.9 },
  { id: 7, name: "Forest Retreat", price: 2000, rating: 4.3 },
  { id: 8, name: "Lakeside Paradise", price: 3000, rating: 4.7 },
  { id: 9, name: "Budget Comfort Inn", price: 999, rating: 3.5 },
  { id: 10, name: "Sky High Suites", price: 4200, rating: 4.9 },
];

const HotelBookingPage = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const filteredHotels = hotelsData
    .filter((hotel) =>
      hotel.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="hotel-page">
      <h1>Find Your Perfect Stay</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search hotels..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="default">Sort By</option>
          <option value="price">Price: Low to High</option>
          <option value="rating">Rating: High to Low</option>
        </select>
      </div>

      <div className="hotel-list">
        {filteredHotels.map((hotel) => (
          <div className="hotel-card" key={hotel.id}>
            <h2>{hotel.name}</h2>
            <p>Price: ₹{hotel.price} / night</p>
            <p>Rating: ⭐ {hotel.rating}</p>
            <button onClick={() => {
              setSelectedHotel(hotel);
              setBookingConfirmed(true);
            }}>Book Now</button>
          </div>
        ))}
      </div>

      {/* Booking Confirmation Modal */}
      {bookingConfirmed && selectedHotel && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative text-black">
            <button
              className="absolute top-2 right-3 text-xl text-red-500 font-bold"
              onClick={() => {
                setBookingConfirmed(false);
                setSelectedHotel(null);
              }}
            >
              ×
            </button>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                Booking Confirmed!
              </h2>
              <p className="text-lg mb-2">
                Your booking at <span className="font-semibold">{selectedHotel.name}</span> is successful.
              </p>
              <p className="text-gray-600 mb-6">
                Price: ₹{selectedHotel.price} / night
              </p>
              <div className="space-y-2">
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold"
                  onClick={() => {
                    setBookingConfirmed(false);
                    setSelectedHotel(null);
                  }}
                >
                  Close
                </button>
                <Link
                  to="/feedback"
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold inline-block text-center"
                  onClick={() => {
                    setBookingConfirmed(false);
                    setSelectedHotel(null);
                  }}
                >
                  Share Feedback
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelBookingPage;
