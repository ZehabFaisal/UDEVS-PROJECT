import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import sequelize, { testConnection } from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import userRoutes from './routes/userRoutes.js';
import './models/index.js';
dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

app.use('/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Recruiter-AI API Server',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      jobs: '/api/jobs',
      applications: '/api/applications',
      users: '/api/users',
    },
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Error! The endpoint is not found',
    path: req.originalUrl,
  });
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await testConnection();
    await sequelize.sync({ alter: false });
    console.log('Database synchronized');

    app.listen(PORT, () => {
      console.log(`\nServer is successfully running on http://localhost:${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`CORS enabled for: ${process.env.CORS_ORIGIN || 'http://localhost:5173'}\n`);
    });
  } catch (error) {
    console.error('Error! Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
export default app;