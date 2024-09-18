import React, { useContext } from 'react';
import { BrowserProvider } from 'ethers';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const WalletConnect = () => {
  const { login } = useContext(AuthContext); // Using AuthContext to manage authentication state
  const navigate = useNavigate(); // For navigation post login

  const handleWalletConnect = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    try {
      // Request account access from MetaMask
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Setup the provider and signer
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress(); // Get wallet address

      // Sign the message for authentication
      const message = 'Sign this message to authenticate with Squdira.';
      const signature = await signer.signMessage(message); // User signs the message

      // Send the wallet address and signature to the backend for authentication
      const response = await axios.post(
        'http://localhost:5001/api/auth/wallet-login', // Adjust this URL for production
        { walletAddress, signature },
        { withCredentials: true } // Include cookies in the request for secure sessions
      );

      // Destructure and store the access token received from the backend
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken); // Store access token in localStorage

      // Update the authentication context and redirect the user
      login(accessToken);
      navigate('/'); // Navigate to home or the desired page after login

    } catch (error) {
      // Error handling based on the type of error
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Server Error:', error.response.data);
        alert(`Failed to connect wallet: ${error.response.data.message}`);
      } else if (error.request) {
        // Request was made, but no response received
        console.error('No response received:', error.request);
        alert('No response from the server. Please try again.');
      } else {
        // Some other error occurred
        console.error('Error:', error.message);
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <h1>Connect Your Wallet</h1>
      <button onClick={handleWalletConnect}>Connect Wallet</button>
    </div>
  );
};

export default WalletConnect;
