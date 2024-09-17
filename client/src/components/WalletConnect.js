import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const WalletConnect = () => {
  const [errorMessage, setErrorMessage] = useState('');  // To show any error messages
  const [isConnecting, setIsConnecting] = useState(false);  // Disable button during connection
  const { setIsAuthenticated } = useContext(AuthContext);  // Get the context to set authentication status
  const navigate = useNavigate();  // For navigation after successful login

  const connectWallet = async () => {
    if (window.ethereum) {
      setIsConnecting(true);  // Disable button while connecting

      try {
        // Request user's MetaMask accounts
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const walletAddress = accounts[0];  // Get the first account

        // Send the wallet address to the backend for login/authentication
        const response = await fetch('/api/auth/wallet-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ walletAddress }),
        });

        const data = await response.json();
        console.log('API Response:', data);  // Log the API response for debugging

        // Check if the response includes an access token
        if (data.accessToken) {
          localStorage.setItem('authToken', data.accessToken);  // Store token in localStorage
          console.log('Stored Token:', localStorage.getItem('authToken'));  // Log stored token
          setIsAuthenticated(true);  // Set authentication status in context
          navigate('/');  // Redirect to dashboard
        } else {
          setErrorMessage(data.message || 'Login failed');  // Show error message from API or default message
        }
      } catch (error) {
        console.error('Error during wallet connection:', error);  // Log any connection errors
        setErrorMessage('Wallet connection failed');  // Set generic error message
      }

      setIsConnecting(false);  // Re-enable button after the connection attempt
    } else {
      setErrorMessage('Please install MetaMask to connect your wallet');  // MetaMask not found
    }
  };

  return (
    <div className="login-container">
      <h1>Connect Your Wallet</h1>
      {/* Button to initiate wallet connection */}
      <button onClick={connectWallet} disabled={isConnecting}>  {/* Disable button while connecting */}
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}  {/* Show loading state */}
      </button>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}  {/* Show error message if any */}
    </div>
  );
};

export default WalletConnect;
