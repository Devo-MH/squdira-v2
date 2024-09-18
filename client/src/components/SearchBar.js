// src/components/SearchBar.js
import React, { useState, useEffect } from 'react';

const SearchBar = ({ setSearchQuery }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 300); // Debounce input by 300ms

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, setSearchQuery]);

  return (
    <div className="w-full flex justify-center my-4">
      <label htmlFor="search" className="sr-only">
        Search for games
      </label>
      <input
        id="search"
        type="text"
        placeholder="Search for games..."
        className="w-3/4 p-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        aria-label="Search for games"
      />
    </div>
  );
};

export default SearchBar;
