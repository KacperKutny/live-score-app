import React, { useState, useEffect, useCallback } from 'react';
import LeagueCard from '../../components/LeagueCard/LeagueCard';
import DatePickerComponent from '../DatePicker/DatePickerComponent';
import NoMatchesMessage from '../NoMatchesMessage/NoMatchesMessage';
import { fetchLeaguesByDate, initializeWebSocket } from '../../services/footballApi';
import './LeagueContainer.css';

const LeagueContainer = () => {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [noMatchesMessage, setNoMatchesMessage] = useState('');
  const [webSocket, setWebSocket] = useState(null);

  // Handle date change for the date picker
  const handleDateChange = (date) => {
    const validDate = new Date(date);
    setSelectedDate(validDate);
  };

  // Fetch data for leagues based on the selected date
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setNoMatchesMessage('');

      const today = new Date();
      const maxDate = new Date();
      maxDate.setDate(today.getDate() + 10);

      if (selectedDate > maxDate) {
        setNoMatchesMessage('No matches for this date yet.');
        setLeagues([]);
        setLoading(false);
        return;
      }

      const leaguesArray = await fetchLeaguesByDate(selectedDate);

      if (leaguesArray.length === 0) {
        setNoMatchesMessage('No matches for this date yet.');
      }

      setLeagues(leaguesArray);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [selectedDate]);

  // Handle live updates from WebSocket
  useEffect(() => {
    const handleLiveUpdate = (liveMatch) => {
      console.log("WebSocket Message received:", liveMatch);
  
      if (liveMatch?.fixture?.status) {
        const matchId = liveMatch.fixture.id;
        const matchStatus = liveMatch.fixture.status.long;
        const newElapsed = liveMatch.fixture.elapsedMinutes;  // Use `elapsedMinutes` instead of `elapsed`
        const newGoals = liveMatch.goals; // Get the updated goals data
  
        // Check if elapsedMinutes exists
        if (newElapsed === undefined || newElapsed === null) {
          console.warn(`Skipping update for match ${matchId}: Elapsed time is missing.`);
          return;
        }
  
        // Update state with both new goals and elapsed minutes
        setLeagues((prevLeagues) => {
          return prevLeagues.map((league) => {
            const updatedMatches = league.matches.map((match) => {
              if (match.fixture.id === matchId) {
                console.log(`Updating match ${matchId}: Previous elapsed: ${match.fixture.status.elapsed}, New elapsed: ${newElapsed}`);
  
                return {
                  ...match,
                  fixture: {
                    ...match.fixture,
                    status: {
                      ...match.fixture.status,
                      long: matchStatus || match.fixture.status.long,
                      elapsed: newElapsed,  // Update with `newElapsed`
                    },
                  },
                  goals: {
                    home: newGoals.home ?? match.goals.home,
                    away: newGoals.away ?? match.goals.away,
                  },
                };
              }
              return match;
            });
  
            return { ...league, matches: updatedMatches };
          });
        });
      } else {
        console.error("Invalid WebSocket message structure:", liveMatch);
      }
    };
  
    const ws = initializeWebSocket(handleLiveUpdate);
    setWebSocket(ws);
  
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);
  

  // Fetch data when the selected date changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <div>Loading leagues...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="league-container">
      <div className="date-picker-wrapper">
        <DatePickerComponent selectedDate={selectedDate} onDateChange={handleDateChange} />
      </div>

      {noMatchesMessage ? (
        <NoMatchesMessage message={noMatchesMessage} />
      ) : (
        leagues.map((league) => (
          <LeagueCard
            key={league.id}
            leagueid={league.id}
            leagueName={league.leagueName}
            leagueLogo={league.leagueLogo}
            leagueFlag={league.leagueFlag}
            matches={league.matches}
          />
        ))
      )}
    </div>
  );
};

export default LeagueContainer;
