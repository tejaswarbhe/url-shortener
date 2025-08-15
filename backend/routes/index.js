// routes/index.js

// Import the Express framework to create a router.
const express = require('express');
const { redirectToUrl } = require('../controllers/urlController');

// Create a new router object using express.Router().
// This router will handle all routes for the root path of our application.
const router = express.Router();

// Root endpoint
router.get('/', (req, res) => {
  res.json({ 
    message: 'URL Shortener API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      test: '/api/test',
      shorten: '/api/shorten',
      auth: '/api/auth/*',
      links: '/api/links/*'
    }
  });
});

/**
 * @route   GET /:code
 * @desc    Redirect to the long/original URL
 * @access  Public
 */
router.get('/:code', redirectToUrl);

// Export the router so it can be mounted in our main server.js file.
module.exports = router;