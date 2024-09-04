const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');

// Wallet login route
router.post('/wallet-login', async (req, res) => {
  const { walletAddress } = req.body;

  if (!walletAddress) {
    return res.status(400).json({ message: 'Wallet address is required' });
  }

  try {
    let user = await User.findOne({ walletAddress });

    if (!user) {
      // Generate a unique username and email based on the wallet address
      let generatedUsername = `user_${walletAddress.slice(-6)}`;
      let generatedEmail = `${generatedUsername}@example.com`;

      // Ensure the generated username is unique
      while (await User.findOne({ username: generatedUsername })) {
        generatedUsername = `user_${walletAddress.slice(-6)}_${Date.now()}`;
      }

      // Ensure the generated email is unique
      while (await User.findOne({ email: generatedEmail })) {
        generatedEmail = `${generatedUsername}_${Date.now()}@example.com`;
      }

      user = new User({
        walletAddress,
        username: generatedUsername,
        email: generatedEmail, // Assign a unique email
      });

      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, walletAddress: user.walletAddress },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, message: 'Login successful', walletAddress: user.walletAddress });
  } catch (error) {
    console.error('Error during wallet login:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Protected route to get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ walletAddress: req.user.walletAddress });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ walletAddress: user.walletAddress, profilePicture: user.profilePicture, bio: user.bio });
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Manage Connected Wallets
router.post('/wallet', authMiddleware, async (req, res) => {
  const { walletAddress } = req.body;
  const userId = req.user.id;

  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (walletAddress && typeof walletAddress === 'string' && walletAddress.trim()) {
      if (!user.connectedWallets.includes(walletAddress)) {
        user.connectedWallets.push(walletAddress);
        await user.save();
        console.log('Wallet added:', walletAddress);
        res.status(200).json({ message: 'Wallet added successfully', connectedWallets: user.connectedWallets });
      } else {
        console.log('Wallet already exists:', walletAddress);
        res.status(200).json({ message: 'Wallet already connected', connectedWallets: user.connectedWallets });
      }
    } else {
      console.log('Invalid wallet address:', walletAddress);
      return res.status(400).json({ message: 'Invalid wallet address' });
    }
  } catch (error) {
    console.error('Error adding wallet:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route to remove a connected wallet
router.delete('/wallet/:walletAddress', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { walletAddress } = req.params;

  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.connectedWallets = user.connectedWallets.filter(wallet => wallet !== walletAddress);
    await user.save();

    console.log('Wallet removed:', walletAddress);
    res.status(200).json({ message: 'Wallet removed successfully', connectedWallets: user.connectedWallets });
  } catch (error) {
    console.error('Error removing wallet:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
