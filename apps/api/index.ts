import express from 'express';
import userRouter from './routes/userRoutes';
import eventRouter from './routes/eventRoute';
import dotenv from 'dotenv';
import cors from 'cors';
import { PrismaClient } from '@prisma/client'; // Import PrismaClient

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Initialize PrismaClient
const prisma = new PrismaClient();

// Verify database connection
async function verifyDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
}

verifyDatabaseConnection();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/events', eventRouter);

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(
  '/api/events',
  (req, res, next) => {
    console.log(`Request made to /api/events: ${req.method} ${req.url}`);
    next(); // Call the next middleware or route handler
  },
  eventRouter,
);
