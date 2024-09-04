import React from 'react';

const CardDisplay = ({ card }) => {
  return (
    <div className="card">
      <img src={card.image} alt={card.name} className="card-image" />
      <div className="card-info">
        <h3>{card.name}</h3>
        <p>{card.description}</p>
        <p><strong>Proto:</strong> {card.proto}</p>
        <p><strong>Purity:</strong> {card.purity}</p>
        <p><strong>User:</strong> {card.user}</p>
      </div>
    </div>
  );
};

export default CardDisplay;
