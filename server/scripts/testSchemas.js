const mongoose = require('mongoose');
const User = require('../models/User');
const GameHistory = require('../models/GameHistory');

// Connect to the database
mongoose.connect('mongodb://localhost/yourDatabaseName', {
  // Connection options (use the latest supported options)
});

(async () => {
  try {
    // Create a new user
    const newUser = new User({
      username: 'testUser',
      email: 'testUser@example.com',
      password: 'hashedPassword123',
      profilePicture: 'https://example.com/testUser.png',
      bio: 'A test user.',
      connectedWallets: ['0xabc123...', '0xdef456...'],
    });
    await newUser.save();

    console.log('New User Created:', newUser);

    // Log a game history entry with a string gameId
    const newGameHistory = new GameHistory({
      userId: newUser._id,
      gameId: 'someGameId123', // Game ID as a string
      score: 10000,
      datePlayed: new Date(),
    });
    await newGameHistory.save();

    console.log('Game History Entry Created:', newGameHistory);
  } catch (error) {
    console.error('Error during schema testing:', error);
  } finally {
    mongoose.connection.close();
  }
})();
