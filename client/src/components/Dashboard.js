import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import CardDisplay from './CardDisplay'; // Import the CardDisplay component
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // Ensure the user is authenticated
      if (!isAuthenticated) {
        navigate('/wallet-connect');
        return;
      }

      // Fetch user data (wallet address, etc.)
      const token = await AuthService.getAccessToken();
      if (!token) {
        navigate('/wallet-connect');
        return;
      }

      try {
        // Fetch user data
        const userResponse = await fetch('/api/users/user-data', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Send the token in the header
          },
        });
        const userData = await userResponse.json();
        setUserData(userData);

        // Fetch Gods Unchained cards using relative path
        const cardResponse = await fetch('/api/games/gods-unchained');  // Use relative path
        if (!cardResponse.ok) {
          throw new Error('Failed to fetch cards');
        }
        const cardData = await cardResponse.json();
        setCards(cardData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        navigate('/wallet-connect');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, navigate]);

  if (loading) {
    return <div className="text-center mt-8">Loading data...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Your Wallet</h1>
      <div>{userData.walletAddress || 'No wallet address found'}</div>

      <h2 className="mt-8">Gods Unchained Cards</h2>
      <div className="cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {cards.map((card) => (
          <CardDisplay key={card.id} card={card} /> // Use CardDisplay to show the cards
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
