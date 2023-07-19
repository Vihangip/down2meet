import React, { useState } from 'react';
import SearchBar from './SearchBar';

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearchResults} />
      {/* You can then use the searchResults state here to render the search results */}
    </div>
  );
}
