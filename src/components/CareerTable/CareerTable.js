import React, { useState, useEffect } from 'react';
import './CareerTable.css';

const CareerTable = ({ careerData }) => {
  const [selectedLeague, setSelectedLeague] = useState('');
  const [filteredData, setFilteredData] = useState(careerData);

  // Extract unique league names from the careerData for the filter options
  const getUniqueLeagues = () => {
    const leagues = new Set();
    careerData.forEach(({ teams }) => {
      teams.forEach((team) => {
        team.statistics.forEach((stat) => {
          if (stat.league && stat.league.name) {
            leagues.add(stat.league.name);
          }
        });
      });
    });
    return Array.from(leagues);
  };

  // Handle league selection from the filter
  const handleLeagueSelect = (leagueName) => {
    setSelectedLeague(leagueName);

    // Filter the career data based on the selected league
    if (leagueName) {
      const filtered = careerData.map(({ season, teams }) => {
        const filteredTeams = teams.map((team) => {
          const filteredStats = team.statistics.filter(
            (stat) => stat.league.name === leagueName
          );
          return { ...team, statistics: filteredStats };
        }).filter((team) => team.statistics.length > 0); // Only keep teams with data for the selected league

        return { season, teams: filteredTeams };
      }).filter(item => item.teams.length > 0); // Only keep seasons with data for the selected league

      setFilteredData(filtered);
    } else {
      setFilteredData(careerData); // If no league is selected, show all data
    }
  };

  // Get the league options dynamically
  const leagueOptions = getUniqueLeagues();

  // Reversing the data so that the latest seasons appear at the top
  const reversedFilteredData = [...filteredData].reverse();

  return (
    <div className="career-table-container">
      <div className="filter-section">
        <label htmlFor="league-select">Filter by League: </label>
        <select
          id="league-select"
          value={selectedLeague}
          onChange={(e) => handleLeagueSelect(e.target.value)}
        >
          <option value="">All Leagues</option>
          {leagueOptions.map((league) => (
            <option key={league} value={league}>
              {league}
            </option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Season</th>
            <th>Team</th>
            <th>Competition</th>
            <th>Appearances</th>
            <th>Goals</th>
            <th>Assists</th>
            <th>Yellow Cards</th>
            <th>Red Cards</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {reversedFilteredData.length === 0 ? (
            <tr>
              <td colSpan="9" className="no-data">
                No data available for the selected league.
              </td>
            </tr>
          ) : (
            reversedFilteredData.map(({ season, teams }) => (
              teams.map((team) => (
                team.statistics.map((stat, statIndex) => (
                  <tr key={`${season}-${team.id}-${statIndex}`}>
                    <td>{season}</td>
                    <td>
                      <img src={team.logo} alt={`${team.name} logo`} width={20} />
                      {team.name}
                    </td>
                    <td>{stat.league?.name || 'Unknown Competition'}</td>
                    <td>{stat.games?.appearences || 0}</td> {/* Correct reference to 'appearences' */}
                    <td>{stat.goals?.total || 0}</td>
                    <td>{stat.goals?.assists || 0}</td>
                    <td>{stat.cards?.yellow || 0}</td>
                    <td>{stat.cards?.red || 0}</td>
                    <td>
                      {/* Convert rating to a number and then use toFixed if it's valid */}
                      {isNaN(parseFloat(stat.games?.rating)) 
                        ? 'N/A' 
                        : parseFloat(stat.games?.rating).toFixed(1)}
                    </td>
                  </tr>
                ))
              ))
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CareerTable;
