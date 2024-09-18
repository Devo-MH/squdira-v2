// src/components/Dashboard.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import CardDisplay from './CardDisplay';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (isAuthenticated === null) {
        // Authentication status is loading
        return;
      }

      if (!isAuthenticated) {
        navigate('/wallet-connect');
        return;
      }

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
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!userResponse.ok) {
          const errorText = await userResponse.text();
          throw new Error(`Failed to fetch user data: ${userResponse.status} ${errorText}`);
        }

        const userData = await userResponse.json();
        if (isMounted) setUserData(userData);

        // Fetch cards
        const cardResponse = await fetch('/api/games/gods-unchained', {
          credentials: 'include',
        });

        if (!cardResponse.ok) {
          const errorText = await cardResponse.text();
          throw new Error(`Failed to fetch cards: ${cardResponse.status} ${errorText}`);
        }

        const cardData = await cardResponse.json();
        if (isMounted) setCards(cardData);
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching data:', error);
          setError(error.message);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
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
          <CardDisplay key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
