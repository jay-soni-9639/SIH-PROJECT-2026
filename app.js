import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();

// Middlewares
app.use(
  cors({
    origin: '*', // Allow all origins or specify process.env.CLIENT_URL
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-doctor-id'],
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Health Check & Root Route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Healthcare Portal API is online',
    version: '1.0.0',
    dbStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected / Pending URL',
    documentation: '/api/docs',
  });
});

app.get('/api/health', (req, res) => {
  const states = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting',
  };
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    database: states[mongoose.connection.readyState] || 'Unknown',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/ai', aiRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
