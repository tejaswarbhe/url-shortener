// client/src/pages/DashboardPage.jsx

// 1. Import React and necessary hooks
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Import the custom useAuth hook
// This is the beautiful, clean way we can access our global authentication state and functions.
import { useAuth } from '../context/useAuth';
import { getUserLinks } from '../services/linkService';

const DashboardPage = () => {
  // 3. Consume the AuthContext
  // We call our custom hook to get the functions and state we need from the context.
  // We are "destructuring" the logout function from the object returned by useAuth().
  const { logout, token } = useAuth();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // The useNavigate hook gives us a function to programmatically redirect the user.
  const navigate = useNavigate();

  useEffect(() => {
    const loadLinks = async () => {
      try {
        const response = await getUserLinks(token);
        if (response.success) {
          setLinks(response.data);
        } else {
          setError(response.error || 'Failed to load links');
        }
      } catch (err) {
        setError(err.error || err.message || 'Failed to load links');
      } finally {
        setLoading(false);
      }
    };
    loadLinks();
  }, [token]);

  // 4. Create the logout handler function
  const handleLogout = () => {
    // Call the logout function from our AuthContext.
    // This will clear the token from localStorage and update the global state.
    logout();
    
    // After logging out, we redirect the user to the login page.
    // This provides a clear and immediate transition for the user.
    navigate('/login');
  };

  return (
    <div className="dashboard-container max-w-4xl mx-auto p-6">
      {/* A welcoming header for the user */}
      <div className="glass-card rounded-xl p-8 mb-8 text-center">
        <h2 className="text-4xl font-bold mb-4 gradient-text">My Dashboard</h2>
        <p className="text-xl text-gray-300">Your personalized list of short links and their click counts.</p>
      </div>
      
      {loading && (
        <div className="glass-card rounded-xl p-8 text-center">
          <div className="loading-skeleton h-4 w-32 mx-auto mb-2 rounded"></div>
          <div className="loading-skeleton h-4 w-48 mx-auto rounded"></div>
        </div>
      )}
      
      {error && (
        <div className="glass-card rounded-xl p-6 mb-6 border border-red-500/30">
          <p className="text-red-400 text-center">{error}</p>
        </div>
      )}
      
      {!loading && !error && (
        <div className="links-list">
          {links.length === 0 ? (
            <div className="glass-card rounded-xl p-8 text-center">
              <p className="text-xl text-gray-300 mb-6">No links yet. Create your first short link.</p>
              <button onClick={() => navigate('/')} className="primary-btn">Create your first link</button>
            </div>
          ) : (
            <div className="space-y-4">
              {links.map((link) => (
                <div key={link._id} className="glass-card rounded-xl p-6 hover-lift">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <a 
                      href={link.shortUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-lg text-blue-400 hover:text-blue-300 break-all font-medium"
                    >
                      {link.shortUrl}
                    </a>
                    <span className="status-badge status-success px-3 py-1 rounded-full text-sm font-medium">
                      {link.clicks} clicks
                    </span>
                  </div>
                  <div className="text-sm text-gray-400 break-all">
                    {link.longUrl}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 5. The Logout Button */}
      {/* We attach our handleLogout function to the button's onClick event. */}
      <div className="text-center mt-8">
        <button onClick={handleLogout} className="secondary-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;