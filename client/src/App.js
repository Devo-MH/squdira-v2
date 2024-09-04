import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import AuthService from './services/AuthService';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import WalletConnect from './components/WalletConnect';
import GameDiscoveryPage from './components/GameDiscoveryPage';

function App() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await AuthService.checkAuth();
        setIsAuthenticated(response.data);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, [setIsAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/wallet-connect"
          element={<WalletConnect />}
        />
        <Route
          path="/games"
          element={
            isAuthenticated ? <GameDiscoveryPage /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
