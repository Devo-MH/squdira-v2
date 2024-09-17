import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthService from './services/AuthService';
import Dashboard from './components/Dashboard';
import WalletConnect from './components/WalletConnect';
import Games from './components/Games'; // Import the Games component
import AuthContext from './context/AuthContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AuthService.getAccessToken();
      console.log('Token during page load:', token);

      if (token) {
        setIsAuthenticated(true);  // User is authenticated
      } else {
        setIsAuthenticated(false);  // User is not authenticated
      }

      setLoading(false);  // Stop loading after the auth check
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        {/* Replace this with a spinner or styled loading message */}
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Router>
        <Routes>
          {/* Public Route for Wallet Connection */}
          <Route path="/wallet-connect" element={<WalletConnect />} />

          {/* Protected Route for Dashboard */}
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/wallet-connect" />} />

          {/* Protected Route for Games */}
          <Route path="/games" element={isAuthenticated ? <Games /> : <Navigate to="/wallet-connect" />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
