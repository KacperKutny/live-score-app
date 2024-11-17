import React from 'react';
import MatchCard from '../MatchCard/MatchCard';
import './MatchList.css';

const MatchList = ({ matches = [] }) => {
    if (!matches.length) {
        return <div>No matches available</div>;
    }

    return (
        <div className="match-list">
            {matches.map((match, index) => (
                <MatchCard
                    key={index}
                    homeTeam={match.teams.home.name}
                    awayTeam={match.teams.away.name}
                    date={match.fixture.date}
                    homeScore={match.goals.home}
                    awayScore={match.goals.away}
                    status={match.fixture.status.long}
                    homeFlag={match.teams.home.logo}
                    awayFlag={match.teams.away.logo}
                />
            ))}
        </div>
    );
};

export default MatchList;