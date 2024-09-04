const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { fetchProtoDetails } = require('./protoDetails');

const fetchGodsUnchainedCards = async (page = 1, perPage = 10) => {
  try {
    const response = await axios.get('https://api.godsunchained.com/v0/card', {
      params: {
        page,
        perPage,
      },
      headers: {
        'Accept': 'application/json',
      },
    });

    const cards = await Promise.all(response.data.records.map(async (card) => {
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
    }));

    return cards;
  } catch (error) {
    console.error('Error fetching Gods Unchained cards:', error);
    return [];
  }
};

module.exports = {
  fetchGodsUnchainedCards,
};
