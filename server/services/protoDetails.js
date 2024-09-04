const axios = require('axios');

const fetchProtoDetails = async (protoId) => {
  try {
    const response = await axios.get(`https://api.godsunchained.com/v0/proto/${protoId}`);
    return {
      name: response.data.name,
      description: response.data.effect,
      image: `https://api.godsunchained.com/v0/image/${protoId}`,
    };
  } catch (error) {
    console.error(`Error fetching proto details for proto ID ${protoId}:`, error);
    return {
      name: 'Unknown Name',
      description: 'No description available',
      image: 'https://placeholder.com/placeholder.png',
    };
  }
};

module.exports = {
  fetchProtoDetails,
};
