import express, { type Request, type Response, type NextFunction } from 'express';
import dotenv from 'dotenv';
import analyzeRoutes from './routes/analyzeRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// CORS middleware for Vercel and local development
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

// JSON and URL-encoded body parsing with 25MB limit for multimodal screenshots
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Mount API routes under /api only (so root / routes to Vite frontend UI)
app.use('/api', analyzeRoutes);

// Error handler
app.use(errorHandler);

export default app;
