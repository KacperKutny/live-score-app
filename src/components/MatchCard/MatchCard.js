import React from 'react';
import './MatchCard.css';

const formatMatchTime = (date) => {
    console.log(date);
    const matchDate = new Date(date);  // Create a Date object from the string
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour24: 'true'
    };
    return matchDate.toLocaleTimeString([], options);  // Return formatted time string
  };



const MatchCard = ({ homeFlag, homeTeam, homeScore, awayFlag, awayTeam, awayScore, status, date }) => {
 
    let matchStatus = status;
  
    if (status === "Not Started") {
      matchStatus = `${formatMatchTime(date)}`;  // If not started, show the match time
    } if (status === "Match Finished") {
      matchStatus = 'Finished'
    }
  
 
 
    return (
    <div className="match-card">
     
 
     
      {/* Home Team Row */}
      <div className="match-row home-team-row">
        <div className="team home-team">
          <img src={homeFlag} alt={`${homeTeam} flag`} className="team-flag" />
          <span className="team-name">{homeTeam}</span>
          <span className="team-score">{homeScore}</span>
        </div>
      </div>

 {/* Match Status Row */}
 <div className="match-status-row">
        <div className="match-status">
          <span>{matchStatus}</span>
        </div>
      </div>

      {/* Away Team Row */}
      <div className="match-row away-team-row">
        <div className="team away-team">
          <img src={awayFlag} alt={`${awayTeam} flag`} className="team-flag" />
          <span className="team-name">{awayTeam}</span>
          <span className="team-score">{awayScore}</span>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
