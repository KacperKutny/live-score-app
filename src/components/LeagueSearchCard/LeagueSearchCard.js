// src/components/LeagueSearchCard/LeagueSearchCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LeagueSearchCard.css';

const LeagueSearchCard = ({ league }) => {
  const navigate = useNavigate();

  // Handle card click to navigate to league profile
  const handleCardClick = () => {
    console.log(`Navigating to /league/${league.league.id}`); // Debugging log
    navigate(`/league/${league.league.id}`); // Navigate to the LeagueProfilePage
  };

  return (
    <div className="league-search-card" onClick={handleCardClick}>
      <img src={league.league.logo} alt={league.league.name} className="league-search-logo" />
      <div className="league-search-details">
        <h3 className="league-search-name">{league.league.name}</h3>
        <div className="country-search-info">
          <img src={league.country.flag} alt={league.country.name} className="country-search-flag" />
          <p className="country-search-name">{league.country.name}</p>
        </div>
      </div>
    </div>
  );
};

export default LeagueSearchCard;
