//This line of code connects your Node.js application to your MongoDB database using Mongoose
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Connects Node.js backend to MongoDB database using Mongoose
const connectionString: string = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB';

const options: ConnectOptions = {};  // No need for deprecated options


// Connect to the MongoDB database using the connection string and options
mongoose.connect(connectionString, options)
    .then(() => console.log('✅ Successfully connected to MongoDB'))
    .catch((err: Error) => console.error('❌ MongoDB connection error:', err));

const db = mongoose.connection;

// Event listener for connection errors
db.on('error', (err: Error) => console.error('❌ MongoDB connection error:', err));

// Event listener when the connection is successfully opened
db.once('open', () => console.log('✅ Connected to MongoDB'));

export default db;

// HOW IT WORKS: 
    // The application starts.
    // It tries to connect to MongoDB Atlas (or another remote database) using process.env.MONGODB_URI.
    // If no remote database is set, it falls back to a local MongoDB database (mongodb://127.0.0.1:27017/socialNetworkDB).
    // Mongoose connects using the latest recommended settings.
