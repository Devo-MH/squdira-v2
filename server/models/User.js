import mongoose from 'mongoose';

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

// Use default export for ES modules
const User = mongoose.model('User', UserSchema);

export default User;
