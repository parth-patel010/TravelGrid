const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../models/user');

const mongoose = require('mongoose');



const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
if (!JWT_SECRET) {
  console.error('JWT_SECRET not set in environment variables');
  process.exit(1);
}

// Google Authentication
exports.googleAuth = async (req, res) => {
  try {
    const { email, name, picture, googleId } = req.body;

    if (!email || !name || !googleId) {
      return res.status(400).json({ message: 'Google authentication data is incomplete' });
    }

    // Email validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const normalizedEmail = email.toLowerCase();
    
    // Check if user already exists
    let user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      // Create new user with Google data
      user = await User.create({
        name,
        email: normalizedEmail,
        googleId,
        picture,
        isGoogleUser: true
      });
    } else {
      // Update existing user with Google data if not already a Google user
      if (!user.googleId) {
        user.googleId = googleId;
        user.picture = picture;
        user.isGoogleUser = true;
        await user.save();
      }
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: '✅ Google authentication successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        isGoogleUser: user.isGoogleUser
      }
    });
  } catch (err) {
    console.error('Google auth error:', err);
    res.status(500).json({ message: 'Server Error during Google authentication' });
  }
};

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Email validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Password strength validation (special char optional)
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0 // special character optional
      })
    ) {
      return res.status(400).json({
        message:
          'Password must have at least 8 chars, 1 uppercase, 1 lowercase and 1 number'
      });
    }

    const normalizedEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword
    });
    console.log('User saved to DB:', user);

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      message: '✅ User registered',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Email validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: '✅ Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
