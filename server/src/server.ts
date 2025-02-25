// ** Importing Dependencies
import express from 'express';
import db from '../config/connection';  // Import without '.js' as TypeScript handles this
import routes from '../routes/index';

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3001;
const app = express();

// Middleware for Parsing Request Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', routes);

// Catch-All Route for Undefined Routes (404)
app.use('*', (_req, res) => {
  res.status(404).send('Route not found');
});

// Connecting to the Database and Starting the Server
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`🚀 API server running on http://localhost:${PORT}`);
    });
});




// ** How It Works in Practice
    // The database connection (db) is established.
    // Once the database is connected ('open' event fires), the Express server starts listening for requests.
    // Middleware (express.json() and express.urlencoded()) processes incoming request data.
    // The API routes (routes) handle requests.