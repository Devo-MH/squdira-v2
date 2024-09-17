import React, { useEffect, useState, useContext } from 'react';
import CardDisplay from './CardDisplay';
import AuthContext from '../context/AuthContext'; // Import AuthContext to check authentication status

const Games = () => {
  const { isAuthenticated } = useContext(AuthContext); // Get authentication status from AuthContext
  const [cards, setCards] = useState([]); // Initialize with an empty array to avoid undefined errors
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    // Only fetch the data if the user is authenticated
    if (isAuthenticated) {
      // Fetch cards using relative path (no need to specify http://localhost:5001 due to proxy)
      fetch('/api/games/gods-unchained')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);  // Handle non-200 responses
          }
          return response.json();
        })
        .then(data => {
          setCards(data || []);  // Set the fetched cards into state, fallback to empty array if undefined
          setLoading(false);  // Data fetched successfully, stop loading
        })
        .catch(err => {
          console.error('Error fetching Gods Unchained cards:', err);  // Log the error for better debugging
          setError('Failed to load cards. Please try again later.');
          setLoading(false);  // Stop loading if there's an error
        });
    } else {
      setLoading(false); // No need to load if not authenticated
      setError('You must be logged in to view games.');
    }
  }, [isAuthenticated]); // This will re-run if isAuthenticated changes

  // If loading, display a loading message
  if (loading) {
    return <div>Loading cards...</div>;
  }

  // If there's an error, display it
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // Render the cards only if the cards array is not empty
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">Gods Unchained Cards</h1>
      <div className="grid grid-cols-3 gap-4">
        {cards && cards.length > 0 ? ( // Check if cards array exists and has elements
          cards.map(card => (
            <CardDisplay key={card.id} card={card} /> // Display each card
          ))
        ) : (
          <div>No cards available.</div> // Show message if no cards are available
        )}
      </div>
    </div>
  );
};

export default Games;
