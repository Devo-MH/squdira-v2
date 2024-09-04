// src/components/SearchBar.js
import React from 'react';

const SearchBar = ({ setSearchQuery }) => {
  return (
    <div className="w-full flex justify-center my-4">
      <input
        type="text"
        placeholder="Search for games..."
        className="w-3/4 p-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
