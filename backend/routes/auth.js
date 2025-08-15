const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', registerUser);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate a user and get a token
 * @access  Public
 */
router.post('/login', loginUser);

module.exports = router;
