import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './MatchStatistics.css';

const MatchStatistics = ({ matchId }) => {
    const [statistics, setStatistics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await fetch(`https://localhost:7013/api/fixtures/${matchId}/statistics`);
                if (!response.ok) {
                    throw new Error('Failed to fetch statistics');
                }
                const data = await response.json();

                if (data && data.length > 0) {
                    setStatistics(data);
                } else {
                    setError('No statistics available for this match.');
                }
            } catch (error) {
                console.error('Error fetching match statistics:', error);
                setError('Error fetching match statistics');
            } finally {
                setLoading(false);
            }
        };

        if (matchId) {
            fetchStatistics();
        }
    }, [matchId]);

    if (loading) {
        return <p>Loading statistics...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!statistics || statistics.length === 0) {
        return <p>No statistics available for this match.</p>;
    }

    const homeTeamStats = statistics[0]?.statistics || [];
    const awayTeamStats = statistics[1]?.statistics || [];

    const mergedStats = homeTeamStats.map((stat, index) => ({
        type: stat.type,
        homeValue: stat.value,
        awayValue: awayTeamStats[index]?.value || 0,
    }));

    return (
        <div className="team-statistics">
            <table className="team-statistics-table">
                <thead>
                    <tr>
                        <th>{statistics[0]?.team?.name}</th>
                        <th>Type</th>
                        <th>{statistics[1]?.team?.name}</th>
                    </tr>
                </thead>
                <tbody>
                    {mergedStats.map((stat, index) => (
                        <tr key={index}>
                            <td>{stat.homeValue || 0}</td>
                            <td>{stat.type}</td>
                            <td>{stat.awayValue || 0}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

MatchStatistics.propTypes = {
    matchId: PropTypes.number.isRequired,
};

export default MatchStatistics;
