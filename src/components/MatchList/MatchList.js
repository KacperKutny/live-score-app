import React from 'react';
import MatchCard from '../MatchCard/MatchCard';
import './MatchList.css';

const MatchList = ({ matches = [] }) => {
    if (!matches.length) {
        return <div>No matches available</div>;
    }

    return (
        <div className="match-list">
            {matches.map((match) => (
                <MatchCard
                    key={match.fixture.id}
                    homeTeam={match.teams.home.name}
                    homeTeamId={match.teams.home.id}
                    awayTeam={match.teams.away.name}
                    date={match.fixture.date}
                    homeScore={match.goals.home}
                    awayScore={match.goals.away}
                    awayTeamId={match.teams.away.id}
                    status={match.fixture.status.long}
                    elapsed={match.fixture.status.elapsed}
                    homeLogo={match.teams.home.logo}
                    awayLogo={match.teams.away.logo}
                    matchId={match.fixture.id} 
                />
            ))}
        </div>
    );
};

export default MatchList;
