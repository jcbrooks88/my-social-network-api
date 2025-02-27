import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Define the connection string for MongoDB
const connectionString: string = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB';

// Options for mongoose connection
const options: ConnectOptions = {};  // No need for deprecated options

// Connect to MongoDB
mongoose.connect(connectionString, options)
    .then(() => {
        console.log('✅ Successfully connected to MongoDB');
    })
    .catch((err: Error) => {
        console.error('❌ MongoDB connection error:', err);
    });

// Get the mongoose connection object
const db = mongoose.connection;

// Event listener for connection errors
db.on('error', (err: Error) => {
    console.error('❌ MongoDB connection error:', err);
});

// Event listener when the connection is successfully opened
db.once('open', () => {
    console.log('✅ MongoDB connection opened');
});

export default db;


// HOW IT WORKS: 
    // The application starts.
    // It tries to connect to MongoDB Atlas (or another remote database) using process.env.MONGODB_URI.
    // If no remote database is set, it falls back to a local MongoDB database (mongodb://127.0.0.1:27017/socialNetworkDB).
    // Mongoose connects using the latest recommended settings.
