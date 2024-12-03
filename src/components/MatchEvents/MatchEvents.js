import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MatchStatistics from '../MatchStatistics/MatchStatistics'; // Import the MatchStatistics component
import yellowCardIcon from '../../assets/yellow-card.png';
import substituteIcon from '../../assets/substitute-icon.png';
import goalScoredIcon from '../../assets/goal-scored.png';
import './MatchEvents.css';

const MatchEvents = ({ matchId, homeTeamId, awayTeamId }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchEvents = async () => {
      try {
        const response = await fetch(`https://localhost:7013/api/fixtures/${matchId}/events`);
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const eventsData = await response.json();

        if (eventsData && eventsData.length > 0) {
          setEvents(eventsData);
        } else {
          setError('No events for this match');
        }
      } catch (error) {
        console.error('Error fetching match events:', error);
        setError('Error fetching match events');
      } finally {
        setLoading(false);
      }
    };

    if (matchId) {
      fetchMatchEvents();
    }
  }, [matchId]);

  const handlePlayerClick = (playerId) => {
    // Open the player profile in a new tab
    window.open(`/player/${playerId}`, '_blank');
  };

  return (
    <div className="matchprofile-events">
      <h3>Match Events</h3>
      {loading ? (
        <p>Loading events...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="matchprofile-events-container">
          {events.map((event, index) => (
            <div
              key={index}
              className={`matchprofile-event-item ${event.team.id === homeTeamId ? 'home-event' : 'away-event'}`}
            >
              <span className="matchevent-time">{event.time.elapsed}'</span>
              <span className="matchevent-details">
                {event.type === 'Card' && event.detail === 'Yellow Card' ? (
                  <>
                    <img src={yellowCardIcon} alt="Yellow Card" className="event-icon" />
                    <strong className="player-name" onClick={() => handlePlayerClick(event.player.id)}>
                      {event.player.name}
                    </strong>
                    {event.comments && <span> ({event.comments})</span>}
                  </>
                ) : event.type === 'subst' ? (
                    <>
                      <img src={substituteIcon} alt="Substitution" className="event-icon" />
                      <strong className="player-name player-name-main" onClick={() => handlePlayerClick(event.player.id)}>
                        {event.player.name}
                      </strong>{' '}
                      {event.assist && event.assist.name && (
                        <span>
                          {' '}<strong className="player-name player-name-assist" onClick={() => handlePlayerClick(event.assist.id)}>{event.assist.name}</strong>
                        </span> 
                      )}
                    </>
                  ) : event.type === 'Goal' ? (
                    <>
                      <img src={goalScoredIcon} alt="Goal Scored" className="event-icon" />
                      <strong className="player-name player-name-main" onClick={() => handlePlayerClick(event.player.id)}>
                        {event.player.name}
                      </strong>
                      {event.assist && event.assist.name && (
                        <span>
                          {' '}<strong className="player-name player-name-assist" onClick={() => handlePlayerClick(event.assist.id)}>{event.assist.name}</strong>
                        </span> 
                      )}
                    </>
                  ) : (
                    <>
                      <strong className="player-name player-name-main" onClick={() => handlePlayerClick(event.player.id)}>
                        {event.player.name}
                      </strong> ({event.team.name})
                      {event.comments && <span> ({event.comments})</span>}
                    </>
                  )
                }
              </span>
            </div>
          ))}
        </div>
      )}
      {/* MatchStatistics Component */}
      <MatchStatistics homeTeamId={homeTeamId} awayTeamId={awayTeamId} />
    </div>
  );
};

MatchEvents.propTypes = {
  matchId: PropTypes.string.isRequired,
  homeTeamId: PropTypes.string.isRequired,
  awayTeamId: PropTypes.string.isRequired,
};

export default MatchEvents;
