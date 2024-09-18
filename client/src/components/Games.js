// src/components/Games.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Games = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect or handle unauthenticated state
  }

  return (
    <div>
      <h1>Games</h1>
      {/* Your games content here */}
    </div>
  );
};

export default Games;
