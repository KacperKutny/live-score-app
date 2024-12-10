// src/components/LeagueProfile/LeagueProfile.js
import React from 'react';
import './LeagueProfile.css';

const LeagueProfile = ({ league, country }) => {
  if (!league || !country) return <p>No league data available.</p>;

  return (
    <div className="league-profile-container">
      <div className="league-profile-header">
        <div className="league-info">
          <img src={league.logo} alt={league.name} className="league-profile-logo" />
          <div>
            <h2>{league.name}</h2>
          </div>
        </div>

        <div className="country-info">
          <img src={country.flag} alt={country.name} className="country-flag" />
          <div>
            <p><strong>Country:</strong> {country.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeagueProfile;
