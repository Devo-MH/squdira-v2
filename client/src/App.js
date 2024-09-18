// client/src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Context
import { AuthContext, AuthProvider } from './context/AuthContext';

// Import Components
import WalletConnect from './components/WalletConnect';
import Dashboard from './components/Dashboard';
import GameDiscovery from './components/GameDiscovery';
import GameDetails from './components/GameDetails';
import Profile from './components/Profile';
import Tournaments from './components/Tournaments';
import TournamentDetails from './components/TournamentDetails';
import Friends from './components/Friends';
import LogoutButton from './components/LogoutButton';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* You can add a Navbar here if needed */}
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<WalletConnect />} />

          {/* Private Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/games"
            element={
              <PrivateRoute>
                <GameDiscovery />
              </PrivateRoute>
            }
          />
          <Route
            path="/games/:id"
            element={
              <PrivateRoute>
                <GameDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/tournaments"
            element={
              <PrivateRoute>
                <Tournaments />
              </PrivateRoute>
            }
          />
          <Route
            path="/tournaments/:id"
            element={
              <PrivateRoute>
                <TournamentDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/friends"
            element={
              <PrivateRoute>
                <Friends />
              </PrivateRoute>
            }
          />

          {/* Redirect to Dashboard if no route matches */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {/* Include Logout Button */}
        <LogoutButton />
      </Router>
    </AuthProvider>
  );
}

export default App;
