
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import LeagueProfile from '../components/LeagueProfile/LeagueProfile';
import UpcomingMatches from '../components/UpcomingMatches/UpcomingMatches'; 
import FinishedMatchesResults from '../components/FinishedMatchesResults/FinishedMatchesResults'; 
import Standings from '../components/Standings/Standings'; 
import './LeagueProfilePage.css';

const LeagueProfilePage = () => {
  const { id } = useParams();  
  const [league, setLeague] = useState(null);
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          setLeague(data.league);  
          setCountry(data.country); 
        } else {
          throw new Error('Invalid league data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagueData(); 
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="league-profile-page">
      <Header />
      <LeagueProfile league={league} country={country} />   
      <UpcomingMatches leagueId={id} />  
      <FinishedMatchesResults leagueId={id} />    
      <Standings leagueId={id} /> 
    </div>
  );
};

export default LeagueProfilePage;
