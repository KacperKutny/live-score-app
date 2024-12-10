
import React, { useEffect, useState } from 'react';
import './FinishedMatchesResults.css';

const FinishedMatchesResults = ({ leagueId }) => {
  const [fixtures, setFixtures] = useState([]);
  const [rounds, setRounds] = useState([]); 
  const [selectedRound, setSelectedRound] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleMatches, setVisibleMatches] = useState(7); 

  useEffect(() => {
    const fetchFinishedMatches = async () => {
      try {
        const response = await fetch(`https://localhost:7013/api/fixtures/max-season/${leagueId}`);
        const data = await response.json();

        if (response.ok) {
          const finishedMatches = data.filter(fixture => fixture.fixture.status.short === "FT");

          const uniqueRounds = [...new Set(finishedMatches.map(fixture => fixture.league.round))];
          setRounds(uniqueRounds);

          setFixtures(finishedMatches);
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

    fetchFinishedMatches();
  }, [leagueId]);

  const filteredFixtures = selectedRound
    ? fixtures.filter(fixture => fixture.league.round === selectedRound)
    : fixtures;


  const loadMoreMatches = () => {
    setVisibleMatches((prev) => prev + 7); 
  };

  if (loading) {
    return <p>Loading finished matches...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="finished-fixtures-container">
      <h3>Finished Matches</h3>


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
        <p>No finished matches found.</p>
      ) : (
        <table className="fixtures-table">
          <thead>
            <tr>
              <th>Match Date</th>
              <th>Home Team</th>
              <th>Away Team</th>
              <th>Score</th>
              <th>Venue</th>
            </tr>
          </thead>
          <tbody>
            {filteredFixtures.slice(0, visibleMatches).map((fixture) => {
              const homeScore = fixture.goals.home;
              const awayScore = fixture.goals.away;
              const isHomeWin = homeScore > awayScore;
              const isAwayWin = awayScore > homeScore;

              return (
                <tr key={fixture.fixture.id}>
                  <td>
                    {`${new Date(fixture.fixture.date).toLocaleDateString()} ${new Date(fixture.fixture.date).toLocaleTimeString()}`}
                  </td>
                  <td>
                    <div className="team-name">
                      <img className="team-logo" src={fixture.teams.home.logo} alt={fixture.teams.home.name} />
                      <span style={{ fontWeight: isHomeWin ? 'bold' : 'normal' }}>
                        {fixture.teams.home.name}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="team-name">
                      <img className="team-logo" src={fixture.teams.away.logo} alt={fixture.teams.away.name} />
                      <span style={{ fontWeight: isAwayWin ? 'bold' : 'normal' }}>
                        {fixture.teams.away.name}
                      </span>
                    </div>
                  </td>
                  <td>
                    {homeScore} - {awayScore}
                  </td>
                  <td>{fixture.fixture.venue.name}, {fixture.fixture.venue.city}</td>
                </tr>
              );
            })}
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

export default FinishedMatchesResults;
