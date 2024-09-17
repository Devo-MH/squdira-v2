const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { fetchProtoDetails } = require('./protoDetails');

const fetchGodsUnchainedCards = async (page = 1, perPage = 10) => {
  try {
    console.log(`Fetching Gods Unchained cards, Page: ${page}, PerPage: ${perPage}`);

    const response = await axios.get('https://api.godsunchained.com/v0/card', {
      params: {
        page,
        perPage,
      },
      headers: {
        'Accept': 'application/json',
      },
    });

    // Check if records are available
    const { records } = response.data;
    if (!records || records.length === 0) {
      console.warn('No cards found in the response');
      return [];
    }

    // Process and map cards
    const cards = await Promise.all(records.map(async (card) => {
      try {
        const protoDetails = await fetchProtoDetails(card.proto);
        return {
          id: card.id?.Int64 || uuidv4(),
          proto: card.proto,
          name: protoDetails.name,
          description: protoDetails.description,
          purity: card.purity,
          user: card.user,
          image: protoDetails.image,
          genre: 'Card Game',
        };
      } catch (protoError) {
        console.error(`Error fetching proto details for card ${card.proto}:`, protoError);
        return null;  // Return null if proto details fetching fails
      }
    }));

    // Filter out any null cards due to failed proto details
    return cards.filter(card => card !== null);
  } catch (error) {
    // Log detailed error message
    console.error('Error fetching Gods Unchained cards:', error.response ? error.response.data : error.message);
    return [];
  }
};

module.exports = {
  fetchGodsUnchainedCards,
};
