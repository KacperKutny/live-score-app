
import React from 'react';
import './PlayerProfile.css';

const PlayerProfile = ({ player, team }) => {
  if (!player) return <p>No player selected.</p>;

  return (
    <div className="player-profile-container">
      <div className="player-profile-header">
        <div className="player-info">
          <img src={player.photo} alt={player.name} className="player-photo" />
          <div>
            <div className="player-name">
              <h2>{player.firstname} {player.lastname}</h2>
            </div>
            <div className="player-details">
              <div className="player-detail-item">
                <strong>{player.position} ({team?.name})</strong>
              </div>
              <div className="player-detail-item">
                <strong>Age:</strong> {player.age} ({player.birth?.date})
              </div>
              <div className="player-detail-item">
                <strong>Nationality:</strong> {player.nationality}
              </div>
              <div className="player-detail-item">
                <strong>Height:</strong> {player.height}
              </div>
            </div>
          </div>
        </div>

        {/* Display team details */}
        {team && (
          <div className="player-team">
            <div className="team-info">
              <img src={team?.logo} alt={team?.name} className="team-logo" />
            
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerProfile;

