import React, { useState } from 'react';
import SearchBar from './SearchBar';
import { Link, useNavigate } from 'react-router-dom';

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const handleSearchResultClick = (userId) => {
    navigate(`/user/${userId}`); // Navigate to the UserProfile component with the selected userId
  };

  return (
    <div>
      <SearchBar onSearch={handleSearchResults} onSearchResultClick={handleSearchResultClick} />
      {/* You can then use the searchResults state here to render the search results */}
    </div>
  );
}

