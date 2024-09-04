const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profilePicture: {
    type: String,
  },
  bio: {
    type: String,
  },
  connectedWallets: {
    type: [String],
  },
  walletAddress: { 
    type: String,
    required: true,  // Ensure walletAddress is required
    unique: true,    // Ensure walletAddress is unique
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
