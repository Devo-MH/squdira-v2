import express from 'express';
import jwt from 'jsonwebtoken';
import Web3 from 'web3';
import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Initialize Web3 with a provider (Ganache or Infura RPC URL)
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));

// Generate Access Token (short-lived)
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, walletAddress: user.walletAddress },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }  // Short-lived access token
  );
};

// Generate Refresh Token (long-lived)
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, walletAddress: user.walletAddress },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }  // Long-lived refresh token (7 days)
  );
};

// Wallet login route with proper validation
router.post('/wallet-login', async (req, res) => {
  const { walletAddress } = req.body;

  console.log('Received wallet address:', walletAddress);

  // Validate wallet address using web3.js and a fallback regex check
  const isValidWeb3 = web3.utils.isAddress(walletAddress);
  const isValidRegex = /^0x[a-fA-F0-9]{40}$/.test(walletAddress);
  const isValid = isValidWeb3 || isValidRegex;

  if (!walletAddress || !isValid) {
    return res.status(400).json({ message: 'Invalid wallet address' });
  }

  try {
    let user = await User.findOne({ walletAddress });

    if (!user) {
      user = new User({
        walletAddress,
        username: `user_${walletAddress.slice(-6)}`,
        email: `user_${walletAddress.slice(-6)}@example.com`,
      });
      await user.save();
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.json({
      accessToken,
      message: 'Login successful',
      walletAddress: user.walletAddress,
    });
  } catch (error) {
    console.error('Error during wallet login:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Refresh token route
router.post('/refresh-token', (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = { id: decoded.id, walletAddress: decoded.walletAddress };

    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  } catch (error) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
});

// Example protected route for user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Fetch user data
router.get('/user-data', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;  // Use export default for ES modules
