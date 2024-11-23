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
  const [noMatchesMessage, setNoMatchesMessage] = useState("");
  const [webSocket, setWebSocket] = useState(null); // WebSocket state

  // Handle date change for date picker
  const handleDateChange = (date) => {
    const validDate = new Date(date);
    setSelectedDate(validDate); // Update selected date state
  };

  // Fetch data for leagues by selected date
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setNoMatchesMessage("");

      const today = new Date();
      const maxDate = new Date();
      maxDate.setDate(today.getDate() + 10);

      // If the selected date is in the future (more than 10 days), show message
      if (selectedDate > maxDate) {
        setNoMatchesMessage("No matches for this date yet.");
        setLeagues([]);
        setLoading(false);
        return;
      }

      // Fetch leagues for the selected date
      const leaguesArray = await fetchLeaguesByDate(selectedDate);

      if (leaguesArray.length === 0) {
        setNoMatchesMessage("No matches for this date yet.");
      }

      setLeagues(leaguesArray); // Set leagues with the fetched data
      setLoading(false);
    } catch (err) {
      setError(err.message); // Handle errors during fetch
      setLoading(false);
    }
  }, [selectedDate]);

  // WebSocket logic to update match data in real-time
  useEffect(() => {
    const handleLiveUpdate = (liveMatch) => {
      console.log("WebSocket Message received:", liveMatch);
  
      if (liveMatch && liveMatch.fixture && liveMatch.fixture.status) {
          const newElapsed = liveMatch.fixture.status.Elapsed;
  
          setLeagues((prevLeagues) => {
              return prevLeagues.map((league) => {
                  const updatedMatches = league.matches.map((match) => {
                      if (match.fixture.id === liveMatch.fixture.id) {
                          // Only update the match if the elapsed time has actually changed
                          if (match.elapsed !== newElapsed) {
                              console.log(`Updating match ${match.fixture.id}: elapsed from ${match.elapsed} to ${newElapsed}`);
                              return {
                                  ...match, // Copy the existing match object
                                  status: liveMatch.fixture.status.Long || "Unknown", // Update status
                                  elapsed: newElapsed, // Update elapsed
                                  homeScore: liveMatch.goals.Home, // Update scores
                                  awayScore: liveMatch.goals.Away,
                                  homeFlag: liveMatch.teams.home.flag,
                                  awayFlag: liveMatch.teams.away.flag,
                                  homeTeam: liveMatch.teams.home.name,
                                  awayTeam: liveMatch.teams.away.name,
                              };
                          }
                      }
                      return match; // Return unchanged match
                  });
  
                  return { ...league, matches: updatedMatches }; // Update league matches
              });
          });
      }
  };
  

    const ws = initializeWebSocket(handleLiveUpdate);
    setWebSocket(ws); // Store the WebSocket instance

    return () => {
      if (ws) {
        ws.close(); // Cleanup WebSocket on component unmount
      }
    };
  }, []); // Only run once on component mount

  // Fetch leagues initially and when the selectedDate changes
  useEffect(() => {
    fetchData(); // Call fetchData to update leagues when the selected date changes
  }, [fetchData]); // Re-run whenever `fetchData` changes (which depends on `selectedDate`)

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
        leagues.map((league) => {
          return (
            <LeagueCard
              key={league.id}  // Use stable key (id or leagueName)
              leagueName={league.leagueName}
              leagueLogo={league.leagueLogo}
              leagueFlag={league.leagueFlag}
              matches={league.matches}  // Pass updated matches
            />
          );
        })
      )}
    </div>
  );
};

export default LeagueContainer;