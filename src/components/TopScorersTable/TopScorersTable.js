import React, { useEffect, useState } from 'react';
import './TopScorersTable.css'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const TopScorersTable = ({ leagueId, selectedSeason }) => {
  const [topScorers, setTopScorers] = useState([]);

  useEffect(() => {
    const fetchTopScorers = async () => {
      if (!selectedSeason || !leagueId) return;

      try {
        const response = await fetch(
          `https://localhost:7013/api/players/topscorers?season=${selectedSeason}&leagueId=${leagueId}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch top scorers');
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setTopScorers(data);
        } else {
          console.error('No top scorers data found');
          setTopScorers([]);
        }
      } catch (error) {
        console.error('Error fetching top scorers:', error);
      }
    };

    fetchTopScorers();
  }, [selectedSeason, leagueId]);

  return (
    <div className="top-scorers-table">
      <h2>Top Scorers</h2>
      {topScorers.length > 0 ? (
        <table className="top-scorers-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Goals</th>
              <th>Assists</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {topScorers.map((item, index) => {
              const player = item.player;
              const team = item.statistics[0].team;
              const goals = item.statistics[0].goals.total;
              const assists = item.statistics[0].goals.assists;

              return (
                <tr key={player.id}>
                  <td>{index + 1}</td>
                  <td>
                    {/* Link to Player Profile Page with player id */}
                    <Link to={`/player/${player.id}`}>
                      <img src={player.photo} alt={player.name} className="player-topscorers-photo" />
                      {player.name}
                    </Link>
                  </td>
                  <td>{goals}</td>
                  <td>{assists}</td>
                  <td>
                    <img src={team.logo} alt={team.name} className="team-logo" />
                    {team.name}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>No top scorers available for season {selectedSeason}.</div>
      )}
    </div>
  );
};

export default TopScorersTable;
