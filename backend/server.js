
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');

const urlRoutes = require('./routes/urls.js');
const indexRoutes = require('./routes/index.js');
const authRoutes = require('./routes/auth.js');
const linkRoutes = require('./routes/links.js');

const errorHandler = require('./middleware/errorMiddleware.js');

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

// Connect to database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/links', linkRoutes);
app.use('/api', urlRoutes); // Changed from /api/shorten to /api
app.use('/', indexRoutes);

// Error handling middleware should be last
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
}); 