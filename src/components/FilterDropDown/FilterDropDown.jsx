import React, { useState } from 'react';

const FilterDropdown = ({ genres, onFilterChange }) => {
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleGenreChange = (event) => {
    const genreId = event.target.value;
    setSelectedGenre(genreId);
    onFilterChange(genreId); // Pass selected genre ID to parent component
  };

  return (
    <div>
      <label htmlFor="genre-select">Filter by Genre:</label>
      <select id="genre-select" value={selectedGenre} onChange={handleGenreChange}>
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;

