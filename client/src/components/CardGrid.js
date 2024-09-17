import React from 'react';

const Card = ({ card }) => {
  return (
    <div className="card-container border rounded p-4 shadow-md text-center">
      <img
        src={card.image}
        alt={card.name}
        className="card-image mb-4 w-full h-48 object-cover"
      />
      <h3 className="card-name text-lg font-semibold">{card.name}</h3>
      <p className="card-description text-gray-700 mt-2">{card.description}</p>
      <p className="card-stats mt-4">
        <span className="block">Mana Cost: {card.manaCost || 'N/A'}</span>
        <span className="block">Attack: {card.attack || 'N/A'}</span>
        <span className="block">Health: {card.health || 'N/A'}</span>
      </p>
    </div>
  );
};

export default Card;
