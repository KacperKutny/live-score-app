import React, { useEffect, useState } from 'react';
import './Standings.css';

const Standings = ({ leagueId }) => {
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [standings, setStandings] = useState([]);

  // Fetch available seasons
  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const response = await fetch(`https://localhost:7013/api/leagues/${leagueId}/seasons`);
        const data = await response.json();
        setSeasons(data.seasons);
        setSelectedSeason(data.seasons[data.seasons.length - 1]); // Default to the latest season
      } catch (error) {
        console.error('Error fetching seasons:', error);
      }
    };

    fetchSeasons();
  }, [leagueId]);

  // Fetch standings data when season or leagueId changes
  useEffect(() => {
    if (selectedSeason) {
      const fetchStandings = async () => {
        try {
          const response = await fetch(`https://localhost:7013/api/leagues/${leagueId}/standings/${selectedSeason}`);
          const data = await response.json();

          if (data && Array.isArray(data) && data[0]?.league?.standings) {
            setStandings(data[0].league.standings[0]);
          } else {
            console.error('No standings data found');
            setStandings([]);
          }
        } catch (error) {
          console.error('Error fetching standings:', error);
        }
      };

      fetchStandings();
    }
  }, [selectedSeason, leagueId]);

  const handleSeasonChange = (e) => {
    setSelectedSeason(Number(e.target.value));
  };

  return (
    <div className="standings">
      <h2>Standings</h2>

      {/* Season Filter */}
      <div>
        <label htmlFor="season">Select Season: </label>
        <select id="season" value={selectedSeason || ''} onChange={handleSeasonChange}>
          {seasons.map((season) => (
            <option key={season} value={season}>
              {season}
            </option>
          ))}
        </select>
      </div>

      {standings.length > 0 ? (
        <table className="standings-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Team</th>
              <th>Matches Played</th>
              <th>Wins</th>
              <th>Draws</th>
              <th>Losses</th>
              <th>Points</th>
              <th>Goals</th>
              <th>Form</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team) => (
              <tr key={team.team.id}>
                <td>{team.rank}</td>
                <td>
                  <img src={team.team.logo} alt={team.team.name} className="team-logo" />
                  {team.team.name}
                </td>
                <td>{team.all.played}</td>
                <td>{team.all.win}</td>
                <td>{team.all.draw}</td>
                <td>{team.all.lose}</td>
                <td>{team.points}</td>
                <td>
                  {team.all.goals.for}:{team.all.goals.against}
                </td>
                <td className="form">
                  {team.form.split("").map((formType, index) => {
                    if (formType === 'W') {
                      return <span key={index} className="form-box win">W</span>;
                    } else if (formType === 'L') {
                      return <span key={index} className="form-box loss">L</span>;
                    } else if (formType === 'D') {
                      return <span key={index} className="form-box draw">D</span>;
                    } else {
                      return <span key={index} className="form-box">{formType}</span>;
                    }
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No standings available for season {selectedSeason}.</div>
      )}
    </div>
  );
};

export default Standings;
