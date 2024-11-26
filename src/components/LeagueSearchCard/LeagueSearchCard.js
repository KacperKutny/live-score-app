// src/components/LeagueSearchCard/LeagueSearchCard.js
import React from 'react';
import './LeagueSearchCard.css'; // Import styles for LeagueSearchCard

const LeagueSearchCard = ({ league, onClick }) => {
  return (
    <div className="league-card" onClick={onClick}>
      <img src={league.logo} alt={league.name} className="league-search-photo" />
      <div className="league-card-details">
        <h3>{league.name}</h3>
        <p><strong>Country:</strong> {league.country || 'N/A'}</p>
        <p><strong>Type:</strong> {league.type || 'N/A'}</p>
        <p><strong>Year Founded:</strong> {league.founded || 'N/A'}</p>
      </div>
    </div>
  );
};

export default LeagueSearchCard;
