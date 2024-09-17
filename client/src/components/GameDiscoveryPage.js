import React, { useEffect, useState } from 'react';
import GameGrid from './GameGrid';

const GameDiscoveryPage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('/api/games/gods-unchained/cards');
        if (!response.ok) {
          throw new Error('Failed to fetch cards');
        }
        const data = await response.json();
        setCards(data);  // Set the fetched cards into state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);  // Set loading to false after fetching is complete
      }
    };

    fetchCards();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="game-discovery-page">
      <h1>Gods Unchained Cards</h1>
      <GameGrid games={cards} />  {/* Pass cards to the grid */}
    </div>
  );
};

export default GameDiscoveryPage;
