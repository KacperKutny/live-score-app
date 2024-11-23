
import React, { useEffect } from 'react';
import MatchCard from '../MatchCard/MatchCard';
import './MatchList.css';

const MatchList = ({ matches = [] }) => {
    useEffect(() => {
        console.log("Received updated matches in MatchList:", matches);
    }, [matches]);  // The effect will trigger when matches prop changes

    if (!matches.length) {
        return <div>No matches available</div>;
    }

    return (
        <div className="match-list">
            {matches.map((match) => (
                <MatchCard
                    key={`${match.fixture.id}-${match.elapsed}`}
                    homeTeam={match.teams.home.name}
                    awayTeam={match.teams.away.name}
                    date={match.fixture.date}
                    homeScore={match.goals.home}
                    awayScore={match.goals.away}
                    status={match.fixture.status.long}
                    elapsed={match.fixture.status.elapsed}
                    homeLogo={match.teams.home.logo}
                    awayLogo={match.teams.away.logo}
                    matchId={match.fixture.id}  // Added matchId to identify the match for live updates
                />
            ))}
        </div>
    );
};

export default MatchList;
