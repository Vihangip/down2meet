import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const searchResults = await fetch(`/users/search?q=${searchQuery}`).then((response) =>
      response.json()
    );
    onSearch(searchResults);
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
