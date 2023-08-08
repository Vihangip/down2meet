import React from 'react';
import SearchBar from './SearchBar';

export default function Search() {
  const handleSearchResults = (results) => {
  };

  return (
    <div>
      <SearchBar onSearchResultClick={handleSearchResults} />
    </div>
  );
}
