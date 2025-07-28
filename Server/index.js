const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// DB Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
  res.send("Hello world")
})

// Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'API is running smoothly!' });
});
app.use('/api/auth', authRoutes);

// server
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
