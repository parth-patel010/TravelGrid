const express = require('express');
const bookingRoutes = require("./routes/booking.js");
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// DB Connection
connectDB();

// Middleware
// Allow specific origin (frontend)
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'API is running smoothly!' });
});
app.use('/api/auth', authRoutes);
//hotel bookings 
app.use("/api/bookings", bookingRoutes);

// 404 Not Found middleware
app.use((req,res,next)=>{
  res.status(404).json({message:'Resource not found'});
});
// Error handling middleware global
app.use((err,req,res,next)=>{
  console.error(err.stack);
  res.status(500).json({message:"Internal Server Error"});

});

// server
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
