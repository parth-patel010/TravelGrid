const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: function() {
        return !this.googleId; // Password is required only if not a Google user
      },
      minlength: 6,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple null values
    },
    picture: {
      type: String,
    },
    isGoogleUser: {
      type: Boolean,
      default: false,
    },
    savedPlaces: [
      {
        placeId: {
          type: String, 
          required: true
        },
        name: String,
        description: String,
        image: String
      }
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
