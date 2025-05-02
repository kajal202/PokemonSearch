import React from "react";

const SearchBar = ({ searchInput, setSearchInput, onSearch }) => {
    
  return (
    <div className="search-bar-wrapper">
      <input
        className="search-bar"
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search Pokémon by name..."
      />
      <button className="search-button" onClick={onSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
