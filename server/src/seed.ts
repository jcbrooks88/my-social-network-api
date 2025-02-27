import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Friend from './models/Friend';
import Thought from './models/Thought';

dotenv.config(); // Load environment variables

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/socialNetworkDB';

// ✅ Function to seed the database
export const seedDatabase = async () => {
  try {
    // Connect only if not already connected
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGO_URI);
      console.log('✅ Connected to MongoDB');
    }

    // ✅ Check if user already exists before adding
    const existingUser = await Friend.findOne({ userId: 'user1' });
    if (!existingUser) {
      const newUser = await Friend.create({ userId: 'user1', friends: [] });
      const newThought = await Thought.create({ userId: newUser._id, content: 'Hello, world!' });

      console.log('✅ New seed data added:', { newUser, newThought });
    } else {
      console.log('ℹ️ User "user1" already exists. No new data added.');
    }

    // Don't close the connection—let the server keep running
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    await mongoose.connection.close();
    console.log('📌 Database connection closed due to error');
  }
};

// Automatically run the seed function when `npm run dev` starts
seedDatabase();
