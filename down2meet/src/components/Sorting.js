import React from 'react';

const SortingComponent = ({ sortOrder, handleSortChange }) => {
  return (
    <div className='sortingComponent'>
      <label htmlFor="sortOrder">Sort by:</label>
      <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
        <option value="default">Default</option>
        <option value="availability">Availability</option>
        <option value="busy">Busy</option>
      </select>
    </div>
  );
};

export default SortingComponent;