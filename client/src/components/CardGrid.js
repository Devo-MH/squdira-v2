import React from 'react';
import CardDisplay from './CardDisplay';

const CardGrid = ({ cards }) => {
  return (
    <div className="card-grid">
      {cards.map(card => (
        <CardDisplay key={card.id} card={card} />
      ))}
    </div>
  );
};

export default CardGrid;
