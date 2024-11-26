import React from 'react';
import './TransfersTable.css';

const TransfersTable = ({ transfers }) => {
  // Ensure transfers is valid and has data
  if (!transfers || transfers.length === 0) {
    return <p>No transfer history available.</p>;
  }

  return (
    <div className="transfers-table">
      <h3>Transfer History</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Transfer Type</th>
            <th>In Team</th>
            <th>Out Team</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map((transfer, index) => (
            <tr key={index}>
              <td>{transfer.date || 'Unknown'}</td>
              <td>{transfer.type || 'Unknown'}</td>
              <td>
                <div className="team-name">
                  {transfer.teams?.in?.logo && (
                    <img
                      src={transfer.teams.in.logo}
                      alt={transfer.teams.in.name}
                      className="team-logo"
                    />
                  )}
                  {transfer.teams?.in?.name || 'Unknown'}
                </div>
              </td>
              <td>
                <div className="team-name">
                  {transfer.teams?.out?.logo && (
                    <img
                      src={transfer.teams.out.logo}
                      alt={transfer.teams.out.name}
                      className="team-logo"
                    />
                  )}
                  {transfer.teams?.out?.name || 'Unknown'}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransfersTable;
