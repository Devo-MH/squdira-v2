// server/models/Game.js
import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genres: [String],
  platforms: [String],
  rating: Number,
  description: String,
  developer: String,
  releaseDate: Date,
  thumbnail: String,
  bannerImage: String,
  // Add other fields as necessary
});

export default mongoose.model('Game', gameSchema);
