import React from 'react';
import './Leavehistory.css';

const LeaveHistory = () => {
  // Dummy leave history data
  const leaveHistoryData = [
    {
      leaveType: 'Sick Leave',
      dateFrom: '2023-06-01',
      dateTo: '2023-06-05',
      numberOfDays: 5,
      managerStatus: 'Approved',
      hrStatus: 'Approved',
    },
    {
      leaveType: 'Casual Leave',
      dateFrom: '2023-06-02',
      dateTo: '2023-06-07',
      numberOfDays: 6,
      managerStatus: 'Approved',
      hrStatus: 'Approved',
    },
    {
      leaveType: 'Sick Leave',
      dateFrom: '2023-06-10',
      dateTo: '2023-06-12',
      numberOfDays: 3,
      managerStatus: 'Rejected',
      hrStatus: 'Pending',
    },
    // Add more leave history data entries
  ];

  return (
    <div className="leave-history-container">
      <h1 className="welcome-heading">Welcome Back, Employee</h1>

      <table className="leave-history-table">
        <thead>
          <tr>
            <th>Leave Type</th>
            <th>Date From</th>
            <th>Date To</th>
            <th>Number of Days</th>
            <th>Manager Status</th>
            <th>HR Status</th>
          </tr>
        </thead>
        <tbody>
          {leaveHistoryData.map((historyItem, index) => (
            <tr key={index}>
              <td>{historyItem.leaveType}</td>
              <td>{historyItem.dateFrom}</td>
              <td>{historyItem.dateTo}</td>
              <td>{historyItem.numberOfDays}</td>
              <td>{historyItem.managerStatus}</td>
              <td>{historyItem.hrStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveHistory;
