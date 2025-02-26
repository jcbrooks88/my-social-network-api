import express from 'express';
import db from '../config/connection';
import routes from '../routes/index';
import Thought from './models/Thought';
import Friend from './models/Friend';
import { seedDatabase } from './seed';
import dotenv from 'dotenv';

dotenv.config();

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3001;
const app = express();

// Middleware for Parsing Request Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', routes);  // /api is the base route for your API

// Catch-All Route for Undefined Routes (404)
app.use('*', (_req, res) => {
  res.status(404).send('Route not found');
});

// Connecting to the Database and Starting the Server
db.once('open', async () => {
  // Seed the database only in development environment
  if (process.env.NODE_ENV === 'development') {
    const thoughtsCount = await Thought.countDocuments();
    const friendsCount = await Friend.countDocuments();

    if (thoughtsCount === 0 && friendsCount === 0) {
      console.log('Seeding database...');
      await seedDatabase();  // Call the seed function
    } else {
      console.log('Database already seeded or contains data.');
    }
  }

  // Start the server
  app.listen(PORT, () => {
    console.log(`🚀 API server running on http://localhost:${PORT}`);
  });
});
