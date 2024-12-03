import React, { useState, useEffect } from 'react';
import './CareerTable.css';

const CareerTable = ({ careerData }) => {
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
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

  // Extract unique team names from the careerData for the filter options
  const getUniqueTeams = () => {
    const teams = new Set();
    careerData.forEach(({ teams: teamData }) => {
      teamData.forEach((team) => {
        if (team.name) {
          teams.add(team.name);
        }
      });
    });
    return Array.from(teams);
  };

  // Handle league selection from the filter
  const handleLeagueSelect = (leagueName) => {
    setSelectedLeague(leagueName);
    applyFilters(leagueName, selectedTeam);
  };

  // Handle team selection from the filter
  const handleTeamSelect = (teamName) => {
    setSelectedTeam(teamName);
    applyFilters(selectedLeague, teamName);
  };

  // Apply both league and team filters
  const applyFilters = (leagueName, teamName) => {
    let filtered = careerData;

    // Apply league filter if a league is selected
    if (leagueName) {
      filtered = filtered.map(({ season, teams }) => {
        const filteredTeams = teams.map((team) => {
          const filteredStats = team.statistics.filter(
            (stat) => stat.league.name === leagueName
          );
          return { ...team, statistics: filteredStats };
        }).filter((team) => team.statistics.length > 0); // Only keep teams with data for the selected league

        return { season, teams: filteredTeams };
      }).filter((item) => item.teams.length > 0); // Only keep seasons with data for the selected league
    }

    // Apply team filter if a team is selected
    if (teamName) {
      filtered = filtered.map(({ season, teams }) => {
        const filteredTeams = teams.filter((team) => team.name === teamName);

        return { season, teams: filteredTeams };
      }).filter((item) => item.teams.length > 0); // Only keep seasons with data for the selected team
    }

    setFilteredData(filtered.length > 0 ? filtered : []);
  };

  // Calculate totals for the filtered data
  const calculateTotals = () => {
    const totals = {
      appearances: 0,
      goals: 0,
      assists: 0,
      yellowCards: 0,
      redCards: 0,
    };

    filteredData.forEach(({ teams }) => {
      teams.forEach((team) => {
        team.statistics.forEach((stat) => {
          totals.appearances += stat.games?.appearences || 0;
          totals.goals += stat.goals?.total || 0;
          totals.assists += stat.goals?.assists || 0;
          totals.yellowCards += stat.cards?.yellow || 0;
          totals.redCards += stat.cards?.red || 0;
        });
      });
    });

    return totals;
  };

  const totals = calculateTotals();

  // Get the league and team options dynamically
  const leagueOptions = getUniqueLeagues();
  const teamOptions = getUniqueTeams();

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

        <label htmlFor="team-select">Filter by Team: </label>
        <select
          id="team-select"
          value={selectedTeam}
          onChange={(e) => handleTeamSelect(e.target.value)}
        >
          <option value="">All Teams</option>
          {teamOptions.map((team) => (
            <option key={team} value={team}>
              {team}
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
                No data available for the selected filters.
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
                    <td>
                      {stat.league?.name ? (
                        <a href={`/league/${stat.league.id}`} className="league-link">
                          {stat.league.name}
                        </a>
                      ) : (
                        'Unknown Competition'
                      )}
                    </td>
                    <td>{stat.games?.appearences || 0}</td>
                    <td>{stat.goals?.total || 0}</td>
                    <td>{stat.goals?.assists || 0}</td>
                    <td>{stat.cards?.yellow || 0}</td>
                    <td>{stat.cards?.red || 0}</td>
                    <td>
                      {isNaN(parseFloat(stat.games?.rating)) 
                        ? '' 
                        : parseFloat(stat.games?.rating).toFixed(1)}
                    </td>
                  </tr>
                ))
              ))
            ))
          )}
        </tbody>
        {reversedFilteredData.length > 0 && (
          <tfoot>
            <tr>
              <td colSpan="3"><strong>Totals</strong></td>
              <td>{totals.appearances}</td>
              <td>{totals.goals}</td>
              <td>{totals.assists}</td>
              <td>{totals.yellowCards}</td>
              <td>{totals.redCards}</td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default CareerTable;
