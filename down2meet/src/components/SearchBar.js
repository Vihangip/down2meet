import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/users/search?q=${searchQuery}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const searchResults = await response.json();
      onSearch(searchResults);
    } catch (error) {
      console.error('A problem occurred fetching the data:', error);
    }
  };

  return (
    <div className="SearchBar">
      <h1>Search Bar</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
