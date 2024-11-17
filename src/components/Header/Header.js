import React from 'react';
import './Header.css';
import logo from '../../assets/logo.png'; // Adjust the path based on your folder structure

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <img src={logo} alt="Logo" className="header-logo" />
        <h1 className="header-title">FOOTBALL STATS</h1>
      </div>
    </header>
  );
};

export default Header;