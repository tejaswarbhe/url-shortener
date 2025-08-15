// client/src/pages/HomePage.jsx

// We must import the 'useState' Hook from React to manage our component's state.
import React, { useState } from 'react';

import { createShortUrl } from '../services/apiService';

const HomePage = () => {
  // 1. Initialize State
  // We call the useState hook to create a new state variable.
  // 'longUrl' will hold the current value of the input field.
  // 'setLongUrl' is the function we use to update the 'longUrl' state.
  // The initial value is an empty string ''.
  const [longUrl, setLongUrl] = useState('');
  const [shortUrlData, setShortUrlData] = useState(null);

  const [error, setError] = useState('');

  // 2. Handle Form Submission
  // This function will be called when the user clicks the submit button.
    const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation: ensure the user has entered something.
    if (!longUrl) {
       setError('Please enter a URL to shorten.');
      setShortUrlData(null); // Clear any previous success data
      return;
    }

    // Use a try...catch block to handle the asynchronous API call.
    // This is the standard way to handle potential errors from promises.
    try {
      // 'await' pauses the function execution until the promise from
      // createShortUrl resolves (i.e., the API responds).
      setError(''); // Clear any previous error messages
      const data = await createShortUrl(longUrl);
      setShortUrlData(data);

      

    } catch (err) {
      const errorMessage = err.error || 'An unexpected error occurred.';
      setError(errorMessage);
      
      // It's also important to clear any previous successful result from the UI.
      setShortUrlData(null);
      
      console.error('Error from API:', err);
    }
      
  };

  return (
    <div className="homepage-container max-w-4xl mx-auto p-6">
      <div className="glass-card rounded-xl p-8 text-center">
        <h2 className="text-4xl font-bold mb-4 gradient-text">URL Shortener</h2>
        <p className="text-xl text-gray-300 mb-8">Enter a long URL to make it short and easy to share!</p>

        {/* 3. The Form Element */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="form-group mb-6">
            <label htmlFor="longUrl-input" className="block text-sm font-medium text-gray-200 mb-2 text-left">Your Long URL:</label>
            <input
              id="longUrl-input"
              type="url" // Using type="url" provides better semantics and potential browser validation.
              placeholder="https://example.com/very/long/url/to/shorten"
              
              // 4. Controlled Component Logic
              // The 'value' of the input is directly tied to our 'longUrl' state variable.
              value={longUrl}
              
              // The 'onChange' event fires every time the user types a character.
              // We use it to call our 'setLongUrl' function, updating the state
              // with the new value from the input (e.g.target.value).
              onChange={(e) => setLongUrl(e.target.value)}
              
              required // A simple browser-level validation to ensure the field is not empty.
              className="input w-full"
            />
          </div>
          <button type="submit" className="primary-btn w-full">Shorten URL</button>
        </form>

        {error && (
          <div className="error-container mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
            <p className="text-red-400"><strong>Error:</strong> {error}</p>
          </div>
        )}

        {shortUrlData && (
          <div className="result-container mt-6 glass-card rounded-xl p-6 animate-fade-in-up">
            <h3 className="text-2xl font-semibold mb-4 text-green-400">Your Short URL is ready!</h3>
            <div className="bg-slate-800/50 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-400 mb-2">Short Link:</p>
              <a 
                href={shortUrlData.shortUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xl font-bold text-blue-400 hover:text-blue-300 break-all"
              >
                {shortUrlData.shortUrl}
              </a>
            </div>
            <div className="text-sm text-gray-400">
              <p>Original URL: {shortUrlData.longUrl.substring(0, 70)}...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;