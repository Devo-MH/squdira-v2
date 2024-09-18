// server/models/Tournament.js
import mongoose from 'mongoose';

const tournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  entryFee: { type: Number, default: 0 },
  prizePool: { type: Number, default: 0 },
  startDate: { type: Date, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  brackets: { type: Object }, // Structure to hold bracket data
  createdAt: { type: Date, default: Date.now },
  // Add other fields as necessary
});

export default mongoose.model('Tournament', tournamentSchema);
