# TravelGrid Setup Guide

## Prerequisites

### 1. Install Node.js
- Download Node.js 20.17.0 from https://nodejs.org/
- Verify installation: `node --version` and `npm --version`

### 2. Install MongoDB (Choose One Option)

#### Option A: Local MongoDB
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Install with default settings
3. Start MongoDB service:
   ```powershell
   # Windows
   net start MongoDB
   
   # Or start manually
   mongod --dbpath "C:\data\db"
   ```

#### Option B: MongoDB Atlas (Cloud - Recommended)
1. Go to https://cloud.mongodb.com/
2. Create a free account
3. Create a new cluster (choose free tier)
4. Create a database user
5. Add your IP to whitelist (or use 0.0.0.0/0 for development)
6. Get your connection string

### 3. Install Git
- Download from https://git-scm.com/

## Project Setup

### 1. Clone and Setup Backend

```powershell
# Navigate to Server directory
cd "d:\OneDrive\Desktop\Github\TravelGrid\Server"

# Install dependencies
npm install

# Create .env file (copy from .env.example or create new)
# Edit the .env file with your MongoDB connection
```

### 2. Environment Variables (.env file in Server directory)

```env
# MongoDB Connection (choose one)
MONGODB_URI=mongodb://localhost:27017/travelgrid
# OR for Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/travelgrid

# Security
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
SESSION_SECRET=your-session-secret-key-here

# Server Configuration
PORT=5000
NODE_ENV=development
API_BASE_URL=http://localhost:5000/api

# Email (optional - for user verification)
EMAIL_FROM=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 3. Setup Frontend

```powershell
# Navigate to client directory
cd "d:\OneDrive\Desktop\Github\TravelGrid\client"

# Install dependencies
npm install

# Create .env file for frontend
```

### 4. Frontend Environment Variables (.env file in client directory)

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# Google Maps (optional)
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

## Running the Project

### 1. Start Backend Server

```powershell
# In Server directory
cd "d:\OneDrive\Desktop\Github\TravelGrid\Server"

# Option A: Development mode with auto-restart
npm run dev

# Option B: Production mode
npm start
```

Server will run on: http://localhost:5000

### 2. Seed Database (First Time Only)

```powershell
# In Server directory
node seeders/hotelSeeder.js
```

### 3. Start Frontend

```powershell
# In client directory (new terminal)
cd "d:\OneDrive\Desktop\Github\TravelGrid\client"

# Start development server
npm run dev
```

Frontend will run on: http://localhost:5173

## Verification Steps

### 1. Check Backend
- Visit: http://localhost:5000/api/hotels
- Should return JSON with hotel data

### 2. Check Frontend
- Visit: http://localhost:5173
- Navigate to Hotels page
- Test filters and pagination

### 3. Check Database
```powershell
# If using local MongoDB
mongo
use travelgrid
db.hotels.find().limit(5)
```

## Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error
```
Error: MongooseError: The `uri` parameter to `openUri()` must be a string
```
**Solution**: Check your MONGODB_URI in .env file

#### 2. Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: 
- Kill process using port: `netstat -ano | findstr :5000`
- Or change PORT in .env file

#### 3. Module Not Found
```
Error: Cannot find module 'xyz'
```
**Solution**: Run `npm install` in the respective directory

#### 4. CORS Error in Browser
**Solution**: Check API_BASE_URL in frontend .env file

### Development Tools (Optional)

1. **MongoDB Compass**: GUI for MongoDB
   - Download: https://www.mongodb.com/products/compass

2. **Postman**: API testing
   - Download: https://www.postman.com/

3. **VS Code Extensions**:
   - ES7+ React/Redux/React-Native snippets
   - Prettier
   - ESLint
   - MongoDB for VS Code

## Project Structure

```
TravelGrid/
├── client/              # React frontend
│   ├── src/
│   ├── package.json
│   └── .env
├── Server/              # Node.js backend
│   ├── models/
│   ├── routes/
│   ├── controller/
│   ├── package.json
│   └── .env
└── README.md
```

## Next Steps

1. Set up MongoDB (local or Atlas)
2. Install dependencies for both client and server
3. Configure environment variables
4. Run database seeder
5. Start both servers
6. Test the application

## Need Help?

- Check console logs for errors
- Verify all environment variables are set
- Ensure MongoDB is running
- Check network firewall settings
- Verify Node.js version compatibility
