// server/routes/userRoutes.js
import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

// Get current user's profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('gameHistory');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user's profile
router.put('/profile', authMiddleware, async (req, res) => {
  const { username, avatar } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { username, avatar },
      { new: true, runValidators: true }
    ).populate('gameHistory');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
