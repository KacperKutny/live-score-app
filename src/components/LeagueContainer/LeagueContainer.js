import React, { useState, useEffect } from 'react';
import LeagueCard from '../../components/LeagueCard/LeagueCard';
import DatePickerComponent from '../DatePicker/DatePickerComponent';
import NoMatchesMessage from '../NoMatchesMessage/NoMatchesMessage';
import { fetchLeaguesByDate } from '../../services/footballApi';
import './LeagueContainer.css';

const LeagueContainer = () => {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [noMatchesMessage, setNoMatchesMessage] = useState("");

  const handleDateChange = (date) => {
    const validDate = new Date(date);
    setSelectedDate(validDate);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setNoMatchesMessage("");

        const today = new Date();
        const maxDate = new Date();
        maxDate.setDate(today.getDate() + 10);

        if (selectedDate > maxDate) {
          setNoMatchesMessage("No matches for this date yet.");
          setLeagues([]);
          setLoading(false);
          return;
        }

        const leaguesArray = await fetchLeaguesByDate(selectedDate);

        if (leaguesArray.length === 0) {
          setNoMatchesMessage("No matches for this date yet.");
        }

        setLeagues(leaguesArray);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedDate]);

  if (loading) {
    return <div>Loading leagues...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="league-container">
      <div className="date-picker-wrapper">
        <DatePickerComponent
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
      </div>

      {noMatchesMessage ? (
        <NoMatchesMessage message={noMatchesMessage} />
      ) : (
        leagues.map((league, index) => (
          <LeagueCard
            key={index}
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