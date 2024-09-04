import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import FilterSidebar from './FilterSidebar';
import GameGrid from './GameGrid';

const GameDiscoveryPage = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const response = await fetch('/api/web3-games');
      const data = await response.json();
      setGames(data);
    };

    fetchGames();
  }, []);

  return (
    <div className="flex">
      <FilterSidebar />
      <div className="w-full">
        <SearchBar setSearchQuery={setGames} />
        <GameGrid games={games} />
      </div>
    </div>
  );
};

export default GameDiscoveryPage;
