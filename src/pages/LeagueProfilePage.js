// src/pages/LeagueProfilePage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import LeagueProfile from '../components/LeagueProfile/LeagueProfile';
import UpcomingMatches from '../components/UpcomingMatches/UpcomingMatches'; // Import the UpcomingMatches component
import FinishedMatchesResults from '../components/FinishedMatchesResults/FinishedMatchesResults'; // Import the FinishedMatchesResults component
import './LeagueProfilePage.css';

const LeagueProfilePage = () => {
  const { id } = useParams();  // Get the league ID from the URL params
  const [league, setLeague] = useState(null);
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeagueData = async (leagueId) => {
      try {
        setLoading(true);
        setError(null);

        // Fetch league data
        const leagueResponse = await fetch(`https://localhost:7013/api/leagues/${leagueId}`);
        if (!leagueResponse.ok) throw new Error('League not found');
        const leagueData = await leagueResponse.json();

        if (leagueData && leagueData.league) {
          setLeague(leagueData.league);  // Set the league data
          setCountry(leagueData.country); // Set the country data
        } else {
          throw new Error('Invalid league data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagueData(id);  // Fetch the league data based on the ID
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="league-profile-page">
      <Header />
      <LeagueProfile league={league} country={country} />

      {/* Upcoming Matches Section */}
      <UpcomingMatches leagueId={id} />

      {/* Finished Matches Section */}
      <FinishedMatchesResults leagueId={id} />
    </div>
  );
};

export default LeagueProfilePage;
