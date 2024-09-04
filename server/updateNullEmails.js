const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User'); // Adjust the path to your User model

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const updateEmptyEmails = async () => {
  try {
    const users = await User.find({ email: '' });
    for (const user of users) {
      // Assign a unique placeholder email if necessary
      user.email = `user_${user._id}@example.com`;
      await user.save();
    }
    console.log('Empty emails updated.');
  } catch (error) {
    console.error('Error updating emails:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

updateEmptyEmails();
