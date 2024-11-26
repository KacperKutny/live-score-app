import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './RecentFixtures.css';

const RecentFixtures = ({ fixtures }) => {
  const [visibleFixtures, setVisibleFixtures] = useState(6); // Initially show 6 fixtures
  const [loadedFixtures, setLoadedFixtures] = useState(fixtures.slice(0, 6)); // Start with the first 6 fixtures
  const navigate = useNavigate(); // Initialize the navigate function from react-router-dom

  const loadMoreFixtures = () => {
    // Increase the number of fixtures to load
    const newVisibleCount = visibleFixtures + 6;
    setVisibleFixtures(newVisibleCount);

    // Add more fixtures to the currently loaded fixtures
    setLoadedFixtures(fixtures.slice(0, newVisibleCount));
  };

  if (!fixtures || fixtures.length === 0) return <p>No fixtures available</p>;

  // Sort fixtures by date (most recent first)
  const sortedFixtures = fixtures.sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date));

  // Function to determine the winner team
  const getWinningTeam = (homeGoals, awayGoals, homeTeamName, awayTeamName) => {
    if (homeGoals > awayGoals) {
      return homeTeamName;
    } else if (awayGoals > homeGoals) {
      return awayTeamName;
    }
    return null; // In case of a draw, return null
  };

  const handleLeagueClick = (leagueId) => {
    // Navigate to the League Profile Page using the leagueId
    navigate(`/league/${leagueId}`);
  };

  return (
    <div className="recent-fixtures-container">
      <h3>Recent Fixtures</h3>

      <table className="fixtures-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>League</th>
            <th>Home Team</th>
            <th>Score</th>
            <th>Away Team</th>
          </tr>
        </thead>
        <tbody>
          {sortedFixtures.slice(0, visibleFixtures).map((fixture) => {
            const homeGoals = fixture.goals.home;
            const awayGoals = fixture.goals.away;
            const winningTeam = getWinningTeam(homeGoals, awayGoals, fixture.teams.home.name, fixture.teams.away.name);

            return (
              <tr key={fixture.fixture.id}>
                {/* Date Column */}
                <td>{new Date(fixture.fixture.date).toLocaleDateString()}</td>

                {/* League Column */}
                <td className="league-info" onClick={() => handleLeagueClick(fixture.league.id)}>
                  {fixture.league.flag ? (
                    <img
                      src={fixture.league.flag}
                      alt={fixture.league.name}
                      className="league-flag"
                    />
                  ) : (
                    <img
                      src={fixture.league.logo}
                      alt={fixture.league.name}
                      className="league-logo"
                    />
                  )}
                  {fixture.league.name}
                </td>

                {/* Home Team Column */}
                <td className={`home-team-name ${winningTeam === fixture.teams.home.name ? 'bold' : ''}`}>
                  <img src={fixture.teams.home.logo} alt={fixture.teams.home.name} className="team-logo" />
                  {fixture.teams.home.name}
                </td>

                {/* Score Column */}
                <td className="score">
                  {homeGoals} - {awayGoals}
                </td>

                {/* Away Team Column */}
                <td className={`away-team-name ${winningTeam === fixture.teams.away.name ? 'bold' : ''}`}>
                  <img src={fixture.teams.away.logo} alt={fixture.teams.away.name} className="team-logo" />
                  {fixture.teams.away.name}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Load More Button */}
      {visibleFixtures < fixtures.length && (
        <button onClick={loadMoreFixtures} className="load-more-btn">
          Load More
        </button>
      )}
    </div>
  );
};

export default RecentFixtures;
