import React, { useState, useEffect } from 'react';
import { groupBy, map } from 'lodash'; // Import lodash methods
import LeagueCard from '../../components/LeagueCard/LeagueCard';
import './LeagueContainer.css';

const LeagueContainer = () => {
    const [leagues, setLeagues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLeagues = async () => {
        try {
            const response = await fetch('https://localhost:7013/api/fixtures/today'); // Your API endpoint
            if (!response.ok) {
                throw new Error('Failed to fetch fixtures');
            }
            const data = await response.json();

            // Use lodash groupBy to group matches by league id
            const leaguesMap = groupBy(data, (match) => match.league.id);

            // Map over the grouped leagues and structure them
            const leaguesArray = map(leaguesMap, (matches, leagueId) => {
                const leagueInfo = matches[0].league; // Assuming all matches in a group have the same league info
                return {
                    leagueName: leagueInfo.name,
                    leagueLogo: leagueInfo.logo,
                    matches: matches
                };
            });

            setLeagues(leaguesArray);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeagues();
    }, []);

    if (loading) {
        return <div>Loading leagues...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="league-container">
            {map(leagues, (league, index) => (
                <LeagueCard
                    key={index}
                    leagueName={league.leagueName}
                    leagueLogo={league.leagueLogo}
                    matches={league.matches}
                />
            ))}
        </div>
    );
};

export default LeagueContainer;
