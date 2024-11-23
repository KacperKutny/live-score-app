// // src/pages/PlayerProfilePage.js
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom'; // To access the player ID from URL
// import Header from '../components/Header/Header';
// import PlayerProfile from '../components/PlayerProfile/PlayerProfile'; // Import PlayerProfile component
// import './PlayerProfilePage.css'; // Add your CSS styles for the profile page

// const PlayerProfilePage = () => {
//   const { id } = useParams(); // Get the player ID from the URL params
//   const [player, setPlayer] = useState(null); // State to store player data
//   const [loading, setLoading] = useState(true); // State to show loading
//   const [error, setError] = useState(null); // State for error handling

//   // Fetch player profile on component mount
//   useEffect(() => {
//     const fetchPlayerProfile = async () => {
//       try {
//         const response = await fetch(`https://localhost:7013/api/players/${id}`); // Endpoint to fetch player by ID
//         if (!response.ok) {
//           throw new Error('Player not found');
//         }
//         const data = await response.json();
//         setPlayer(data.player); // Set the player data to state
//       } catch (error) {
//         setError(error.message); // Set error message if fetch fails
//       } finally {
//         setLoading(false); // Set loading to false once data is fetched
//       }
//     };

//     fetchPlayerProfile();
//   }, [id]); // Fetch the profile when the ID changes

//   if (loading) {
//     return <div>Loading...</div>; // Show loading message while data is being fetched
//   }

//   if (error) {
//     return <div>{error}</div>; // Show error message if there's an issue
//   }

//   return (
//     <div className="player-profile-page">
//       <Header />
//       {/* Pass player data to PlayerProfile component */}
//       <PlayerProfile player={player} />
//     </div>
//   );
// };

// export default PlayerProfilePage;

// src/pages/PlayerProfilePage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import PlayerProfile from '../components/PlayerProfile/PlayerProfile';
import './PlayerProfilePage.css';

const PlayerProfilePage = () => {
  const { id } = useParams(); // Get player ID from URL
  const [player, setPlayer] = useState(null);
  const [team, setTeam] = useState(null); // State to store team data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch player data
        const playerResponse = await fetch(`https://localhost:7013/api/players/${id}`);
        if (!playerResponse.ok) {
          throw new Error('Player not found');
        }
        const playerData = await playerResponse.json();

        // Fetch team/squad data
        const teamResponse = await fetch(`https://localhost:7013/api/players/${id}/squads`);
        if (!teamResponse.ok) {
          throw new Error('Team not found');
        }
        const teamData = await teamResponse.json();

        // Update state with fetched data
        setPlayer(playerData.player);
        setTeam(teamData[0]?.team || null); // Use the first team in the response
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="player-profile-page">
      <Header />
      {/* Pass player and team data to PlayerProfile */}
      <PlayerProfile player={player} team={team} />
    </div>
  );
};

export default PlayerProfilePage;
