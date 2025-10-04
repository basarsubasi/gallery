import express from 'express';
import dotenv from 'dotenv';
import imagesRouter from './routes/images';
import initializeDatabase from './database/init-db';
import cors from 'cors'; 
import {verifyJWT} from './middleware/authMiddleware';
import { getJwtToken } from './routes/auth';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*', // Allow all origins
  methods: '*',
  allowedHeaders: '*'
}));

app.post('/api/auth', getJwtToken);


app.use('/api/images', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  // Allow GET requests without authentication
  if (req.method === 'GET') {
    return next();
  }
  // Apply JWT verification for non-GET methods (POST, PUT, DELETE)
  verifyJWT(req, res, next);
}, imagesRouter);


// Initialize the database

initializeDatabase().then(() => {
  // Start the server only after the database is initialized
  const PORT = parseInt(process.env.GALLERY_BACKEND_PORT || '3000', 10);
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
});