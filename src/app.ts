import dotenv from 'dotenv';
import express from 'express';
import rateLimiter from './middleware/rateLimiter';
import { postMessage } from './controllers/chatController';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(rateLimiter);

app.post('/chat', postMessage);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});