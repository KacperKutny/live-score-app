import React, { useEffect, useState } from 'react';
import './MatchCard.css';

const formatMatchTime = (date) => {
    const matchDate = new Date(date);
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };
    return matchDate.toLocaleTimeString([], options);
};

const MatchCard = ({
    matchId,
    homeLogo,
    homeTeam,
    homeTeamId,
    homeScore,
    awayLogo,
    awayTeam,
    awayScore,
    awayTeamId,
    status,
    elapsed,
    date,
}) => {
    const [matchStatus, setMatchStatus] = useState('');

    useEffect(() => {
        let newMatchStatus = status;
        let matchStatusClass = ''; // Default class

        if (status === "Not Started") {
            newMatchStatus = `${formatMatchTime(date)}`; // Display scheduled start time
        } else if (status === "Match Finished") {
            newMatchStatus = "Finished";
        } else if (elapsed !== null && elapsed !== undefined && status !== "Match Finished") {
            newMatchStatus = `${elapsed}'`; // Show elapsed minutes
            matchStatusClass = 'live'; // Add class for live status
        }

        console.log('Calculated newMatchStatus:', newMatchStatus);
        setMatchStatus(newMatchStatus); // Update the matchStatus state
    }, [status, elapsed, date]);

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
        window.open(matchUrl, '_blank', 'width=900,height=1000,scrollbars=no,resizable=no');
    };

    return (
        <div className="match-card" onClick={handleClick}>
            <div className="match-row home-team-row">
                <div className="team home-team">
                    <img src={homeLogo} alt={`${homeTeam} flag`} className="team-flag" />
                    <span className="team-name">{homeTeam}</span>
                    <span className="team-score">{homeScore}</span>
                </div>
            </div>

            <div className="match-status-row">
                <div className={`match-status ${elapsed !== null && elapsed !== undefined && status !== "Match Finished" ? 'live' : ''}`}>
                    <span>{matchStatus}</span>
                </div>
            </div>

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
