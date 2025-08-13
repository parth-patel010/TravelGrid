const express = require('express');
const {
  getHotels,
  getHotelById
} = require('../controller/hotelController');

const router = express.Router();

// Public routes
router.get('/', getHotels);           // GET /api/hotels - Get all hotels with filtering
router.get('/:id', getHotelById);     // GET /api/hotels/:id - Get single hotel

module.exports = router;
