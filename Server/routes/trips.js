const express = require('express');
const {
  createTrip,
  getAllTrips,
  deleteTrip,
} = require('../controller/tripsController');

const router = express.Router();

router.post('/trips', createTrip);
router.get('/trips', getAllTrips);
router.delete('/trips/:id', deleteTrip);

module.exports = router;
