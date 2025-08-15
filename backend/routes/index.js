// routes/index.js

// Import the Express framework to create a router.
const express = require('express');
const { redirectToUrl } = require('../controllers/urlController');

// Create a new router object using express.Router().
// This router will handle all routes for the root path of our application.
const router = express.Router();

/**
 * @route   GET /:code
 * @desc    Redirect to the long/original URL
 * @access  Public
 */
router.get('/:code', redirectToUrl);

// Export the router so it can be mounted in our main server.js file.
module.exports = router;