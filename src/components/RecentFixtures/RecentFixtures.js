import React, { useState } from 'react';
import './RecentFixtures.css';

const RecentFixtures = ({ fixtures }) => {
  const [visibleFixtures, setVisibleFixtures] = useState(6); 

  const loadMoreFixtures = () => {
    setVisibleFixtures((prev) => prev + 6);
  };

  if (!fixtures || fixtures.length === 0) return <p>No fixtures available</p>;

  const sortedFixtures = [...fixtures].sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date));

  const getWinningTeam = (homeGoals, awayGoals, homeTeamName, awayTeamName) => {
    if (homeGoals > awayGoals) return homeTeamName;
    if (awayGoals > homeGoals) return awayTeamName;
    return null;
  };

  const handleFixtureClick = (fixture) => {
    const matchData = {
      matchId: fixture.fixture.id,
      homeLogo: fixture.teams.home.logo,
      homeTeam: fixture.teams.home.name,
      homeTeamId: fixture.teams.home.id,
      homeScore: fixture.goals.home,
      awayLogo: fixture.teams.away.logo,
      awayTeam: fixture.teams.away.name,
      awayTeamId: fixture.teams.away.id,
      awayScore: fixture.goals.away,
      status: fixture.fixture.status.long,
      elapsed: fixture.fixture.status.elapsed,
      date: fixture.fixture.date,
    };

    const encodedMatchData = encodeURIComponent(JSON.stringify(matchData));
    const matchUrl = `/match/${fixture.fixture.id}?data=${encodedMatchData}`;
    window.open(matchUrl, '_blank', 'width=900,height=1000,scrollbars=no,resizable=no');
  };

  return (
    <div className="recent-fixtures-container">
      <h3 className="recent-fixtures-header">Recent Fixtures</h3>

      <table className="recent-fixtures-table">
        <thead>
          <tr>
            <th className="recent-fixtures-header-date">Date</th>
            <th className="recent-fixtures-header-league">League</th>
            <th className="recent-fixtures-header-home">Home Team</th>
            <th className="recent-fixtures-header-score">Score</th>
            <th className="recent-fixtures-header-away">Away Team</th>
          </tr>
        </thead>
        <tbody>
          {sortedFixtures.slice(0, visibleFixtures).map((fixture) => {
            const { home, away } = fixture.goals;
            const winningTeam = getWinningTeam(home, away, fixture.teams.home.name, fixture.teams.away.name);

            return (
              <tr
                key={fixture.fixture.id}
                onClick={() => handleFixtureClick(fixture)}
                className="recent-fixtures-row"
              >
                <td className="recent-fixtures-date">
                  {new Date(fixture.fixture.date).toLocaleDateString()}
                </td>
                <td className="recent-fixtures-league-info">
                  <img
                    src={fixture.league.flag || fixture.league.logo}
                    alt={fixture.league.name}
                    className="recent-fixtures-league-logo"
                  />
                  {fixture.league.name}
                </td>
                <td
                  className={`recent-fixtures-home-team ${
                    winningTeam === fixture.teams.home.name ? 'recent-fixtures-bold' : ''
                  }`}
                >
                  <img
                    src={fixture.teams.home.logo}
                    alt={fixture.teams.home.name}
                    className="recent-fixtures-team-logo"
                  />
                  {fixture.teams.home.name}
                </td>
                <td className="recent-fixtures-score">
                  {home} - {away}
                </td>
                <td
                  className={`recent-fixtures-away-team ${
                    winningTeam === fixture.teams.away.name ? 'recent-fixtures-bold' : ''
                  }`}
                >
                  <img
                    src={fixture.teams.away.logo}
                    alt={fixture.teams.away.name}
                    className="recent-fixtures-team-logo"
                  />
                  {fixture.teams.away.name}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {visibleFixtures < fixtures.length && (
        <button onClick={loadMoreFixtures} className="recent-fixtures-load-more-btn">
          Load More
        </button>
      )}
    </div>
  );
};

export default RecentFixtures;
