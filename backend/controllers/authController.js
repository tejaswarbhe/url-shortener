// controllers/authController.js

// Import the User model to interact with the users collection in the database.
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerUser = async (req, res, next) => {

  try {
    // 1. Get user data from request body
    const { name, email, password } = req.body;

    // 2. Basic Validation: Check if all fields are present
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide name, email, and password' });
    }

    // 3. Check if user already exists
    // We search for a user with the same email address.
    const existingUser = await User.findOne({ email });

    // If a user with this email is found, we return an error.
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'A user with this email already exists' });
    }

    // 4. Hash the password
    // Generate a 'salt' - a random string to add to the password before hashing.
    // This ensures that two identical passwords will have different hashes.
    // The number 10 represents the 'salt rounds' - how much processing power is used.
    // Higher is more secure but slower. 10 is a good standard.
    const salt = await bcrypt.genSalt(10);
    
    // Now, hash the user's password using the generated salt.
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Create and save the new user to the database
    // We create a new user instance, but crucially, we store the 'hashedPassword',
    // not the original plain-text password.
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    
    // 6. Create JWT and send response
    const token = jwt.sign({ user: { id: newUser._id } }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(201).json({
      success: true,
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });

  } catch (err) {
    // Handle any other server-side errors
    console.error('Registration Error:', err);
    next(err);
  }
};


/**
 * @desc    Authenticate a user and get a token
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // 1. Get user credentials from the request body

    // 2. Basic Validation: Check if email and password were provided
    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide an email and password');
    }

    // 3. Find the user by their email address
    // The .select('+password') is crucial. By default, our User model does not
    // include the password field in queries. We need to explicitly ask for it here
    // so we can use it for comparison.
    const user = await User.findOne({ email }).select('+password');

    // 4. Check if a user was found AND if the password matches
    // We use bcrypt's .compare() method. It hashes the plain-text password from the
    // request and compares it to the stored hash from the database.
    // It's crucial to check for the user's existence first to avoid errors.
    if (!user ) {
      // Security Best Practice: Send a generic error message for both "user not found"
      // and "incorrect password". This prevents "user enumeration" attacks.
      res.status(401);
      throw new Error('Invalid credentials');
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401);
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    // If we reach here, the credentials are correct.
    // In the next task, we will generate and send back a JWT.
    // For now, we send a success message.
    res.status(200).json({
      success: true,
      token,
    });

  } catch (error) {
    // If ANY error is thrown in the 'try' block, it gets caught here.
    // We then pass it to our centralized error handler.
    next(error);
  }
};
// Export the functions so they can be used in our route files.
module.exports = { registerUser, loginUser };