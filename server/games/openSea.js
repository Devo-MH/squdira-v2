const axios = require('axios');

const fetchOpenSeaAssets = async () => {
  try {
    const response = await axios.get('https://api.opensea.io/api/v1/assets', {
      params: {
        order_direction: 'asc',
        offset: '0',
        limit: '10',
      },
      headers: {
        'Accept': 'application/json',
        'X-API-KEY': process.env.OPENSEA_API_KEY, // Optional: If you have an API key
      },
    });

    // Process and return the assets
    return response.data.assets.map(asset => ({
      id: asset.id,
      title: asset.name || 'Unknown Asset',
      description: asset.description || 'No description available',
      thumbnail: asset.image_url || asset.asset_contract.image_url,
      assetUrl: asset.permalink,
      genre: 'NFT',
    }));
  } catch (error) {
    console.error('Error fetching OpenSea assets:', error);
    return [];
  }
};

module.exports = fetchOpenSeaAssets;
