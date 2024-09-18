import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TournamentDetails = () => {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const response = await axios.get(`/api/tournaments/${id}`);
        setTournament(response.data);
      } catch (error) {
        console.error('Error fetching tournament details:', error);
      }
    };

    fetchTournament();
  }, [id]);

  const registerForTournament = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.post(
        `/api/tournaments/${id}/register`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Registered successfully');
      // Update tournament state
      fetchTournament();
    } catch (error) {
      console.error('Error registering for tournament:', error);
      alert('Failed to register. Please try again.');
    }
  };

  if (!tournament) return <div>Loading...</div>;

  return (
    <div>
      <h1>{tournament.name}</h1>
      <p>Game: {tournament.game.title}</p>
      <p>Start Date: {new Date(tournament.startDate).toLocaleString()}</p>
      <p>Participants: {tournament.participants.length}</p>
      <button onClick={registerForTournament}>Register</button>
      {/* Display brackets and other tournament details */}
    </div>
  );
};

export default TournamentDetails;
