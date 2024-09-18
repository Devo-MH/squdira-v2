// server/routes/tournamentRoutes.js
import express from 'express';
import Tournament from '../models/Tournament.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all tournaments
router.get('/', async (req, res) => {
  try {
    const tournaments = await Tournament.find().populate('game');
    res.json(tournaments);
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get tournament by ID
router.get('/:id', async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id)
      .populate('game')
      .populate('participants');
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }
    res.json(tournament);
  } catch (error) {
    console.error('Error fetching tournament:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Register for a tournament
router.post('/:id/register', authMiddleware, async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }

    if (tournament.participants.includes(req.user.id)) {
      return res.status(400).json({ message: 'Already registered' });
    }

    tournament.participants.push(req.user.id);
    await tournament.save();
    res.json({ message: 'Registered successfully' });
  } catch (error) {
    console.error('Error registering for tournament:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
