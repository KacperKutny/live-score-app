import React, { useState } from 'react';
import Header from '../components/Header/Header';
import LeagueContainer from '../components/LeagueContainer/LeagueContainer';
import LeagueSearchModal from '../components/LeagueSearchModal/LeagueSearchModal';
import PlayerSearchModal from '../components/PlayerSearchModal/PlayerSearchModal';

const MainPage = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isLeagueSearchModalOpen, setIsLeagueSearchModalOpen] = useState(false);

  const closeSearchModal = () => setIsSearchModalOpen(false);
  const closeLeagueSearchModal = () => setIsLeagueSearchModalOpen(false);

  return (
    <div>
      <Header
        onSearchClick={() => setIsSearchModalOpen(true)}
        onLeagueSearchClick={() => setIsLeagueSearchModalOpen(true)}
      />
      <LeagueContainer />
      <PlayerSearchModal isOpen={isSearchModalOpen} onClose={closeSearchModal} />
      <LeagueSearchModal isOpen={isLeagueSearchModalOpen} onClose={closeLeagueSearchModal} />
    </div>
  );
};

export default MainPage;
