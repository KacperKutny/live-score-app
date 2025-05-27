import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/HomePage';
import PlayerProfilePage from '../../pages/PlayerProfilePage';
import LeagueProfilePage from '../../pages/LeagueProfilePage';
import MatchSummaryPage from '../../pages/MatchSummaryPage'; 

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<MainPage />} />       
        <Route path="/player/:id" element={<PlayerProfilePage />} />        
        <Route path="/league/:id" element={<LeagueProfilePage />} />
        <Route path="/match/:matchId" element={<MatchSummaryPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
