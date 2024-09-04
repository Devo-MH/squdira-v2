const { fetchGodsUnchainedCards } = require('../services/godsUnchainedService');

const getGodsUnchainedCards = async (req, res) => {
  const { page, perPage } = req.query;
  const cards = await fetchGodsUnchainedCards(page, perPage);
  res.json(cards);
};

module.exports = {
  getGodsUnchainedCards,
};
