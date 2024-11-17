// LeagueCard.js
import React from 'react';
import MatchList from '../MatchList/MatchList';
import './LeagueCard.css';

const LeagueCard = ({ leagueName, leagueLogo, leagueFlag, matches }) => {
    // Determine the image to display: flag if available, else logo
    const displayImage = leagueFlag ? leagueFlag : leagueLogo;

    return (
        <div className="league-card">
            <div className="league-header">
                <img 
                    src={displayImage} 
                    alt={`${leagueName} emblem`} 
                    className="league-image" 
                />
                <h2 className="league-title">{leagueName}</h2>
            </div>
            <MatchList matches={matches} />
        </div>
    );
};

export default LeagueCard;
