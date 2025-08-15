// client/src/services/linkService.js

import axios from 'axios';

// Get the API base URL from environment variables or use development proxy
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const API_URL = API_BASE_URL ? `${API_BASE_URL}/api/links/` : '/api/links/';

/**
 * @desc    Fetches all links associated with the currently authenticated user.
 * @param   {string} token The JSON Web Token for authentication.
 * @returns {Promise<object>} A promise that resolves to the API response data.
 * @throws  Will throw an error if the API request fails.
 */
export const getUserLinks = async (token) => {
  // 1. We must configure axios to include the auth token in the request headers.
  //    The backend's 'auth' middleware will look for this header to identify the user.
  const config = {
    headers: {
      // The 'Bearer' scheme is a standard for sending JWTs.
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    // 2. Make the authenticated GET request.
    //    We pass the 'config' object, which contains our headers, as the second argument.
    const response = await axios.get(API_URL + 'my-links', config);
    return response.data;
  } catch (error) {
    // 3. Handle errors gracefully.
    console.error('API Error: Failed to fetch user links', error);

    // Re-throw the specific error from the backend if available.
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error('An unexpected error occurred while fetching links.');
    }
  }
};