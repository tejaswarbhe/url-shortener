// client/src/components/Navbar.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

// Remove the import for './Navbar.css'

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    // nav: The main navbar container
    // - bg-gray-800: A dark background.
    // - text-white: Sets the text color to white.
    // - p-4: Applies 1rem of padding on all sides.
    // - shadow-md: Adds a medium box shadow for depth.
    <nav className="bg-gray-900/70 glass-card text-white p-4 sticky top-0 z-50">
      {/* div: A container to hold the content, centered with a max-width */}
      {/* - container mx-auto: Centers the content and applies max-width. */}
      {/* - flex justify-between items-center: The core of our flexbox layout. */}
      <div className="container mx-auto flex justify-between items-center">
        {/* div: The brand/logo section */}
        {/* - text-2xl: Sets a larger font size. */}
        {/* - font-bold: Makes the font bold. */}
        <div className="text-2xl font-bold tracking-tight">
          <Link to="/" className="gradient-text hover:opacity-80 transition-opacity">LinkifyX</Link>
        </div>
        
        {/* ul: The list of navigation links */}
        {/* - flex gap-4 items-center: Lays out the links horizontally with 1rem of space. */}
        <ul className="flex gap-6 items-center">
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li>
                {/* hover:text-blue-300: Changes text color on hover for feedback. */}
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
              </li>
              <li>
                <button 
                  onClick={handleLogout}
                  className="ghost-btn"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="nav-link">Login</Link></li>
              <li>
                <Link
                  to="/register"
                  className="primary-btn text-sm"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;