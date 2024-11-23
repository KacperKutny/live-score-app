// src/pages/MainPage.js
import React, { useState } from 'react';
import Header from '../components/Header/Header';
import LeagueContainer from '../components/LeagueContainer/LeagueContainer';
import PlayerSearchModal from '../components/PlayerSearchModal/PlayerSearchModal';
import PlayerProfile from '../components/PlayerProfile/PlayerProfile'; // New component to display player profile

const MainPage = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null); // State for the selected player

  // Close modal
  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  // Set the selected player when a player card is clicked
  const handlePlayerSelect = (player) => {
    setSelectedPlayer(player); // Set the selected player to show their profile
    setIsSearchModalOpen(false); // Optionally close the search modal after selection
  };

  return (
    <div>
      <Header onSearchClick={() => setIsSearchModalOpen(true)} /> {/* Pass the function to Header */}
      
      {/* Conditionally render the selected player's profile */}
      {selectedPlayer ? (
        <PlayerProfile player={selectedPlayer} />
      ) : (
        <LeagueContainer />
      )}

      {/* Player search modal */}
      <PlayerSearchModal
        isOpen={isSearchModalOpen}
        onClose={closeSearchModal}
        onPlayerSelect={handlePlayerSelect} // Pass down the player selection handler
      />
    </div>
  );
};

export default MainPage;
