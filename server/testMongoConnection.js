require('dotenv').config();
const mongoose = require('mongoose');

const testMongoConnection = async () => {
  console.log('Starting MongoDB connection test...');
  try {
    console.log('Attempting to connect...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
  } finally {
    console.log('Closing MongoDB connection...');
    await mongoose.connection.close(); // Close the connection after testing
    console.log('MongoDB connection closed.');
  }
};

testMongoConnection();
