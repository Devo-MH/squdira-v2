// src/components/FilterSidebar.js
import React from 'react';

const FilterSidebar = ({ filters, setFilters }) => {
  return (
    <div className="w-1/4 p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="mb-4">
        <h3 className="font-medium">Genres</h3>
        <ul>
          <li>
            <input type="checkbox" value="Action" onChange={(e) => setFilters({ ...filters, genre: e.target.value })} />
            Action
          </li>
          <li>
            <input type="checkbox" value="Strategy" onChange={(e) => setFilters({ ...filters, genre: e.target.value })} />
            Strategy
          </li>
          <li>
            <input type="checkbox" value="Puzzle" onChange={(e) => setFilters({ ...filters, genre: e.target.value })} />
            Puzzle
          </li>
          {/* Add more genres as needed */}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="font-medium">Popularity</h3>
        <ul>
          <li>
            <input type="checkbox" value="Most Played" onChange={(e) => setFilters({ ...filters, popularity: e.target.value })} />
            Most Played
          </li>
          <li>
            <input type="checkbox" value="Trending" onChange={(e) => setFilters({ ...filters, popularity: e.target.value })} />
            Trending
          </li>
          {/* Add more filters as needed */}
        </ul>
      </div>
      <div>
        <h3 className="font-medium">New Releases</h3>
        <ul>
          <li>
            <input type="checkbox" value="Last 30 days" onChange={(e) => setFilters({ ...filters, releaseDate: e.target.value })} />
            Last 30 days
          </li>
          <li>
            <input type="checkbox" value="This Week" onChange={(e) => setFilters({ ...filters, releaseDate: e.target.value })} />
            This Week
          </li>
          {/* Add more release filters as needed */}
        </ul>
      </div>
    </div>
  );
};

export default FilterSidebar;
