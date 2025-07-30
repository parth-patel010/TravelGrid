const express = require('express')
const {getAllBooking, addBooking, getBooking, editBooking, deleteBooking} = require('../controller/bookingController.js')

const bookingRouter = express.Router()

bookingRouter.post('/addBooking', addBooking)
bookingRouter.get('/getAllBookings', getAllBooking)
bookingRouter.get('/getBooking/:id', getBooking)
bookingRouter.delete('/deleteBooking/:id', deleteBooking)
bookingRouter.patch('/editBooking/:id', editBooking)

module.exports = bookingRouter