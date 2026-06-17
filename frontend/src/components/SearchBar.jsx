import React from 'react';

const SearchBar = () => {
  return (
    <div className="trip-style-search">
      <div className="search-tabs">
        <span>🏠 Search All</span>
        <span>📷 Things to Do</span>
        <span>🏨 Hotels</span>
        <span>🍴 Restaurants</span>
      </div>
      <div className="search-input-wrap">
        <input type="text" placeholder="Places to go, things to do, hotels..." />
        <button className="ask-ai-btn">Ask AI</button>
        <button className="search-go-btn">Search</button>
      </div>
    </div>
  );
};
export default SearchBar;