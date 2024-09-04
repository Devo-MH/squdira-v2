import React, { useState, useEffect, useContext } from 'react';
import { BrowserProvider } from 'ethers';  // Correctly import BrowserProvider from ethers.js
import AuthContext from '../context/AuthContext';

const WalletConnect = ({ onAuthenticated }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setWalletAddress('0x...');  // Replace with logic to fetch the actual address
      if (onAuthenticated) {
        onAuthenticated();
      }
    }
  }, [onAuthenticated]);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Create provider with ethers.js
        const provider = new BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);  // Request accounts
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        setErrorMessage('');

        // Send the wallet address to the backend for authentication
        const response = await fetch('/api/auth/wallet-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ walletAddress: address }),
        });

        const data = await response.json();
        if (data.token) {
          // Store the JWT token in localStorage
          localStorage.setItem('authToken', data.token);
          setIsAuthenticated(true);  // Set authenticated state
          if (onAuthenticated) {
            onAuthenticated();
          }
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage('Failed to connect wallet');
        console.error(error);
      }
    } else {
      setErrorMessage('MetaMask is not installed. Please install it to use this feature.');
    }
  };

  return (
    <div>
      {walletAddress ? <p>Connected: {walletAddress}</p> : <button onClick={connectWallet}>Connect Wallet</button>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default WalletConnect;
