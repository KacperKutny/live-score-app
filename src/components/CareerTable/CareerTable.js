import React from 'react';
import './CareerTable.css';

const CareerTable = ({ careerData }) => {
    if (!careerData || careerData.length === 0) {
      return <p>No career data available.</p>;
    }
  
    return (
      <table>
        <thead>
          <tr>
            <th>Season</th>
            <th>Team</th>
            <th>Competition</th>
            <th>Appearances</th>
            <th>Goals</th>
          </tr>
        </thead>
        <tbody>
          {careerData.map(({ season, teams }) =>
            teams.map(({ id, name, logo, statistics }) =>
              statistics.map(stat => (
                <tr key={`${season}-${id}-${stat.league.name}`}>
                  <td>{season}</td>
                  <td>
                    <img src={logo} alt={`${name} logo`} width={20} />
                    {name}
                  </td>
                  <td>{stat.league?.name || 'Unknown Competition'}</td>
                  <td>{stat.games?.appearences || 0}</td>
                  <td>{stat.goals?.total || 0}</td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
    );
  };
  
  export default CareerTable;
  
