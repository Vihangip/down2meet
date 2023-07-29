import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SearchBar({ onSearchResultClick }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleInputChange = async (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value) {
      try {
        const response = await fetch(`https://down2meet.onrender.com/users/search?q=${event.target.value}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const results = await response.json();
        setSearchResults(results);
      } catch (error) {
        console.error('A problem occurred fetching the data:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleInputFocus = () => {
    setIsSearchFocused(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setIsSearchFocused(false), 200);
  };

  const handleLinkClick = (userId) => {
    setSearchQuery('');
    setSearchResults([]);
    onSearchResultClick(userId); // Call the function passed from Search.js with the selected userId
  };

  return (
    <div className="SearchBar">
      <h1>Search Bar</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        {isSearchFocused && searchResults.length > 0 && (
          <div className="dropdown">
            {searchResults.map((result, index) => (
              <Link key={index} to={`/user/${result.user_id}`} onClick={handleLinkClick}>
                <div>{result.name}</div>
              </Link>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}
