import React from 'react';

const GameCard = ({ thumbnail, title, description }) => {
  return (
    <div className="game-card bg-gray-800 text-white p-4 rounded-lg shadow-lg">
      <img src={thumbnail} alt={title} className="rounded-lg mb-4 w-full h-48 object-cover" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default GameCard;
