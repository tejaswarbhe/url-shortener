// client/src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { loginUser } from '../services/authService';
import { useAuth } from '../context/useAuth';
// We will also import Link from react-router-dom here.

const LoginPage = () => {

const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // The exact same dynamic handler works here perfectly! No changes needed.
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // The handleSubmit function for logging in
  const handleSubmit =  async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Both email and password are required.');
      return;
    }

    try {
      // Call the loginUser service function
      const response = await loginUser(formData);

      if (response.token) {
        login(response.token);
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      } else {
        // This is a defensive check in case the API response is unexpected.
        setError('Login successful, but no token was provided.');
      }
    } catch (err) {
      // Handle login errors, e.g., "Invalid credentials"
      
      setError(err.message);
     
    }
  };


  return (
    <div className="auth-container max-w-md mx-auto p-6">
      <div className="glass-card rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-2 text-center gradient-text">Welcome Back</h2>
        <p className="text-gray-300 mb-8 text-center">Log in to access your dashboard.</p>
      
      {/* This form will also get an onSubmit handler later */}
      <form onSubmit={handleSubmit} className="space-y-6">
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
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="input w-full"
          />
        </div>

        <button type="submit" className="primary-btn w-full">Login</button>
      </form>
      {error && <p className="text-red-400 text-sm mt-4 text-center">{error}</p>}
      <p className="text-sm text-gray-300 mt-6 text-center">
         Don't have an account? <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium">Register now</Link>
      </p>
      </div>
    </div>
  );
};

export default LoginPage;