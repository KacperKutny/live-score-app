import React, { useEffect, useState } from 'react';
import './UpcomingMatches.css';

const UpcomingMatches = ({ leagueId }) => {
  const [fixtures, setFixtures] = useState([]);
  const [rounds, setRounds] = useState([]); 
  const [selectedRound, setSelectedRound] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleMatches, setVisibleMatches] = useState(7); 

  useEffect(() => {
    const fetchUpcomingMatches = async () => {
      try {
        const response = await fetch(`https://localhost:7013/api/fixtures/max-season/${leagueId}`);
        const data = await response.json();

        if (response.ok) {
          const upcomingMatches = data.filter(fixture => 
            fixture.fixture.status.short === "NS" || fixture.fixture.status.short === "TBD"
          );

          
          const uniqueRounds = [...new Set(upcomingMatches.map(fixture => fixture.league.round))];
          setRounds(uniqueRounds); 

          setFixtures(upcomingMatches);
        } else {
          setError('Failed to load fixtures.');
        }
      } catch (err) {
        setError('Error fetching fixtures.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingMatches();
  }, [leagueId]);


  const filteredFixtures = selectedRound
    ? fixtures.filter(fixture => fixture.league.round === selectedRound)
    : fixtures;


  const loadMoreMatches = () => {
    setVisibleMatches((prev) => prev + 7); 
  };

  if (loading) {
    return <p>Loading upcoming matches...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="recent-fixtures-container">
      <h3>Upcoming Matches</h3>

      
      <div className="round-filter">
        <label htmlFor="round">Select Round: </label>
        <select
          id="round"
          value={selectedRound}
          onChange={(e) => setSelectedRound(e.target.value)}
        >
          <option value="">All Rounds</option>
          {rounds.length > 0 ? (
            rounds.map((round, index) => (
              <option key={index} value={round}>
                {round}
              </option>
            ))
          ) : (
            <option value="Regular Season - 1">Regular Season - 1</option>
          )}
        </select>
      </div>

      {filteredFixtures.length === 0 ? (
        <p>No upcoming matches found.</p>
      ) : (
        <table className="fixtures-table">
          <thead>
            <tr>
              <th>Match Date</th>
              <th>Home Team</th>
              <th>Away Team</th>
              <th>Venue</th>
            </tr>
          </thead>
          <tbody>
            {filteredFixtures.slice(0, visibleMatches).map((fixture) => (
              <tr key={fixture.fixture.id}>
                <td>
                  {fixture.fixture.status.short === "TBD"
                    ? "TBD"
                    : new Date(fixture.fixture.date).toLocaleString()}
                </td>
                <td>
                  <div className="team-name">
                    <img className="team-logo" src={fixture.teams.home.logo} alt={fixture.teams.home.name} />
                    <span>{fixture.teams.home.name}</span>
                  </div>
                </td>
                <td>
                  <div className="team-name">
                    <img className="team-logo" src={fixture.teams.away.logo} alt={fixture.teams.away.name} />
                    <span>{fixture.teams.away.name}</span>
                  </div>
                </td>
                <td>{fixture.fixture.venue.name}, {fixture.fixture.venue.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {visibleMatches < filteredFixtures.length && (
        <button className="load-more-btn" onClick={loadMoreMatches}>
          Load More
        </button>
      )}
    </div>
  );
};

export default UpcomingMatches;
