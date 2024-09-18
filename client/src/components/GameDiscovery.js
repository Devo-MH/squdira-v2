import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GameDiscovery = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('/api/games');
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div>
      <h1>Game Discovery</h1>
      <div className="games-grid">
        {games.map((game) => (
          <div key={game._id} className="game-card">
            <img src={game.thumbnail} alt={game.title} />
            <h3>{game.title}</h3>
            <p>{game.genres.join(', ')}</p>
            <Link to={`/games/${game._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameDiscovery;
