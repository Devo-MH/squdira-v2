// generateToken.js

const jwt = require('jsonwebtoken');

// Define the payload
const payload = {
  walletAddress: "0x86A598b3717915dC281B0c313B7496C5A262203C"
};

// Define the secret key (must match the one used in your backend)
const secret = "your_secret_key"; // Replace with your actual secret key

// Define token options, like expiration time
const options = { expiresIn: '1h' }; // Token expires in 1 hour

// Generate the token
const token = jwt.sign(payload, secret, options);

console.log("Generated Token:", token);
