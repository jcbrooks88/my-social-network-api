import connection from '../config/connection';
import User from '../models/User';
import Thought from '../models/Thought';

const seedUsers = [
  { username: 'jeff', email: 'jeff@example.com' },
  { username: 'darlene', email: 'darlene@example.com' },
  { username: 'brian', email: 'brian@example.com' }
];

const seedThoughts = [
  { thoughtText: 'This is my first thought!', username: 'jeff' },
  { thoughtText: 'Loving this social network app!', username: 'darlene' },
  { thoughtText: 'Hello world!', username: 'brian' }
];

const seedDatabase = async () => {
  try {
    await connection.dropDatabase();
    
    const users = await User.insertMany(seedUsers);
    const thoughts = await Thought.insertMany(seedThoughts);

    // Link thoughts to users
    for (let thought of thoughts) {
      const user = users.find(u => u.username === thought.username);
      if (user) {
        user.thoughts.push(thought._id);
        await user.save();
      }
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

connection.once('open', seedDatabase);
