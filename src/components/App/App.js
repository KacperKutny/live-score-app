import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/HomePage';
import PlayerProfilePage from '../../pages/PlayerProfilePage';
import LeagueProfilePage from '../../pages/LeagueProfilePage';
import MatchSummaryPage from '../../pages/MatchSummaryPage'; // Import the new MatchSummaryPage

function App() {
  return (
    <Router>
      <Routes>
        {/* HomePage Route */}
        <Route path="/" element={<MainPage />} />
        {/* Player Profile Page Route */}
        <Route path="/player/:id" element={<PlayerProfilePage />} />
        {/* League Profile Page Route */}
        <Route path="/league/:id" element={<LeagueProfilePage />} />
        {/* Match Summary Page Route */}
        <Route path="/match/:matchId" element={<MatchSummaryPage />} /> {/* New route for Match Summary Page */}
      </Routes>
    </Router>
  );
}

export default App;
