const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User'); // Adjust the path to your User model

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const removeDuplicateEmails = async () => {
  try {
    const duplicates = await User.aggregate([
      {
        $group: {
          _id: { email: "$email" },
          uniqueIds: { $addToSet: "$_id" },
          count: { $sum: 1 }
        }
      },
      {
        $match: {
          count: { "$gt": 1 }
        }
      }
    ]);

    for (const duplicate of duplicates) {
      // Remove all but the first document (retains one)
      duplicate.uniqueIds.shift();
      await User.deleteMany({ _id: { $in: duplicate.uniqueIds } });
    }
    console.log('Duplicate emails removed.');
  } catch (error) {
    console.error('Error removing duplicates:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

removeDuplicateEmails();
