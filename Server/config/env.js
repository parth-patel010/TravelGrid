// Server/config/env.js
require('dotenv').config();

// Critical security variables
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error('ERROR: JWT_SECRET environment variable is not set');
  process.exit(1);
}

// Other environment variables with validation
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('ERROR: MONGO_URI environment variable is not set');
  process.exit(1);
}

module.exports = {
  JWT_SECRET,
  PORT,
  MONGO_URI,
  NODE_ENV: process.env.NODE_ENV || 'development'
};