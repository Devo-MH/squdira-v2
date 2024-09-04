import React from 'react';
import GameCard from './GameCard';

const GameGrid = ({ games }) => {
  return (
    <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {games.map((game) => (
        <GameCard
          key={game.id}
          thumbnail={game.thumbnail}
          title={game.title}
          description={game.description}
          gameUrl={game.gameUrl}
          genre={game.genre}
        />
      ))}
    </div>
  );
};

export default GameGrid;
