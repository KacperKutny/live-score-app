import React, { useEffect, useState } from 'react';
import './MatchLineUp.css'; // Import the CSS file for styling

const MatchLineUp = ({ matchId }) => {
  const [lineupData, setLineupData] = useState(null);

  useEffect(() => {
    fetch(`https://localhost:7013/api/fixtures/${matchId}/lineups`)
      .then(response => response.json())
      .then(data => setLineupData(data))
      .catch(error => console.error('Error fetching lineups:', error));
  }, [matchId]);

  if (!lineupData) {
    return <div>Loading lineups...</div>;
  }

  const handlePlayerClick = (playerId) => {
    // Open the player profile in a new tab
    window.open(`/player/${playerId}`, '_blank');
  };

  return (
    <div className="matchlineup-container">
      <h2>Starting Lineups</h2>
      <div className="lineup-teams-container">
        {/* Home Team */}
        <div className="team-lineup home-team">
          <div className="team-header">
            <img src={lineupData[0].team.logo} alt="home team logo" className="team-logo" />
            <h3>{lineupData[0].team.name}</h3>
          </div>
          <div className="lineup-start-xi">
            <h4>Starting XI</h4>
            <ul>
              {lineupData[0].startXI.map((player, index) => (
                <li key={index} onClick={() => handlePlayerClick(player.player.id)}>
                  <span className="player-number">{player.player.number}</span>
                  <strong className="player-name">{player.player.name}</strong>
                </li>
              ))}
            </ul>
          </div>
          <div className="lineup-substitutes">
            <h4>Substitutes</h4>
            <ul>
              {lineupData[0].substitutes.map((player, index) => (
                <li key={index} onClick={() => handlePlayerClick(player.player.id)}>
                  <span className="player-number">{player.player.number}</span>
                  <strong className="player-name">{player.player.name}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Away Team */}
        <div className="team-lineup away-team">
          <div className="team-header">
            <img src={lineupData[1].team.logo} alt="away team logo" className="team-logo" />
            <h3>{lineupData[1].team.name}</h3>
          </div>
          <div className="lineup-start-xi">
            <h4>Starting XI</h4>
            <ul>
              {lineupData[1].startXI.map((player, index) => (
                <li key={index} onClick={() => handlePlayerClick(player.player.id)}>
                  <span className="player-number">{player.player.number}</span>
                  <strong className="player-name">{player.player.name}</strong>
                </li>
              ))}
            </ul>
          </div>
          <div className="lineup-substitutes">
            <h4>Substitutes</h4>
            <ul>
              {lineupData[1].substitutes.map((player, index) => (
                <li key={index} onClick={() => handlePlayerClick(player.player.id)}>
                  <span className="player-number">{player.player.number}</span>
                  <strong className="player-name">{player.player.name}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchLineUp;
