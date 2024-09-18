// server/services/godsUnchainedService.js
import axios from 'axios';
import { fetchProtoDetails } from './protoDetails.js';

export const fetchGodsUnchainedCards = async (page = 1, perPage = 10) => {
  try {
    const response = await axios.get('https://api.godsunchained.com/v0/card', {
      params: { page, perPage },
    });

    const { records } = response.data;
    if (!records || records.length === 0) {
      console.warn('No cards found in the response');
      return [];
    }

    const cards = await Promise.all(
      records.map(async (card) => {
        try {
          const protoDetails = await fetchProtoDetails(card.proto);
          return {
            id: card.id || card.proto,
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
          return null;
        }
      })
    );

    return cards.filter((card) => card !== null);
  } catch (error) {
    console.error('Error fetching Gods Unchained cards:', error.message);
    return [];
  }
};
