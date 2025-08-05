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


exports.googleAuth = async (req, res) => {
  const { token } = req.body;

  try {
    // 1. Verify token with Google
    const response = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
    );

    const googleUser = await response.json();

    if (!googleUser.email) {
      return res.status(400).json({ success: false, error: "Invalid Google token" });
    }

    // 2. Find existing user
    let user = await User.findOne({ email: googleUser.email });

    if (!user) {
      // Create new Google user
      user = await User.create({
        name: googleUser.name || "Google User",
        email: googleUser.email,
        picture: googleUser.picture,
        googleId: googleUser.sub,
        isGoogleUser: true
      });
    } else if (!user.googleId) {
      // Update existing user (normal signup → Google login later)
      user.googleId = googleUser.sub;
      user.isGoogleUser = true;
      user.picture = googleUser.picture; // update picture
      await user.save();
    }

    // 3. Generate JWT
    const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 4. Send response
    res.json({
      success: true,
      token: userToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email format' });
    }

    const normalizedEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword
    });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    return res.status(201).json({
      success: true,
      message: 'User registered',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email format' });
    }

    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Agar Google user hai toh normal login se block karo
    if (user.isGoogleUser) {
      return res.status(400).json({ success: false, error: 'Please login with Google' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// logout user
exports.logoutUser = async(req,res) => {
  // just remove the token
  try {
    return res
            .status(200)
            .clearCookie("token",{
              httpOnly : true,
              secure : true
            })
            .json({
              message : "User logged out successfully!",
              success : true
            })
  } 
  catch (error) {
    return res
            .status(500)
            .json({
              message : "Error logging out the user!",
              success : false
            })
  }
}