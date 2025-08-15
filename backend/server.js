
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();

// CORS middleware
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'https://*.vercel.app',
    'https://*.vercel.app/*'
  ],
  credentials: true
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection management for serverless
let mongoose = null;
let isConnected = false;

const connectDB = async () => {
  if (isConnected && mongoose) return mongoose;
  
  try {
    mongoose = require('mongoose');
    
    // Close existing connection if any
    if (mongoose.connection.readyState === 1) {
      return mongoose;
    }
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
      bufferMaxEntries: 0,
      maxPoolSize: 1,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return mongoose;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    isConnected = false;
    throw error;
  }
};

// Database connection middleware
app.use(async (req, res, next) => {
  try {
    if (!process.env.MONGO_URI) {
      return res.status(500).json({ error: 'Database connection string not configured' });
    }
    
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: isConnected ? 'Connected' : 'Disconnected'
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    message: 'Backend API is working!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: isConnected ? 'Connected' : 'Disconnected'
  });
});

// Import routes
const urlRoutes = require('./routes/urls.js');
const indexRoutes = require('./routes/index.js');
const authRoutes = require('./routes/auth.js');
const linkRoutes = require('./routes/links.js');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/links', linkRoutes);
app.use('/api', urlRoutes);
app.use('/', indexRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  });
}

// Export for Vercel
module.exports = app; 