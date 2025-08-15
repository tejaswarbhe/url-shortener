// routes/urls.js

// Import the Express framework, which is necessary to create a router.
const express = require('express');

const { shortenUrl } = require('../controllers/urlController.js');
// Create a new router object. The Router is a mini-Express application that can
// handle its own set of routes and middleware. It helps in modularizing the app.
const router = express.Router();

const auth = require('../middleware/auth.js');



/**
 * @route   POST /api/shorten
 * @desc    Create a new short URL
 * @access  Public (with optional authentication)
 */
router.post('/shorten', auth, shortenUrl);

// router.post('/shorten', (req, res) => {
//   // For now, we will just send a confirmation message.
//   // The actual logic will be moved to the controller in the next task.
//   res.status(200).json({ success: true, message: 'Route is working! The controller logic is next.' });
// });

// Export the router from this module. This makes the router object available for
// use in other parts of our application, specifically to be mounted in server.js.
module.exports = router;
