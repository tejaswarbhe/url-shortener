
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
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - Starting request`);
  
  try {
    if (!process.env.MONGO_URI) {
      console.error('❌ MONGO_URI environment variable not set');
      return res.status(500).json({ 
        error: 'Database connection string not configured',
        message: 'MONGO_URI environment variable is missing'
      });
    }
    
    console.log('🔌 Attempting database connection...');
    await connectDB();
    console.log('✅ Database connection successful');
    next();
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ 
      error: 'Database connection failed', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Very simple test endpoint (no database, no routes, no complex logic)
app.get('/api/minimal-test', (req, res) => {
  res.json({
    message: 'Minimal test endpoint working!',
    timestamp: new Date().toISOString(),
    status: 'success'
  });
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

// Import routes with comprehensive error handling
let urlRoutes, indexRoutes, authRoutes, linkRoutes;

try {
  console.log('Loading route modules...');
  urlRoutes = require('./routes/urls.js');
  console.log('✓ urls.js loaded');
  indexRoutes = require('./routes/index.js');
  console.log('✓ index.js loaded');
  authRoutes = require('./routes/auth.js');
  console.log('✓ auth.js loaded');
  linkRoutes = require('./routes/links.js');
  console.log('✓ links.js loaded');
  console.log('All route modules loaded successfully');
} catch (error) {
  console.error('❌ Error loading route modules:', error);
  console.error('Stack trace:', error.stack);
  
  // Create fallback routes if modules fail to load
  const fallbackRouter = require('express').Router();
  fallbackRouter.get('*', (req, res) => {
    res.status(500).json({ 
      error: 'Route modules failed to load', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  });
  urlRoutes = fallbackRouter;
  indexRoutes = fallbackRouter;
  authRoutes = fallbackRouter;
  linkRoutes = fallbackRouter;
}

// Mount routes with error handling
try {
  console.log('Mounting routes...');
  app.use('/api/auth', authRoutes);
  console.log('✓ /api/auth mounted');
  app.use('/api/links', linkRoutes);
  console.log('✓ /api/links mounted');
  app.use('/api', urlRoutes);
  console.log('✓ /api mounted');
  app.use('/', indexRoutes);
  console.log('✓ / mounted');
  console.log('All routes mounted successfully');
} catch (error) {
  console.error('❌ Error mounting routes:', error);
  console.error('Stack trace:', error.stack);
  
  // Fallback error route
  app.use('*', (req, res) => {
    res.status(500).json({ 
      error: 'Routes failed to mount', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  });
}

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

// Global error handlers to catch unhandled exceptions
process.on('uncaughtException', (error) => {
  console.error('🚨 Uncaught Exception:', error);
  console.error('Stack trace:', error.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('🚨 Unhandled Rejection at:', promise);
  console.error('Reason:', reason);
  if (reason instanceof Error) {
    console.error('Stack trace:', reason.stack);
  }
  process.exit(1);
});

// Export for Vercel
module.exports = app; 