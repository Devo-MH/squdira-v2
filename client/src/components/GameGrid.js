import React from 'react';
import GameCard from './GameCard';

const GameGrid = ({ games }) => {
  if (!games || games.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No games available at the moment.
      </div>
    );
  }

  return (
    <div className="game-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {games.map((game) => (
        <GameCard
          key={game.id}
          thumbnail={game.image}
          title={game.name}
          description={game.description}
        />
      ))}
    </div>
  );
};

export default GameGrid;
