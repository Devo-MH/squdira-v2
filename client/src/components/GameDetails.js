import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`/api/games/${id}`);
        setGame(response.data);
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    };

    fetchGame();
  }, [id]);

  if (!game) return <div>Loading...</div>;

  return (
    <div>
      <img src={game.bannerImage} alt={game.title} />
      <h1>{game.title}</h1>
      <p>{game.description}</p>
      <p>Genres: {game.genres.join(', ')}</p>
      <p>Platforms: {game.platforms.join(', ')}</p>
      {/* Implement tabs for Overview, Gameplay, Reviews, Community */}
    </div>
  );
};

export default GameDetails;
