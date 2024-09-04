const mongoose = require('mongoose');

const gameHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gameId: { type: String, required: true }, // Game ID as a string
  score: { type: Number, required: true },
  datePlayed: { type: Date, default: Date.now }
});

// Export the GameHistory model
const GameHistory = mongoose.model('GameHistory', gameHistorySchema);
module.exports = GameHistory;
