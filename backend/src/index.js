import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import analysisRoutes from './routes/analysisRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import planRoutes from './routes/planRoutes.js';
import sampleRoutes from './routes/sampleRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'JobSkill Gap API',
    version: '1.0.0',
    time: new Date().toISOString(),
  });
});

// Mount API Routes
app.use('/api/analysis', analysisRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/samples', sampleRoutes);

// Serve Frontend Static Files in production / when built
const frontendDist = path.join(__dirname, '..', '..', 'frontend', 'dist');
if (fs.existsSync(frontendDist)) {
  console.log(`📦 [Frontend] Serving static frontend build from ${frontendDist}`);
  app.use(express.static(frontendDist));
  app.get('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

// 404 Handler for API
app.use('/api/*', (req, res) => {
  res.status(404).json({
    error: `Endpoint not found: ${req.method} ${req.originalUrl}`,
  });
});

// Centralized Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Application Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'An unexpected internal server error occurred.',
  });
});

// Start Server after DB initialization
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 [JobSkill-Gap Backend] Server listening on http://localhost:${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`🔍 API Status: http://localhost:${PORT}/api/samples/status`);
    if (fs.existsSync(frontendDist)) {
      console.log(`🌐 Full Stack App available at http://localhost:${PORT}`);
    }
  });
}

startServer();
