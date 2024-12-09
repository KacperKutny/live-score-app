import React, { useState} from 'react';
import './CareerTable.css';

const CareerTable = ({ careerData }) => {
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [filteredData, setFilteredData] = useState(careerData);


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

  const handleLeagueSelect = (leagueName) => {
    setSelectedLeague(leagueName);
    applyFilters(leagueName, selectedTeam);
  };

  const handleTeamSelect = (teamName) => {
    setSelectedTeam(teamName);
    applyFilters(selectedLeague, teamName);
  };

  const applyFilters = (leagueName, teamName) => {
    let filtered = careerData;

    if (leagueName) {
      filtered = filtered.map(({ season, teams }) => {
        const filteredTeams = teams.map((team) => {
          const filteredStats = team.statistics.filter(
            (stat) => stat.league.name === leagueName
          );
          return { ...team, statistics: filteredStats };
        }).filter((team) => team.statistics.length > 0); 

        return { season, teams: filteredTeams };
      }).filter((item) => item.teams.length > 0); 
    }


    if (teamName) {
      filtered = filtered.map(({ season, teams }) => {
        const filteredTeams = teams.filter((team) => team.name === teamName);

        return { season, teams: filteredTeams };
      }).filter((item) => item.teams.length > 0); 
    }

    setFilteredData(filtered.length > 0 ? filtered : []);
  };

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


  const leagueOptions = getUniqueLeagues();
  const teamOptions = getUniqueTeams();


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
