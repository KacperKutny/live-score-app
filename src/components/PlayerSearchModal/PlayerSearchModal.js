import React, { useState } from 'react';
import PlayerSearchCard from '../PlayerSearchCard/PlayerSearchCard';
import PlayerProfile from '../PlayerProfile/PlayerProfile';
import './PlayerSearchModal.css';

const PlayerSearchModal = ({ isOpen, onClose, onPlayerSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [team, setTeam] = useState(null);

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
      console.log('Search results:', data); // Log search results
      setSearchResults(data || []);
    } catch (error) {
      setError('An error occurred while fetching search results.');
      console.error(error); // Log error for debugging
    } finally {
      setLoading(false);
    }
  };

  const handlePlayerCardClick = async (player) => {
    setSelectedPlayer(player);
  
    try {
      const response = await fetch(`https://localhost:7013/api/players/${player.id}/squads`);
      if (!response.ok) {
        throw new Error('Error fetching team data');
      }
  
      const data = await response.json();
      console.log('Team data fetched from API:', data);
  
      // Extract team information
      const teamData = data?.[0]?.team || null;
  
      const playerWithTeam = { ...player, team: teamData };
      console.log('Player with team:', playerWithTeam); // Debugging
  
      onPlayerSelect(playerWithTeam); // Pass player + team data
    } catch (error) {
      console.error('Failed to fetch team data:', error);
    }
  
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
                onClick={() => handlePlayerCardClick(player.player)}
              />
            ))
          ) : (
            <p>No players found.</p>
          )}
        </div>
      </div>
      {/* Render PlayerProfile when a player is selected */}
      {selectedPlayer && (
        <PlayerProfile
          player={selectedPlayer}
          team={team}
        />
      )}
    </div>
  );
};

export default PlayerSearchModal;
