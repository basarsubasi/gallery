import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import initializeDatabase from './database/init-db';
import authRouter from './routes/auth';
import imagesRouter from './routes/images';
import {verifyJWT} from './middleware/authMiddleware';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*', // Allow all origins
  methods: '*',
  allowedHeaders: ['Authorization', 'Content-Type', 'Accept', 'Origin', 'X-Requested-With', 'X-Api-Key']
}));

// Routes
app.use('/api/auth', authRouter);

app.use('/api/images', imagesRouter);

// Initialize the database and start the server
initializeDatabase().then(() => {
  const PORT = parseInt(process.env.GALLERY_BACKEND_PORT || '3000', 10);
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
});