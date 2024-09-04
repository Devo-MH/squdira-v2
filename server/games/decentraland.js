// server/games/decentraland.js
const axios = require('axios');

const fetchDecentralandWearables = async () => {
  try {
    // Fetch data from the Decentraland Wearables API
    const response = await axios.get('https://peer.decentraland.org/lambdas/collections/wearables');
    
    // Map the data to our standardized game data model
    return response.data.map(item => ({
      id: item.id,
      title: item.name,
      description: item.description || 'No description available',
      thumbnail: item.image || 'https://decentraland.org/images/default-thumbnail.png', // Adjust if needed
      gameUrl: `https://market.decentraland.org/contracts/${item.contractAddress}/items/${item.id}`, // Example URL
      genre: 'Wearables',
    }));
  } catch (error) {
    console.error('Error fetching Decentraland data:', error);
    return [];
  }
};

module.exports = fetchDecentralandWearables;
