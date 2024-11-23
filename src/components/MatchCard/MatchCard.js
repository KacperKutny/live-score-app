import React, { useEffect } from 'react';
import './MatchCard.css';

// Helper function to format match time
const formatMatchTime = (date) => {
    const matchDate = new Date(date);
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Use 24-hour format
    };
    return matchDate.toLocaleTimeString([], options);
};

const MatchCard = ({ homeLogo, homeTeam, homeScore, awayLogo, awayTeam, awayScore, status, elapsed, date }) => {
    // Log props updates for debugging
    useEffect(() => {
        console.log(`Props updated in MatchCard: homeTeam=${homeTeam}, homeScore=${homeScore}, awayTeam=${awayTeam}, awayScore=${awayScore}, status=${status}, elapsed=${elapsed}`);
    }, [homeTeam, awayTeam, homeScore, awayScore, status, elapsed]);

    console.log("MatchCard - elapsed:", elapsed);

    // Determine the match status
    let matchStatus = status;

    if (status === "Not Started") {
        matchStatus = `${formatMatchTime(date)}`; // Display scheduled start time
    } else if (status === "Match Finished") {
        matchStatus = "Finished";
    } else if (elapsed !== null && elapsed !== undefined) {
        matchStatus = `${elapsed}'`; // Show elapsed minutes (e.g., "45'")
    }

    return (
        <div className="match-card">
            {/* Home Team */}
            <div className="match-row home-team-row">
                <div className="team home-team">
                    <img src={homeLogo} alt={`${homeTeam} flag`} className="team-flag" />
                    <span className="team-name">{homeTeam}</span>
                    <span className="team-score">{homeScore}</span>
                </div>
            </div>

            {/* Match Status */}
            <div className="match-status-row">
                <div className="match-status">
                    <span>{matchStatus}</span>
                </div>
            </div>

            {/* Away Team */}
            <div className="match-row away-team-row">
                <div className="team away-team">
                    <img src={awayLogo} alt={`${awayTeam} flag`} className="team-flag" />
                    <span className="team-name">{awayTeam}</span>
                    <span className="team-score">{awayScore}</span>
                </div>
            </div>
        </div>
    );
};

export default MatchCard;
