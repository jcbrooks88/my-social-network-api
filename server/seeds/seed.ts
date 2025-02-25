import mongoose from 'mongoose';
import Thought from '../models/Thought'; // Your Thought model
import Friend from '../models/Friend'; // Your Friend model

// Sample data for thoughts
const thoughtsData = [
  {
    userId: 'user1',
    content: 'This is my first thought!',
    createdAt: new Date(),
  },
  {
    userId: 'user2',
    content: 'I love coding in React!',
    createdAt: new Date(),
  },
  {
    userId: 'user1',
    content: 'MongoDB is awesome!',
    createdAt: new Date(),
  },
];

// Sample data for friends
const friendsData = [
  { userId: 'user1', friends: ['user2', 'user3'] },
  { userId: 'user2', friends: ['user1'] },
  { userId: 'user3', friends: ['user1'] },
];

const seedDatabase = async () => {
  try {
    // Connect to your MongoDB instance
    await mongoose.connect('mongodb://localhost:27017/social_network');

    // Check if thoughts or friends data already exists
    const thoughtsCount = await Thought.countDocuments();
    const friendsCount = await Friend.countDocuments();

    // Seed thoughts if the collection is empty
    if (thoughtsCount === 0) {
      await Thought.insertMany(thoughtsData);
      console.log('Thoughts have been seeded.');
    } else {
      console.log('Thoughts already exist.');
    }

    // Seed friends if the collection is empty
    if (friendsCount === 0) {
      await Friend.insertMany(friendsData);
      console.log('Friends have been seeded.');
    } else {
      console.log('Friends data already exists.');
    }

    // Close the database connection after seeding
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding the database:', error);
  }
};

// Run the seed function
seedDatabase();

