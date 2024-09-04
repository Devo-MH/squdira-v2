const axios = require('axios');

const fetchAxieInfinityData = async () => {
  try {
    const response = await axios.get('https://axieinfinity.com/api/axies'); // Example endpoint

    // Check if the response is HTML instead of JSON
    if (response.headers['content-type'].includes('text/html')) {
      console.error('Expected JSON but received HTML. The API endpoint might be incorrect.');
      return [];
    }

    // If the response is JSON, process it
    return response.data.map(item => ({
      id: item.id,
      title: item.name || 'Unknown Axie',
      description: item.description || 'No description available',
      thumbnail: item.image || 'https://axieinfinity.com/default-thumbnail.png', // Placeholder thumbnail
      gameUrl: `https://axieinfinity.com/axies/${item.id}`, // Link to the Axie in Axie Infinity
      genre: 'Blockchain Game',
    }));
  } catch (error) {
    console.error('Error fetching Axie Infinity data:', error);
    return [];
  }
};

module.exports = fetchAxieInfinityData;
