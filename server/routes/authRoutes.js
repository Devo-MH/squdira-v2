import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { verifyMessage } from 'ethers';

const router = express.Router();

// Helper function to generate tokens
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, walletAddress: user.walletAddress },
    process.env.JWT_SECRET,
    { expiresIn: '15m' } // Access token valid for 15 minutes
  );

  const refreshToken = jwt.sign(
    { id: user._id, walletAddress: user.walletAddress },
    process.env.REFRESH_TOKEN_SECRET, // Use the correct environment variable
    { expiresIn: '7d' } // Refresh token valid for 7 days
  );

  return { accessToken, refreshToken };
};

// Wallet login route
router.post('/wallet-login', async (req, res) => {
  const { walletAddress, signature } = req.body;

  // Check if walletAddress and signature are provided
  if (!walletAddress || !signature) {
    return res.status(400).json({ message: 'Wallet address and signature are required' });
  }

  try {
    const message = 'Sign this message to authenticate with Squdira.';

    // Log the values to verify they're being passed correctly
    console.log('Received Wallet Address:', walletAddress);
    console.log('Received Signature:', signature);
    console.log('Message to be verified:', message);

    // Verify the signature and recover the wallet address
    const recoveredAddress = verifyMessage(message, signature);

    console.log('Recovered Address from Signature:', recoveredAddress);

    // Ensure the recovered address matches the provided wallet address
    if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      return res.status(401).json({ message: 'Signature verification failed' });
    }

    // Find the user by wallet address or create a new user
    let user = await User.findOne({ walletAddress });

    if (!user) {
      // Create a new user if not found
      user = new User({ walletAddress });
      await user.save();
      console.log('New user created:', user);
    } else {
      console.log('User found:', user);
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // Set refresh token as HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Respond with the access token
    res.json({ accessToken });
    console.log('Access Token generated and sent to client.');

  } catch (error) {
    console.error('Error during wallet login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Refresh access token route
router.post('/refresh-token', async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: 'No refresh token provided' });
  }

  try {
    // Use the correct secret key for verifying the refresh token
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(payload.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Generate new tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // Update refresh token cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Respond with the new access token
    res.json({ accessToken });
    console.log('Access Token refreshed and sent to client.');

  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(401).json({ message: 'Invalid refresh token' });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  // Clear the refresh token cookie
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
  res.json({ message: 'Logged out successfully' });
  console.log('User logged out and refresh token cleared.');
});

export default router;
