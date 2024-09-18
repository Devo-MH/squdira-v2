// server/controllers/godsUnchainedController.js
import { fetchGodsUnchainedCards } from '../services/godsUnchainedService.js';

export const getGodsUnchainedCards = async (req, res) => {
  try {
    const { page = 1, perPage = 10 } = req.query;
    const cards = await fetchGodsUnchainedCards(page, perPage);
    res.json(cards);
  } catch (error) {
    console.error('Error fetching Gods Unchained cards:', error);
    res.status(500).json({ message: 'Error fetching Gods Unchained cards' });
  }
};
