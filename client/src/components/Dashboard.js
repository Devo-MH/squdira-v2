import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
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
            // Token might be expired or invalid, navigate to login
            localStorage.removeItem('authToken'); // Clear the expired token
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
  }, [navigate]);

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
        <button
          className="copy-button mt-2 bg-blue-500 text-white py-1 px-2 rounded"
          onClick={() => navigator.clipboard.writeText(walletAddress)}
          disabled={!walletAddress} // Disable button if walletAddress is not loaded yet
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
