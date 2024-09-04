require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');  // Import cookie parser

const app = express();

// Connect to the database
connectDB();

// Init middleware
app.use(express.json());
app.use(helmet());  // Adds various security-related HTTP headers
app.use(morgan('tiny'));  // Logs HTTP requests
app.use(cookieParser());  // Parses cookies for refresh tokens

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/web3games', require('./routes/api/web3Games'));
app.use('/api/users', require('./routes/userRoutes'));  // Ensure the correct user route is registered

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error', error: err.message });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
