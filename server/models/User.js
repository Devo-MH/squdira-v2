// server/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  username: { type: String, default: 'Anonymous' },
  avatar: { type: String, default: '/default-avatar.png' },
  achievements: [{ type: String }],
  gameHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
