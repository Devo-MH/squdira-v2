import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get('/api/tournaments');
        setTournaments(response.data);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      }
    };

    fetchTournaments();
  }, []);

  return (
    <div>
      <h1>Tournaments</h1>
      <div className="tournaments-grid">
        {tournaments.map((tournament) => (
          <div key={tournament._id} className="tournament-card">
            <h3>{tournament.name}</h3>
            <p>Game: {tournament.game.title}</p>
            <p>Prize Pool: {tournament.prizePool}</p>
            <Link to={`/tournaments/${tournament._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tournaments;
