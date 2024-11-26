// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import react-router-dom
import MainPage from '../../pages/HomePage';
import PlayerProfilePage from '../../pages/PlayerProfilePage'; // Import the PlayerProfilePage
import LeagueProfilePage from '../../pages/LeagueProfilePage'; 
function App() {
  return (
    <Router>
      <Routes>
        {/* HomePage Route */}
        <Route path="/" element={<MainPage />} />
        {/* Player Profile Page Route */}
        <Route path="/player/:id" element={<PlayerProfilePage />} />
        <Route path="/league/:id" element={<LeagueProfilePage />} /> {/* New route for League Profile */}

      </Routes>
    </Router>
  );
}

export default App;
