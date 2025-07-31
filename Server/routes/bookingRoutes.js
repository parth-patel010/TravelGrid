const express = require('express')
const verifyJWT = require('../middleware/auth.js')

const {getAllBooking, addBooking, getBooking, editBooking, deleteBooking} = require('../controller/bookingController.js')

const bookingRouter = express.Router()

// PROTECTED ROUTES
bookingRouter.post('/addBooking', verifyJWT,addBooking)
bookingRouter.get('/getAllBookings',verifyJWT, getAllBooking)
bookingRouter.get('/getBooking/:id', verifyJWT, getBooking)
bookingRouter.delete('/deleteBooking/:id',verifyJWT, deleteBooking)
bookingRouter.patch('/editBooking/:id',verifyJWT, editBooking)

module.exports = bookingRouter