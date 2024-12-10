import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import MatchEvents from '../MatchEvents/MatchEvents';
import MatchStatistics from '../MatchStatistics/MatchStatistics'; 
import MatchLineUp from '../MatchLineUp/MatchLineUp'; 
import './MatchProfile.css';

const MatchProfile = () => {
    const { matchId } = useParams(); 
    const [searchParams] = useSearchParams(); 
    const matchData = JSON.parse(decodeURIComponent(searchParams.get('data'))); 
    const [activeTab, setActiveTab] = useState('events'); 

    if (!matchData) {
        return <div>No match data available.</div>;
    }

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const matchIdNumber = Number(matchId);

    return (
        <div className="matchprofile-container">
           
            <div className="matchprofile-header">
                
                <div className="matchprofile-team matchprofile-home-team">
                    <img
                        src={matchData.homeLogo}
                        alt={`${matchData.homeTeam} logo`}
                        className="matchprofile-team-logo"
                    />
                    <h2 className="matchprofile-team-name">{matchData.homeTeam}</h2>
                    <p className="matchprofile-team-score">{matchData.homeScore}</p>
                </div>

                
                <div className="matchprofile-info">
                    <p className="matchprofile-date">
                        Date: {new Date(matchData.date).toLocaleDateString()}
                    </p>
                    <p className="matchprofile-time">
                        Time: {new Date(matchData.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="matchprofile-status">{matchData.status}</p>
                </div>

                
                <div className="matchprofile-team matchprofile-away-team">
                    <img
                        src={matchData.awayLogo}
                        alt={`${matchData.awayTeam} logo`}
                        className="matchprofile-team-logo"
                    />
                    <h2 className="matchprofile-team-name">{matchData.awayTeam}</h2>
                    <p className="matchprofile-team-score">{matchData.awayScore}</p>
                </div>
            </div>

          
            <div className="matchprofile-tabs">
                <button
                    className={activeTab === 'events' ? 'active' : ''}
                    onClick={() => handleTabClick('events')}
                >
                    Match Events
                </button>
                <button
                    className={activeTab === 'statistics' ? 'active' : ''}
                    onClick={() => handleTabClick('statistics')}
                >
                    Match Statistics
                </button>
                <button
                    className={activeTab === 'lineups' ? 'active' : ''}
                    onClick={() => handleTabClick('lineups')}
                >
                    Lineups
                </button>
            </div>


            {activeTab === 'events' && (
                <MatchEvents    
                    matchId={matchIdNumber}  
                    homeTeamId={matchData.homeTeamId} 
                    awayTeamId={matchData.awayTeamId} 
                />
            )}
            {activeTab === 'statistics' && (
                <MatchStatistics matchId={matchIdNumber} />
            )}
            {activeTab === 'lineups' && (
                <MatchLineUp matchId={matchIdNumber} />
            )}
        </div>
    );
};

export default MatchProfile;
