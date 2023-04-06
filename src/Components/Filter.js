import React, { useState } from 'react';

const Filter = ({ onTitleFilterChange, onRatingFilterChange }) => {
  const [titleFilter, setTitleFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  const handleTitleFilterChange = (event) => {
    setTitleFilter(event.target.value);
    onTitleFilterChange(event.target.value);
  };

  const handleRatingFilterChange = (event) => {
    setRatingFilter(event.target.value);
    onRatingFilterChange(event.target.value);
  };

  return (
    <form>
      <label>
        Title:
        <input type="text" value={titleFilter} onChange={handleTitleFilterChange} />
      </label>
      <label>
        Rating:
        <input type="text" value={ratingFilter} onChange={handleRatingFilterChange} />
      </label>
    </form>
  );
};

export default Filter;