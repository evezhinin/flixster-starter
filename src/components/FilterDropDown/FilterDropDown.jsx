import React, { useState } from 'react';
import './FilterDropDown.css'
const FilterDropdown = ({ genres, onFilterChange }) => {
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleGenreChange = (event) => {
    const genreId = event.target.value;
    setSelectedGenre(genreId);
    onFilterChange(genreId); 
  };

  return (
    <div>
      <select id="genre-select" value={selectedGenre} onChange={handleGenreChange}>
        <option value="">Sort By Genre</option>
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

