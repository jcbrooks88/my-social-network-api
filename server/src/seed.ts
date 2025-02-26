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

    // ❌ Delete existing data before inserting new
    await Friend.deleteMany({});
    await Thought.deleteMany({});
    console.log('🗑️ Database cleared');

    // ✅ Insert new seed data
    const newUser = await Friend.create({ userId: 'user1', friends: [] });
    const newThought = await Thought.create({ userId: newUser._id, content: 'Hello, world!' });

    console.log('✅ Seed data added:', { newUser, newThought });

    // Close the connection after seeding
    await mongoose.connection.close();
    console.log('📌 Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    await mongoose.connection.close();
    console.log('📌 Database connection closed due to error');
  }
};

// Run the seed function when executed directly
if (import.meta.url === 'file://' + process.argv[1]) {
  seedDatabase();
}
