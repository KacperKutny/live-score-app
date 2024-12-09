import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PlayerSearchCard.css'; 

const PlayerSearchCard = ({ player }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/player/${player.id}`); 
  };

  return (
    <div className="player-card" onClick={handleCardClick}>
      <img src={player.photo} alt={player.name} className="player-search-photo" />
      <div className="player-card-details">
        <h3>{player.name}</h3>
        <p><strong>Position:</strong> {player.position || 'N/A'}</p>
        <p><strong>Age:</strong> {player.age || 'N/A'}</p>
        <p><strong>Nationality:</strong> {player.nationality || 'N/A'}</p>
        <p><strong>Country of Birth:</strong> {player.birth?.country || 'N/A'}</p>
        <p><strong>Birth Date:</strong> {player.birth?.date || 'N/A'}</p>
      </div>
    </div>
  );
};

export default PlayerSearchCard;
