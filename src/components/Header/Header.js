// src/components/Header/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import './Header.css';
import logo from '../../assets/MainLogo.png'; // Adjust the path based on your folder structure
import searchLogo from '../../assets/searchPlayersLogo2.png'; // Import the search logo
import league_search_logo from '../../assets/league_search_logo.png'
const Header = ({ onSearchClick, onLeagueSearchClick }) => { // Accept onSearchClick as a prop
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle logo click
  const handleLogoClick = () => {
    navigate('/'); // Navigate to the main page ("/")
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo with click functionality to navigate to the main page */}
        <img
          src={logo}
          alt="Logo"
          className="header-logo"
          onClick={handleLogoClick} // Add onClick to navigate when logo is clicked
        />

        {/* Search logo acting as a button */}
        <div className="search-buttons">
          <img
          src={searchLogo}
          alt="Search Players"
          className="search-logo"
          onClick={onSearchClick} // Trigger the onSearchClick function when clicked
          title="Search Players"
        />
          <img
          src={league_search_logo}
          alt="Search Leagues"
          className="league-search-logo2"
          onClick={onLeagueSearchClick} // Trigger the onSearchClick function when clicked
          title="Search Leagues"
        />
        </div>
      </div>
    </header>
  );
};

export default Header;
