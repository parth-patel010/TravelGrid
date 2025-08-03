const Trip = require('../models/trips.js');

// POST /api/trips - Save a trip
exports.createTrip = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ Logged-in user ID from middleware

    const trip = new Trip({
      ...req.body,
      userId, // ✅ Save the trip with user ID
    });

    await trip.save();
    res.status(201).json({ message: 'Trip saved successfully', trip });
  } catch (error) {
    console.error('Create Trip Error:', error);
    res.status(500).json({ message: 'Failed to save trip' });
  }
};

// GET /api/trips - Get trips only for logged-in user
exports.getAllTrips = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ Logged-in user
    const trips = await Trip.find({ userId }).sort({ _id: -1 }); // ✅ Only this user's trips
    res.status(200).json(trips);
  } catch (error) {
    console.error('Fetch Trips Error:', error);
    res.status(500).json({ message: 'Failed to fetch trips' });
  }
};

// DELETE /api/trips/:id - Delete only if user owns the trip
exports.deleteTrip = async (req, res) => {
  try {
    const userId = req.user._id;
    const tripId = req.params.id;

    const deleted = await Trip.findOneAndDelete({ _id: tripId, userId }); // ✅ Check ownership

    if (!deleted) {
      return res.status(404).json({ message: 'Trip not found or not authorized' });
    }

    res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.error('Delete Trip Error:', error);
    res.status(500).json({ message: 'Failed to delete trip' });
  }
};
