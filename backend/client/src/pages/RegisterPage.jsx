// client/src/pages/RegisterPage.jsx

import React, { useState } from 'react';


import { Link, useLocation, useNavigate } from 'react-router-dom';

import { registerUser } from '../services/authService';
import { useAuth } from '../context/useAuth';
// In the future, we will also import Link from react-router-dom to navigate
// to the login page if the user already has an account.



  const RegisterPage = () => {
  // 2. Use a single state object to hold all form data
  // This is a cleaner approach for forms with multiple fields.
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

    const [error, setError] = useState('');
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // 3. A single, dynamic onChange handler for all inputs
  const handleChange = (e) => {
    // Update the corresponding field in the formData state object
    setFormData({
      ...formData, // Use the spread operator to copy the existing state
      [e.target.name]: e.target.value, // Update the specific field that changed
    });
  };

  // 4. The function to handle form submission
  const handleSubmit =  async(e) => {
    // Prevent the default browser action of reloading the page
    e.preventDefault();
    // For now, we will just log the captured form data to the console.
    // In a future step, this will be replaced with an API call.
      setError('');
    

    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required.');
      return;
    }

    // Use a try/catch block to handle the asynchronous API call
    try {
      // 'await' pauses the function until the promise from registerUser is resolved
      const response = await registerUser(formData);
      if (response.token) {
        login(response.token);
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      }
      setFormData({ name: '', email: '', password: '' });

    } catch (err) {
      // If the service throws an error, it's caught here
      const errorMessage = err.error || 'Registration failed. Please try again.';
      setError(errorMessage);
      console.error('Registration error:', err);
    }
  };


  return (
    <div className="auth-container max-w-md mx-auto p-6">
      <div className="glass-card rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-2 text-center gradient-text">Create Your Account</h2>
        <p className="text-gray-300 mb-8 text-center">Join us to start creating your own short links.</p>
      
      {/* The form element will eventually have an onSubmit handler */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input w-full"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input w-full"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Choose a strong password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="input w-full"
          />
        </div>

        <button type="submit" className="primary-btn w-full">Create Account</button>
      </form>
      {error && (
        <p className="text-red-400 text-sm mt-4 text-center">{error}</p>
      )}

      <p className="text-sm text-gray-300 mt-6 text-center">
        Already have an account? <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">Login here</Link>
      </p>
      </div>
    </div>
  );
};

export default RegisterPage;