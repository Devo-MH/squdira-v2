const axios = require('axios');

const fetchGodsUnchainedCards = async () => {
  try {
    const response = await axios.get('https://api.godsunchained.com/v0/cards', {
      params: {
        page: 1,
        perPage: 10,
      },
      headers: {
        'Accept': 'application/json',
      },
    });

    const cards = response.data.cards.map(card => ({
      id: card.id,
      name: card.name,
      description: card.effect,
      manaCost: card.mana,
      attack: card.attack,
      health: card.health,
      rarity: card.rarity,
      imageUrl: card.image,
      set: card.set.name,
      type: card.type,
    }));

    console.log(cards);
    return cards;
  } catch (error) {
    console.error('Error fetching Gods Unchained cards:', error);
    return [];
  }
};

module.exports = fetchGodsUnchainedCards;
