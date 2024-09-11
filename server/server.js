require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');  // For refresh token cookies

const app = express();

// Connect to MongoDB (ensure your MongoDB URI is correct in the .env file)
connectDB();

// Initialize middleware
app.use(express.json());        // Parse JSON request bodies
app.use(helmet());              // Adds security-related HTTP headers
app.use(morgan('tiny'));        // Logs HTTP requests
app.use(cookieParser());        // To handle cookies, especially refresh tokens

// Define routes
app.use('/api/auth', require('./routes/userRoutes'));  // Auth-related routes
app.use('/api/users', require('./routes/userRoutes'));  // User management routes

// Error-handling middleware (catches unhandled errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: err.message });
});

// Start the server on port 5001 or a custom port defined in .env
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
