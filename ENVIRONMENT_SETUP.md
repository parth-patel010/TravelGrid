# TravelGrid Environment Setup Guide

This guide will help you set up the environment variables for both the frontend and backend of the TravelGrid application with email verification functionality.

## 📋 Prerequisites

Before setting up the environment variables, make sure you have:

- Node.js installed (v16 or higher)
- MongoDB installed locally or MongoDB Atlas account
- Gmail account with 2-factor authentication enabled
- Google Cloud Console account (for OAuth)

## 🔧 Backend Setup (.env)

### 1. Copy the example file
```bash
cp .env.example .env
```

### 2. Configure each variable in the `.env` file:

#### Database Configuration
```env
MONGODB_URI=mongodb://localhost:27017/travelgrid
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/travelgrid
```

#### JWT Configuration
```env
JWT_SECRET=your_super_secure_jwt_secret_key_change_this_in_production
SESSION_SECRET=your_session_secret_key_here
```
**Generate secure keys using:** `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

#### Email Configuration (Gmail)
```env
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password_here
EMAIL_FROM="TravelGrid <your_gmail_address@gmail.com>"
```

**Setting up Gmail App Password:**
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-factor authentication
3. Generate an "App Password" for Mail
4. Use the generated 16-character password (not your regular Gmail password)

#### Google OAuth Configuration
```env
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

**Setting up Google OAuth:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable Google OAuth API
4. Create OAuth 2.0 credentials
5. Add authorized origins: `http://localhost:5173`, `http://localhost:3000`
6. Copy the Client ID and Secret

#### Server Configuration
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

## 🎨 Frontend Setup (.env)

### 1. Copy the example file
```bash
cp .env.example .env
```

### 2. Configure each variable in the `.env` file:

```env
# Backend API Configuration
VITE_API_URL=http://localhost:5000

# Google OAuth Configuration (same as backend)
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here

# App Configuration
VITE_APP_NAME=TravelGrid
VITE_APP_URL=http://localhost:5173

# Features
VITE_EMAIL_VERIFICATION_ENABLED=true
NODE_ENV=development
```

## 🚀 Getting Started

### 1. Install Dependencies

**Backend:**
```bash
cd Server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### 2. Start MongoDB
```bash
# If using local MongoDB
mongod

# If using MongoDB Atlas, just ensure your connection string is correct
```

### 3. Test Email Configuration (Backend)
```bash
cd Server
node -e "
const { testEmailConfiguration } = require('./utils/emailService');
testEmailConfiguration().then(console.log);
"
```

### 4. Start the Application

**Backend (Terminal 1):**
```bash
cd Server
npm start
# or npm run dev for development with nodemon
```

**Frontend (Terminal 2):**
```bash
cd client
npm run dev
```

## 📧 Email Verification Features

The application now includes:
- ✅ Email verification on user registration
- ✅ Resend verification code functionality
- ✅ Email verification status in navbar
- ✅ Beautiful HTML email templates
- ✅ Verification code expiration (5 minutes)
- ✅ Automatic verification for Google OAuth users

## 🔒 Security Notes

1. **Never commit `.env` files** - They are already in `.gitignore`
2. **Use strong JWT secrets** - Generate random 64-character strings
3. **Use Gmail App Passwords** - Never use your regular Gmail password
4. **Enable HTTPS in production** - Update URLs and security settings
5. **Rotate secrets regularly** - Especially in production environments

## 🐛 Troubleshooting

### Email Issues
- **Authentication failed**: Check Gmail app password and 2FA settings
- **Connection failed**: Verify SMTP settings and network connectivity
- **Rate limiting**: Gmail has sending limits for new accounts

### OAuth Issues
- **Invalid client**: Check Google Client ID matches between frontend/backend
- **Origin not allowed**: Add your domains to Google Console authorized origins

### Database Issues
- **Connection failed**: Ensure MongoDB is running and connection string is correct
- **Authentication failed**: Check MongoDB Atlas credentials

## 📞 Support

If you encounter issues:
1. Check the browser console for frontend errors
2. Check server logs for backend errors
3. Verify all environment variables are set correctly
4. Test email configuration using the test script

---

**Happy coding! 🚀✨**
