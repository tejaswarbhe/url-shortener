// controllers/urlController.js

// Import the 'valid-url' library to validate the format of the incoming URL.
const validUrl = require('valid-url');
// Import the Url model, which gives us access to the database collection.
const Url = require('../models/Url');
// Import nanoid for generating unique short codes
const { nanoid } = require('nanoid');

/**
 * @desc    This function will be responsible for creating a new short URL.
 * @route   POST /api/shorten
 * @access  Public
 */
const shortenUrl = async (req, res) => {
  // Use object destructuring to get the 'longUrl' property from the request body.
  const { longUrl } = req.body;
  


  // Basic validation: Check if longUrl was actually provided in the request.
  if (!longUrl) {
    return res.status(400).json({ success: false, error: 'Please provide a URL' });
  }

  // Use the 'valid-url' library to check if the longUrl is a valid URI.
  if (!validUrl.isUri(longUrl)) {
    return res.status(400).json({ success: false, error: 'Invalid URL format provided' });
  }

  try {
    // Check if the long URL already exists in our database.
    let url = await Url.findOne({ longUrl });
    // If a URL document was found, return it.
    if (url) {
      return res.status(200).json({ success: true, data: url });
    }

   

    // Since the URL is new, we generate a unique short code for it.
    // Use nanoid to generate a unique string of 7 characters.
    // This will serve as the unique identifier for our short URL.
    const urlCode = nanoid(7);

    // Construct the full short URL using the base URL and the generated code.
    const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;
    const shortUrl = `${baseUrl}/${urlCode}`;

    // Create a new URL document in the database.
     const newUrlData = {
      longUrl,
      shortUrl,
      urlCode,
    };
    
    // Check if the auth middleware added a user to the request object.
    // This is the core of our optional authentication.
    if (req.user) {
      // If a user is logged in, add their ID to the data object.
      // req.user.id comes directly from the decoded JWT payload.
      newUrlData.user = req.user.id;
    }
    
    // Create the new URL document in the database using our data object.
    // If req.user existed, the 'user' field will be populated.
    // If not, the 'user' field will be omitted, and Mongoose won't save it.
    url = await Url.create(newUrlData);

   
    res.status(201).json({ success: true, data: url });

  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

/**
 * @desc    Find a URL by its short code and redirect the user.
 * @route   GET /:code
 * @access  Public
 */
const redirectToUrl = async (req, res) => {
try {
    // Find the URL document in the database that has the 'urlCode' matching
    // the 'code' parameter from the request URL.
    const url = await Url.findOne({ urlCode: req.params.code });

    // Check if a URL was found for the given code.
    if (url) {


        url.clicks += 1; // Increment the click count for this URL.

        await url.save(); // Save the updated URL document back to the database.

      // If a URL is found, for now, we'll just send it back as a success response.
      // The actual redirection and click increment will be handled in the next steps.
      // This is a great way to test that our lookup is working correctly.
      return res.redirect(301, url.longUrl);

    } else {
      // If no URL is found, it means the short link is invalid.
      // We send back a 404 Not Found status with a user-friendly error message.
      return res.status(404).json({ success: false, error: 'No URL found' });
    }
  } catch (err) {
    // If any other error occurs (e.g., a database connection issue), we catch it here.
    console.error('Server error on redirect:', err); // Log the error for debugging.
    
    // Send a 500 Internal Server Error response. This tells the client
    // that something went wrong on our end, not theirs.
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
 
};

// Make sure both functions are still exported.
module.exports = {
  shortenUrl,
  redirectToUrl,
};