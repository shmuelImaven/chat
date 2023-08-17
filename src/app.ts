import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import * as redis from 'redis';
import rateLimiter from './middleware/rateLimiter';
import { postMessage } from './controllers/chatController';
import cors from 'cors';
import { Database } from './database/mondo-db';
import errorHandler from './middleware/errorHandler';

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(rateLimiter);

app.post('/chat', postMessage);

// Error Handler should be the last middleware
app.use(errorHandler);

// Redis setup
const redisClient = redis.createClient();
redisClient.connect();
redisClient.on('error', (err) => {
  console.error('Error connecting to Redis:', err);
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

// Setup MongoDB connection
Database.connect().then(() => {
  console.log('Connected to MongoDB');
}).catch(error => {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1); // Exit the process with failure
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle exit events gracefully
process.on('exit', () => {
  Database.close();
});

process.on('SIGINT', () => {
  console.log("Caught interrupt signal, shutting down gracefully...");
  Database.close().then(() => {
      process.exit(0);
  });
});
export { redisClient };  