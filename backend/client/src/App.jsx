// client/src/App.jsx

// 1. Import necessary components from react-router-dom
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 2. Import our page components
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

// You can also import any global components like a Navbar here in the future
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Footer from './components/Footer';

function App() {
  return (
    // 3. Wrap the entire application with BrowserRouter
    // This component enables routing capabilities for the entire app.
    <BrowserRouter>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 min-h-[calc(100vh-80px)]">
        {/* 4. Define the routes within the Routes component */}
        {/* The Routes component looks through its children <Route>s to find
            the best match and renders that route's component. */}
        <Routes>
          {/* 5. Define each individual route */}
          {/* Each Route maps a URL path to a specific component. */}
          
          {/* Route for the Home page (protected) */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          
          {/* Route for the Login page */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          
          {/* Route for the Register page */}
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          
          {/* Route for the User Dashboard page */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;