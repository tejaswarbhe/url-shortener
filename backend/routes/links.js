// routes/links.js  

// Import the Express framework
const express = require('express');
// Create a new router object. This router will handle all routes
// prefixed with '/api/links'.
const router = express.Router();
const auth = require('../middleware/auth');
// Import the controller function that will handle the logic for this route.

const { getMyLinks } = require('../controllers/linksController');
/**
 * @route   GET /api/links/my-links
 * @desc    Get all links created by the logged-in user
 * @access  Private (will be protected in the next task)
 */
router.get('/my-links', auth, getMyLinks);

// Export the router so it can be mounted in our main server.js file.
module.exports = router;