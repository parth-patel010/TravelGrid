import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PDFDownloadLink } from '@react-pdf/renderer';
import BookingPDF from '../components/PDF/BookingPDF';
import toast from 'react-hot-toast';
import Navbar from '../components/Custom/Navbar';
import './styles/HotelBookingForm.css';

const HotelBookingForm = () => {
  const location = useLocation()  ;
  const navigate = useNavigate();
  const { user } = useAuth();
  const { hotel } = location.state || {};

  const [bookingData, setBookingData] = useState({
    roomType: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    specialRequests: '',
    contactNumber: '',
    email: user?.email || 'guest@example.com'
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  const roomTypes = [
    { id: 'standard', name: 'Standard Room', price: 1500, description: 'Comfortable room with basic amenities' },
    { id: 'deluxe', name: 'Deluxe Room', price: 2500, description: 'Spacious room with premium amenities' },
    { id: 'suite', name: 'Executive Suite', price: 3500, description: 'Luxury suite with separate living area' },
    { id: 'presidential', name: 'Presidential Suite', price: 4500, description: 'Ultimate luxury with panoramic views' }
  ];

  const generateBookingId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 9000 + 1000);
    return `BOOK-${timestamp}-${random}`;
  };

  const calculateTotalPrice = () => {
    if (!bookingData.checkIn || !bookingData.checkOut || !bookingData.roomType) return 0;
    
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    
    // Prevent invalid calculations
    if (isNaN(nights) || nights <= 0) return 0;
    
    const selectedRoom = roomTypes.find(room => room.id === bookingData.roomType);
    const roomPrice = selectedRoom ? selectedRoom.price : 500; // Default to standard room price
    
    // Use room price as the total per night price (not base + room)
    return Math.max(nights * roomPrice, 0);
  };

  React.useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [bookingData.checkIn, bookingData.checkOut, bookingData.roomType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!bookingData.roomType || !bookingData.checkIn || !bookingData.checkOut || !bookingData.contactNumber) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (new Date(bookingData.checkIn) >= new Date(bookingData.checkOut)) {
      toast.error('Check-out date must be after check-in date');
      return;
    }

    const id = generateBookingId();
    setBookingId(id);
    setBookingConfirmed(true);
    toast.success('Booking Confirmed Successfully!');
  };

  if (!hotel) {
    return (
      <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-black to-pink-900 text-white">
        <Navbar />
        <main className="flex flex-col flex-1 items-center justify-center">
          <h2 className="text-3xl font-bold mb-4">Hotel information not found</h2>
          <button
            onClick={() => navigate('/hotels')}
            className="bg-gradient-to-r from-pink-600 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Hotels
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-black to-pink-900">
      <Navbar />
      
      <main className="flex-1 max-w-4xl mx-auto px-2 sm:px-4 pt-12 pb-8 w-full">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 text-white">
          <div className="mb-6 pt-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words mt-2">Book Your Stay</h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-pink-200">
              <span className="text-lg sm:text-xl font-semibold break-words">{hotel.name}</span>
              <span className="hidden sm:inline">•</span>
              <span className="text-sm sm:text-base">{hotel.location}</span>
            </div>
          </div>

          {!bookingConfirmed ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Room Type Selection */}
              <div>
                <label className="block text-lg font-semibold mb-3">Select Room Type *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {roomTypes.map((room) => (
                    <div
                      key={room.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        bookingData.roomType === room.id
                          ? 'border-pink-400 bg-pink-500/20'
                          : 'border-gray-400 hover:border-pink-300'
                      }`}
                      onClick={() => setBookingData(prev => ({ ...prev, roomType: room.id }))}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{room.name}</h3>
                        <span className="text-pink-300">₹{room.price}/night</span>
                      </div>
                      <p className="text-sm text-gray-300">{room.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-lg font-semibold mb-2">Check-in Date *</label>
                  <input
                    type="date"
                    name="checkIn"
                    value={bookingData.checkIn}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-3 rounded-lg bg-white/10 border border-gray-400 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-semibold mb-2">Check-out Date *</label>
                  <input
                    type="date"
                    name="checkOut"
                    value={bookingData.checkOut}
                    onChange={handleInputChange}
                    min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                    className="w-full p-3 rounded-lg bg-white/10 border border-gray-400 text-white"
                    required
                  />
                </div>
              </div>

              {/* Guests */}
              <div>
                <label className="block text-lg font-semibold mb-2">Number of Guests</label>
                <select
                  name="guests"
                  value={bookingData.guests}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-white/10 border border-gray-400 text-white"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num} className="bg-gray-800">{num} Guest{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-lg font-semibold mb-2">Contact Number *</label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={bookingData.contactNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="w-full p-3 rounded-lg bg-white/10 border border-gray-400 text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={bookingData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full p-3 rounded-lg bg-white/10 border border-gray-400 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-lg font-semibold mb-2">Special Requests</label>
                <textarea
                  name="specialRequests"
                  value={bookingData.specialRequests}
                  onChange={handleInputChange}
                  placeholder="Any special requirements or requests..."
                  rows="3"
                  className="w-full p-3 rounded-lg bg-white/10 border border-gray-400 text-white placeholder-gray-400"
                />
              </div>

              {/* Price Summary */}
              {totalPrice > 0 && (
                <div className="bg-pink-500/20 rounded-lg p-4 border border-pink-400">
                  <h3 className="text-lg font-semibold mb-3">Booking Summary & Calculation</h3>
                  <div className="space-y-2 text-sm">
                    {/* Room Selection */}
                    {bookingData.roomType && (
                      <div className="flex justify-between">
                        <span>Selected Room ({roomTypes.find(r => r.id === bookingData.roomType)?.name}):</span>
                        <span>₹{roomTypes.find(r => r.id === bookingData.roomType)?.price || 500}/night</span>
                      </div>
                    )}
                    
                    {/* Calculation Breakdown */}
                    {bookingData.checkIn && bookingData.checkOut && bookingData.roomType && (() => {
                      const nights = Math.ceil((new Date(bookingData.checkOut) - new Date(bookingData.checkIn)) / (1000 * 60 * 60 * 24));
                      const roomPrice = roomTypes.find(r => r.id === bookingData.roomType)?.price || 500;
                      return (
                        <>
                          <div className="border-t border-pink-300 pt-2 mt-2">
                            <div className="flex justify-between font-medium">
                              <span>Number of Nights:</span>
                              <span>{nights > 0 ? nights : 0} nights</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Rate per Night:</span>
                              <span>₹{roomPrice}</span>
                            </div>
                          </div>
                          
                          <div className="bg-pink-400/20 rounded p-2 border border-pink-300">
                            <div className="flex justify-between text-xs text-pink-200">
                              <span>Calculation:</span>
                              <span>{nights > 0 ? nights : 0} nights × ₹{roomPrice} = ₹{nights > 0 ? nights * roomPrice : 0}</span>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                    
                    <div className="border-t border-pink-400 pt-3 mt-3">
                      <div className="flex justify-between font-bold text-lg text-green-300">
                        <span>Total Amount:</span>
                        <span>₹{totalPrice}</span>
                      </div>
                    </div>
                    
                    {/* Additional Info */}
                    <div className="text-xs text-pink-200 mt-2">
                      <p>Includes all taxes and fees</p>
                      {bookingData.guests > 1 && (
                        <p>Accommodates {bookingData.guests} guests</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          ) : (
            /* Booking Confirmation */
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-3xl font-bold text-green-400 mb-4">Booking Confirmed!</h2>
              <div className="bg-green-500/20 rounded-lg p-6 border border-green-400">
                <p className="text-lg mb-2">Booking ID: <span className="font-mono font-bold">{bookingId}</span></p>
                <p className="text-lg mb-2">Hotel: <span className="font-semibold">{hotel.name}</span></p>
                <p className="text-lg mb-2">Room: <span className="font-semibold">{roomTypes.find(r => r.id === bookingData.roomType)?.name}</span></p>
                <p className="text-lg mb-2">Check-in: <span className="font-semibold">{bookingData.checkIn}</span></p>
                <p className="text-lg mb-2">Check-out: <span className="font-semibold">{bookingData.checkOut}</span></p>
                <p className="text-lg mb-4">Total Amount: <span className="font-bold text-green-400">₹{totalPrice}</span></p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <PDFDownloadLink
                  document={<BookingPDF user={user} hotel={hotel} bookingId={bookingId} bookingData={bookingData} totalPrice={totalPrice} />}
                  fileName={`Booking-${bookingId}.pdf`}
                >
                  {({ loading }) =>
                    loading ? (
                      <button className="bg-gray-600 text-white px-8 py-3 rounded-lg" disabled>
                        Generating PDF...
                      </button>
                    ) : (
                      <button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg font-semibold transition-all">
                        Download Booking PDF
                      </button>
                    )
                  }
                </PDFDownloadLink>
                
                <button
                  onClick={() => navigate('/hotels')}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-all"
                >
                  Back to Hotels
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HotelBookingForm;
