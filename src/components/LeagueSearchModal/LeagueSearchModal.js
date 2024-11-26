// src/components/LeagueSearchModal/LeagueSearchModal.js
import React, { useState } from 'react';
import LeagueSearchCard from '../LeagueSearchCard/LeagueSearchCard';
import './LeagueSearchModal.css';

const LeagueSearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (!searchQuery) return;

    setLoading(true);
    setError(null);
    setSearchResults([]);

    try {
      const response = await fetch(`https://localhost:7013/api/leagues?search=${searchQuery}`);
      if (!response.ok) {
        throw new Error('Error fetching data');
      }

      const data = await response.json();
      setSearchResults(data || []);
    } catch (error) {
      setError('An error occurred while fetching search results.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Search Leagues</h2>
        <button onClick={onClose} className="close-button">
          Close
        </button>

        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Enter league name"
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}

        <div className="search-results">
          {searchResults.length > 0 ? (
            searchResults.map((league) => (
              <LeagueSearchCard key={league.league.id} league={league} />
            ))
          ) : (
            <p>No leagues found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeagueSearchModal;
