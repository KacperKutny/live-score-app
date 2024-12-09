import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import PlayerSearchCard from '../PlayerSearchCard/PlayerSearchCard';
import './PlayerSearchModal.css';

const PlayerSearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

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
      const response = await fetch(`https://localhost:7013/api/players?search=${searchQuery}`);
      if (!response.ok) {
        throw new Error('Error fetching data');
      }

      const data = await response.json();
      setSearchResults(data || []);
    } catch (error) {
      setError('An error occurred while fetching search results.');
    } finally {
      setLoading(false);
    }
  };

  const handlePlayerCardClick = (playerId) => {
    navigate(`/player/${playerId}`); 
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Search Players</h2>
        <button onClick={onClose} className="close-button">
          Close
        </button>

        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Enter player name"
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
            searchResults.map((player) => (
              <PlayerSearchCard
                key={player.player.id}
                player={player.player}
                onClick={() => handlePlayerCardClick(player.player.id)} 
              />
            ))
          ) : (
            <p>No players found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerSearchModal;
