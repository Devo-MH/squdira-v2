// server/games/sandbox.js
const axios = require('axios');

const fetchSandboxLand = async (landId) => {
  try {
    // Replace {landId} with actual LAND ID
    const response = await axios.get(`https://api.sandbox.game/lands/${landId}`);
    
    // Map the data to our standardized game data model
    const land = response.data;
    return {
      id: land.id,
      title: `LAND at ${land.coordinates.x}, ${land.coordinates.y}`,
      description: land.owner ? `Owned by ${land.owner}` : 'No owner information available',
      thumbnail: land.image || 'https://sandbox.game/logo.png', // Placeholder thumbnail
      gameUrl: `https://www.sandbox.game/en/lands/${land.id}`, // Link to the LAND in The Sandbox
      genre: 'Virtual World',
    };
  } catch (error) {
    console.error('Error fetching Sandbox data:', error);
    return null;
  }
};

module.exports = fetchSandboxLand;
