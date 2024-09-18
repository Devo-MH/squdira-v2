// src/components/CardDisplay.js
import React from 'react';
import PropTypes from 'prop-types';

const CardDisplay = ({ card }) => {
  const defaultImage = '/images/default-card-image.jpg';
  const cardImage = card.image || defaultImage;

  return (
    <div className="card p-4 border rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <img
        src={cardImage}
        alt={card.name}
        className="w-full h-64 object-cover rounded-lg"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = defaultImage;
        }}
      />
      <h2 className="text-xl font-semibold mt-4">{card.name}</h2>
      <p className="text-gray-600">{card.description || 'No description available'}</p>
    </div>
  );
};

CardDisplay.propTypes = {
  card: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
};

export default CardDisplay;
