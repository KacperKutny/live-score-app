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

const MatchCard = ({ matchId, homeLogo, homeTeam, homeTeamId, homeScore, awayLogo, awayTeam, awayScore, awayTeamId, status, elapsed, date }) => {
    // Log props updates for debugging
    useEffect(() => {
        console.log(`HomeTeam=${homeTeam}, ID=${homeTeamId}, awayTeam=${awayTeam}, ID=${awayTeamId}`);
    }, [homeTeam, awayTeam, homeScore, awayScore, homeTeamId, awayTeamId, status, elapsed]);

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

    // Handle card click to open MatchSummaryPage in a new window
    const handleClick = () => {
        const matchData = {
            matchId,
            homeLogo,
            homeTeam,
            homeTeamId,
            homeScore,
            awayLogo,
            awayTeam,
            awayTeamId,
            awayScore,
            status,
            elapsed,
            date,
        };
        const encodedMatchData = encodeURIComponent(JSON.stringify(matchData));
        const matchUrl = `/match/${matchId}?data=${encodedMatchData}`;
        window.open(
            matchUrl,
            '_blank',
            'width=900,height=1000,scrollbars=no,resizable=no'
        ); // Open new window with specified size
    };

    return (
        <div className="match-card" onClick={handleClick}>
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
