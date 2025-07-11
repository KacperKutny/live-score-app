import { groupBy, map } from 'lodash';

let webSocket = null;


export const initializeWebSocket = (onMessageCallback) => {
  if (webSocket) {
    return; 
  }

  webSocket = new WebSocket('wss://localhost:7013/ws'); 

  webSocket.onopen = () => {
    console.log("WebSocket connection established.");
  };

  webSocket.onmessage = (event) => {
    const liveUpdate = JSON.parse(event.data);
    console.log("WebSocket Message:", liveUpdate);
    if (onMessageCallback) {
      onMessageCallback(liveUpdate);
    }
  };

  webSocket.onclose = () => {
    console.log("WebSocket connection closed. Reconnecting...");
    webSocket = null;
    setTimeout(() => initializeWebSocket(onMessageCallback), 5000); 
  };

  webSocket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
};


export const fetchLeaguesByDate = async (date) => {
  const formattedDate = new Date(date).toISOString().split('T')[0];
  const response = await fetch(`https://localhost:7013/api/fixtures?date=${formattedDate}`);

  if (!response.ok) {
    throw new Error('Failed to fetch fixtures');
  }

  const data = await response.json();

  // Group matches by league
  const leaguesMap = groupBy(data, (match) => match.league.id);
  return map(leaguesMap, (matches) => {
    const leagueInfo = matches[0].league;
    return {
      leagueName: leagueInfo.name,
      leagueLogo: leagueInfo.logo,
      leagueFlag: leagueInfo.flag,
      matches: matches,
    };
  });
};