const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../../middleware/authMiddleware');

// Generate Access Token (short-lived)
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, walletAddress: user.walletAddress },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }  // Short-lived access token (1 hour)
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

// Wallet login route
router.post('/wallet-login', async (req, res) => {
  const { walletAddress } = req.body;

  if (!walletAddress) {
    return res.status(400).json({ message: 'Wallet address is required' });
  }

  try {
    let user = await User.findOne({ walletAddress });

    // If the user doesn't exist, create a new one
    if (!user) {
      user = new User({
        walletAddress,
        username: `user_${walletAddress.slice(-6)}`,
        email: `user_${walletAddress.slice(-6)}@example.com`,
      });
      await user.save();
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Store the refresh token in an HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,  // Secure cookie
      secure: process.env.NODE_ENV === 'production',  // Use HTTPS in production
      sameSite: 'strict',  // Prevent CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
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
  const refreshToken = req.cookies.refreshToken;  // Extract refresh token from the cookie

  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided' });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = { id: decoded.id, walletAddress: decoded.walletAddress };

    // Issue a new access token
    const accessToken = generateAccessToken(user);

    res.json({ accessToken });
  } catch (error) {
    console.error('Error verifying refresh token:', error.message);
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
});

// Example protected route for user data
router.get('/user-data', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user data:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
