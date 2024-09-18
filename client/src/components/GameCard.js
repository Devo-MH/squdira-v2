// src/components/GameCard.js
import React from 'react';
import PropTypes from 'prop-types';

const GameCard = ({ thumbnail, title, description }) => {
  const defaultImage = '/images/default-game-thumbnail.jpg';

  return (
    <div className="game-card bg-gray-800 text-white p-4 rounded-lg shadow-lg">
      <img
        src={thumbnail || defaultImage}
        alt={title}
        className="rounded-lg mb-4 w-full h-48 object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = defaultImage;
        }}
      />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );
};

GameCard.propTypes = {
  thumbnail: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default GameCard;
