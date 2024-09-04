import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
  const { isAuthenticated } = useContext(AuthContext);  // Use AuthContext to check authentication status
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');  // Redirect if not authenticated
      return;
    }

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch('/api/users/user-data', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('authToken');
            navigate('/login');
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setWalletAddress(data.walletAddress);
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.message === 'No token found') {
          navigate('/login');
        } else {
          setError('Failed to load user data.');
        }
      }
    };

    fetchUserData();
  }, [isAuthenticated, navigate]);

  return (
    <div className="dashboard-container">
      <div className="user-info-section bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-white text-xl mb-4">Your Wallet</h2>
        {error ? (
          <div className="error-message text-red-500">{error}</div>
        ) : (
          <div className="wallet-address bg-gray-700 p-2 rounded-md text-white">
            {walletAddress || 'Loading...'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
