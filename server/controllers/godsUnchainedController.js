const { fetchGodsUnchainedCards } = require('../services/godsUnchainedService');

const getGodsUnchainedCards = async (req, res) => {
  try {
    const { page = 1, perPage = 10 } = req.query;
    const cards = await fetchGodsUnchainedCards(page, perPage);
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Gods Unchained cards' });
  }
};

module.exports = {
  getGodsUnchainedCards,
};
