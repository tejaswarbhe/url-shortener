// client/src/services/authService.js

// 1. Import axios for making HTTP requests
import axios from 'axios';

// Get the API base URL from environment variables or use development proxy
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Define the base URL for our authentication API endpoints
// This is a good practice if you have many related endpoints.
const API_URL = API_BASE_URL ? `${API_BASE_URL}/api/auth/` : '/api/auth/';

/**
 * @desc    Registers a new user by sending their data to the backend.
 * @param   {object} userData An object containing { name, email, password }.
 * @returns {Promise<object>} A promise that resolves to the data returned from the API.
 *          On success, this will be the new user object and a token.
 *          On failure, the promise will be rejected with an error object.
 */
export const registerUser = async (userData) => {
  // 2. Use a try...catch block for robust error handling.
  try {
    // 3. Make the POST request to the registration endpoint.
    // We combine the API_URL with the specific endpoint 'register'.
    // The second argument, 'userData', is the request body sent to the server.
    const response = await axios.post(API_URL + 'register', userData);

    // 4. If the request is successful, return the data from the response.
    // This will typically include the user's info and a JWT.
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;

  } catch (error) {
    // 5. If an error occurs, log it and re-throw a structured error.
    console.error('API Error: User registration failed', error);
    
    // Re-throw the specific error message from the backend if available.
    if (error.response && error.response.data && (error.response.data.error || error.response.data.message)) {
      throw new Error(error.response.data.error || error.response.data.message);
    } else {
      throw new Error('An unexpected error occurred during registration.');
    }
  }
};

/**
 * @desc    Logs in a user by sending their credentials to the backend.
 * @param   {object} credentials An object containing { email, password }.
 * @returns {Promise<object>} A promise that resolves to the data returned from the API.
 *          On success, this is critically important: it will contain the JWT.
 *          On failure, the promise will be rejected with an error object.
 */
export const loginUser = async (userData) => {
  try {
    // Make the POST request to the login endpoint.
    const response = await axios.post(API_URL + 'login', userData);

    if (response.data.token) {
      // It's good practice for the service to handle side-effects like this.
      localStorage.setItem('token', response.data.token);
    }

    return response.data;

  // 2. The 'catch' block is our safety net.
  //    It executes ONLY if the 'await' call above throws an error.
  } catch (error) {
    console.error('Login failed:', error); // Log the full error for debugging.

    // 3. This is our error extraction logic.
    //    We check if the error object contains the structure we expect from a server error.
    if (error.response && error.response.data && error.response.data.error) {
      // If it does, we throw a NEW error containing ONLY the user-friendly message
      // from our backend. e.g., "Invalid credentials" or "Email already exists".
      throw new Error(error.response.data.error);
    } else {
      // 4. This is a fallback for other types of errors.
      //    (e.g., network error where `error.response` is undefined, or a server misconfiguration)
      //    We throw a generic message so the UI doesn't show a technical error.
      throw new Error('An unexpected error occurred. Please check your connection and try again.');
    }
  }
};