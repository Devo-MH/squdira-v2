// src/components/FilterSidebar.js
import React from 'react';

const FilterSidebar = ({ filters, setFilters }) => {
  const handleGenreChange = (e) => {
    const { value, checked } = e.target;
    const newGenres = checked
      ? [...(filters.genre || []), value]
      : filters.genre.filter((genre) => genre !== value);
    setFilters({ ...filters, genre: newGenres });
  };

  return (
    <div className="w-1/4 p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="mb-4">
        <h3 className="font-medium">Genres</h3>
        <ul>
          {['Action', 'Strategy', 'Puzzle'].map((genre) => (
            <li key={genre}>
              <label>
                <input
                  type="checkbox"
                  value={genre}
                  checked={filters.genre?.includes(genre) || false}
                  onChange={handleGenreChange}
                />
                {genre}
              </label>
            </li>
          ))}
        </ul>
      </div>
      {/* Add more filter sections as needed */}
    </div>
  );
};

export default FilterSidebar;
