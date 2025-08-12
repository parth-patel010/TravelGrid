const Place = require('../models/place'); // Make sure you have this model

exports.searchPlaces = async (req, res) => {
  try {
    const { location, category } = req.query;
    let query = {};

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    if (category && category !== 'All Categories') {
      query.category = category;
    }

    const results = await Place.find(query).limit(20);
    res.json({ results });
  } catch (err) {
    res.status(500).json({ message: 'Search failed', error: err.message });
  }
};