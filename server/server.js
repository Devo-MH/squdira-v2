import 'dotenv/config';  // ES module version of dotenv
import express from 'express';
import connectDB from './config/db.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';  // For refresh token cookies
import cors from 'cors';
import fetch from 'node-fetch';  // ES module import for node-fetch

const app = express();

// Connect to MongoDB (ensure your MongoDB URI is correct in the .env file)
connectDB();

// Initialize middleware
app.use(express.json());        // Parse JSON request bodies
app.use(helmet());              // Adds security-related HTTP headers
app.use(morgan('tiny'));        // Logs HTTP requests
app.use(cookieParser());        // To handle cookies, especially refresh tokens
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
}));

// Define routes
import userRoutes from './routes/userRoutes.js';
app.use('/api/auth', userRoutes);  // Auth-related routes
app.use('/api/users', userRoutes);  // User management routes

// Function to fetch details for a specific prototype (card)
async function fetchCardDetails(proto) {
  try {
    const response = await fetch(`https://api.godsunchained.com/v0/proto/${proto}`);
    const cardDetails = await response.json();
    return {
      id: proto,
      name: cardDetails.name || 'Unknown',
      description: cardDetails.effect || 'No description available',
      image: `https://api.godsunchained.com/v0/image/${proto}`,
      genre: 'Card Game',
      purity: cardDetails.purity || 'Unknown',
    };
  } catch (error) {
    console.error(`Error fetching details for proto ${proto}:`, error);
    return { id: proto, name: 'Unknown', description: 'Error fetching card details' };
  }
}

// Standardized data model mapping for different Web3 games
const mappingStrategies = {
  'gods-unchained': {
    apiUrl: 'https://api.godsunchained.com/v0/card',
    mapFunc: async (data) => {
      return Promise.all(
        data.records.map(async (record) => {
          return await fetchCardDetails(record.proto);  // Fetch details for each proto
        })
      );
    }
  },
  'splinterlands': {
    apiUrl: 'https://api.splinterlands.io/cards/get_details',
    mapFunc: async (data) => {
      return data.map(card => ({
        id: card.id,
        name: card.name,
        image: card.image_url || `https://api.splinterlands.io/cards/${card.id}`,
        description: card.description || 'No description available',
        genre: 'Battle Card Game',
        rarity: card.rarity || 'Unknown',
      }));
    }
  },
  // You can add more working games here as needed
};

// Generic route to handle fetching game data dynamically
app.get('/api/games/:gameName', async (req, res) => {
  const gameName = req.params.gameName;
  const game = mappingStrategies[gameName];

  if (!game) {
    return res.status(404).json({ message: 'Game not supported' });
  }

  try {
    console.log(`Fetching data for game: ${gameName}`);
    const response = await fetch(game.apiUrl);

    // Log the raw text response for debugging
    const rawText = await response.text();
    console.log('Raw API Response:', rawText);

    // Parse JSON only if the response is successful
    if (response.ok) {
      const data = JSON.parse(rawText);  // Parse the raw text into JSON
      const standardizedData = await game.mapFunc(data);  // Map the game data to the standardized model
      res.json(standardizedData);  // Send the standardized data
    } else {
      throw new Error(`API responded with status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error fetching data for ${gameName}:`, error.message);
    res.status(500).json({ message: 'Failed to fetch game data', error: error.message });
  }
});

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
