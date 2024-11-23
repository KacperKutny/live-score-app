import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import PlayerProfile from '../components/PlayerProfile/PlayerProfile';
import CareerTable from '../components/CareerTable/CareerTable';
import './PlayerProfilePage.css';

const PlayerProfilePage = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [team, setTeam] = useState(null);
  const [careerData, setCareerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        setLoading(true);
        setError(null);
  
        // Fetch player data
        const playerResponse = await fetch(`https://localhost:7013/api/players/${id}`);
        if (!playerResponse.ok) throw new Error('Player not found');
        const playerData = await playerResponse.json();
  
        // Fetch current team
        const teamResponse = await fetch(`https://localhost:7013/api/players/${id}/squads`);
        const teamData = teamResponse.ok ? await teamResponse.json() : [];
  
        // Fetch statistics for all seasons
        const statsResponse = await fetch(`https://localhost:7013/api/players/${id}/statistics`);
        if (!statsResponse.ok) throw new Error('Failed to load player statistics');
        const statsData = await statsResponse.json();
  
        // Fetch teams for all seasons
        const teamsResponse = await fetch(`https://localhost:7013/api/players/${id}/teams`);
        if (!teamsResponse.ok) throw new Error('Failed to load teams data');
        const teamsData = await teamsResponse.json();
  
        // Log the data to verify the structure
        console.log('Stats Data:', statsData);
        console.log('Teams Data:', teamsData);
  
        // Combine career data
        const combinedCareerData = statsData.map(stat => {
          // For each season in statsData, match the teams
          const seasonTeams = teamsData.filter(team => team.seasons.includes(stat.season));
  
          return {
            season: stat.season,
            teams: seasonTeams.map(team => ({
              id: team.team.id,
              name: team.team.name,
              logo: team.team.logo,
              statistics: stat.statistics.filter(stat => stat.team.id === team.team.id)
            }))
          };
        });
  
        // Log the merged career data
        console.log('Combined Career Data:', combinedCareerData);
  
        setPlayer(playerData.player);
        setTeam(teamData[0]?.team || null);
        setCareerData(combinedCareerData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPlayerData();
  }, [id]);
  
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="player-profile-page">
      <Header />
      <PlayerProfile player={player} team={team} />
      <CareerTable careerData={careerData} />
    </div>
  );
};

export default PlayerProfilePage;
