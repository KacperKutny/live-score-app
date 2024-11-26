// src/pages/LeagueProfilePage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import LeagueProfile from '../components/LeagueProfile/LeagueProfile';
import UpcomingMatches from '../components/UpcomingMatches/UpcomingMatches'; 
import FinishedMatchesResults from '../components/FinishedMatchesResults/FinishedMatchesResults'; 
import Standings from '../components/Standings/Standings'; // Import the Standings component
import './LeagueProfilePage.css';

const LeagueProfilePage = () => {
  const { id } = useParams();  // Get the league ID from the URL params
  const [league, setLeague] = useState(null);
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch league data
  useEffect(() => {
    const fetchLeagueData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch league data
        const response = await fetch(`https://localhost:7013/api/leagues/${id}`);
        if (!response.ok) throw new Error('League not found');
        const data = await response.json();

        if (data && data.league) {
          setLeague(data.league);  // Set the league data
          setCountry(data.country); // Set the country data
        } else {
          throw new Error('Invalid league data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagueData();  // Fetch the league data based on the ID
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

      {/* Standings Section */}
      <Standings leagueId={id} /> {/* Pass the league ID dynamically */}
    </div>
  );
};

export default LeagueProfilePage;
