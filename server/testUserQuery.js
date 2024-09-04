require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User'); // Ensure this path is correct based on your file structure

async function testUserQuery() {
  try {
    console.log('MONGO_URI:', process.env.MONGO_URI); // Log the connection string
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    const userId = new mongoose.Types.ObjectId('66cba567b02c07cd7673b00e');
    console.log('Attempting to query user with _id:', userId);

    const user = await User.findOne({ _id: userId }).select('-password');

    if (!user) {
      console.log('User not found for userId:', userId);
    } else {
      console.log('User found:', user);
    }
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    mongoose.connection.close();
  }
}

testUserQuery();
