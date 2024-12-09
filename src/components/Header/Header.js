import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Header.css';
import logo from '../../assets/MainLogo.png'; 
import searchLogo from '../../assets/searchPlayersLogo2.png'; 
import league_search_logo from '../../assets/league_search_logo.png'
const Header = ({ onSearchClick, onLeagueSearchClick }) => { 
  const navigate = useNavigate(); 


  const handleLogoClick = () => {
    navigate('/'); 
  };

  return (
    <header className="header">
      <div className="header-content">
        <img
          src={logo}
          alt="Logo"
          className="header-logo"
          onClick={handleLogoClick} 
        />

        <div className="search-buttons">
          <img
          src={searchLogo}
          alt="Search Players"
          className="search-logo"
          onClick={onSearchClick} 
          title="Search Players"
        />
          <img
          src={league_search_logo}
          alt="Search Leagues"
          className="league-search-logo2"
          onClick={onLeagueSearchClick} 
          title="Search Leagues"
        />
        </div>
      </div>
    </header>
  );
};

export default Header;
