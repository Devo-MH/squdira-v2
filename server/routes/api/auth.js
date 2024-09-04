const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const auth = require('../../middleware/authMiddleware');

const router = express.Router();

// @route    POST api/auth
// @desc     Authenticate user & get token (email/password)
// @access   Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      // Ensure consistency with token signing
      jwt.sign(
        payload,
        process.env.JWT_SECRET,  // Changed to process.env.JWT_SECRET
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    GET api/auth
// @desc     Get logged in user (requires token)
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    POST api/auth/wallet-login
// @desc     Authenticate user via wallet address & get token
// @access   Public
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

    // Ensure consistency with token signing
    const token = jwt.sign(
      { id: user._id, walletAddress: user.walletAddress },
      process.env.JWT_SECRET,  // Changed to process.env.JWT_SECRET
      { expiresIn: '1h' }
    );

    res.json({ token, message: 'Login successful', walletAddress: user.walletAddress });
  } catch (error) {
    console.error('Error during wallet login:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
