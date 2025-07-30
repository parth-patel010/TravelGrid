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
const allowedOrigins = ['http://localhost:5173', 'https://travel-grid.vercel.app'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // if you're sending cookies or auth headers
}));
// app.options('*', cors()); // handle preflight

app.use(express.json());

app.get("/",(req,res)=>{
  res.send("Server is running!");
});
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
