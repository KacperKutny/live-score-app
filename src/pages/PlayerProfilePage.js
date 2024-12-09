import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import PlayerProfile from '../components/PlayerProfile/PlayerProfile';
import CareerTable from '../components/CareerTable/CareerTable';
import RecentFixtures from '../components/RecentFixtures/RecentFixtures';
import TransfersTable from '../components/TransfersTable/TransfersTable';
import PlayerSearchModal from '../components/PlayerSearchModal/PlayerSearchModal'; 
import './PlayerProfilePage.css';

const PlayerProfilePage = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [team, setTeam] = useState(null);
  const [careerData, setCareerData] = useState([]);
  const [recentFixtures, setRecentFixtures] = useState([]);
  const [transfers, setTransfers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  useEffect(() => {
    const fetchPlayerData = async (playerId) => {
      try {
        setLoading(true);
        setError(null);

        // Fetch basic player data
        const playerResponse = await fetch(`https://localhost:7013/api/players/${playerId}`);
        if (!playerResponse.ok) throw new Error('Player not found');
        const playerData = await playerResponse.json();

        // Fetch current team for player's profile
        const teamResponse = await fetch(`https://localhost:7013/api/players/${playerId}/squads`);
        const teamData = teamResponse.ok ? await teamResponse.json() : [];

        // Fetch statistics for all seasons
        const statsResponse = await fetch(`https://localhost:7013/api/players/${playerId}/statistics`);
        if (!statsResponse.ok) throw new Error('Failed to load player statistics');
        const statsData = await statsResponse.json();

        // Fetch teams for all seasons
        const teamsResponse = await fetch(`https://localhost:7013/api/players/${playerId}/teams`);
        if (!teamsResponse.ok) throw new Error('Failed to load teams data');
        const teamsData = await teamsResponse.json();

        // Fetch recent fixtures
        const fixturesResponse = await fetch(
          `https://localhost:7013/api/players/${playerId}/biggest-season-fixtures`
        );
        if (fixturesResponse.ok) {
          const fixturesData = await fixturesResponse.json();
          setRecentFixtures(fixturesData.response || []);
        } else {
          console.warn('No fixtures found.');
        }

        // Fetch transfers
        const transfersResponse = await fetch(`https://localhost:7013/api/transfers/${playerId}`);
        if (transfersResponse.ok) {
          const transfersData = await transfersResponse.json();
          setTransfers(transfersData[0]?.transfers || []); 
        } else {
          console.warn('No transfers found.');
        }

        
        const combinedCareerData = statsData.map(stat => {
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

        setPlayer(playerData.player);
        setTeam(teamData[0]?.team || null);
        setCareerData(combinedCareerData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerData(id);
  }, [id]);

  const handlePlayerSearchClick = () => {
    setIsSearchModalOpen(true);
  };

  const handlePlayerSelect = () => {
    setIsSearchModalOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="player-profile-page">
      <Header onSearchClick={handlePlayerSearchClick} />
      <PlayerProfile player={player} team={team} />
      <RecentFixtures fixtures={recentFixtures} />
      <CareerTable careerData={careerData} />
      <TransfersTable transfers={transfers} />

      <PlayerSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onPlayerSelect={handlePlayerSelect}
      />
    </div>
  );
};

export default PlayerProfilePage;
