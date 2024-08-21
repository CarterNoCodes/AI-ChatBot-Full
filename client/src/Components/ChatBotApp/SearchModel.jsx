import React, { useState } from 'react';
import './model.css';

const SearchModal = ({ chatMessages, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const results = chatMessages.filter(message =>
      message.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Search Chat</h2>
        <div className="search-input">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter search term"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="search-results">
          {searchResults.map((result, index) => (
            <div key={index} className="search-result">
              <div className="result-sender">{result.sender}</div>
              <div className="result-content">{result.content}</div>
            </div>
          ))}
        </div>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SearchModal;