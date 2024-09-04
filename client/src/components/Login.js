import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const WalletConnect = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const walletAddress = accounts[0];

        const response = await fetch('/api/auth/wallet-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ walletAddress }),
        });

        const data = await response.json();
        if (data.token) {
          localStorage.setItem('authToken', data.token);
          setIsAuthenticated(true);  // Update authentication status
          navigate('/');  // Redirect to dashboard
        } else {
          setErrorMessage('Login failed');
        }
      } catch (error) {
        setErrorMessage('Wallet connection failed');
      }
    } else {
      setErrorMessage('Please install MetaMask to connect your wallet');
    }
  };

  return (
    <div className="login-container">
      <button onClick={connectWallet}>Connect Wallet</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default WalletConnect;
