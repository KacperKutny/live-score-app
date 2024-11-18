import React from 'react';
import './NoMatchesMessage.css';
import NoMatchesImage from '../../assets/calendar-error.png'

const NoMatchesMessage = ({ message }) => {
    return (
      <div className="no-matches-wrapper">
        <h1 className="no-events-header">No Events</h1> {/* Bold header */}
        <img src={NoMatchesImage} alt="No Matches" className="no-matches-image" />
        <p className="no-matches-text">{message}</p>
      </div>
    );
  };
  
  export default NoMatchesMessage;