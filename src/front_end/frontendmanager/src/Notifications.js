import React from 'react';
import './Notifications.css';

const NotificationsPanel = () => {
  // Dummy notifications data
  const notifications = [
    {
      id: 1,
      message: 'Leave Rejected',
      status: 'Rejected',
      date: '2023-06-22',
      reason: 'Insufficient leave balance',
    },
    {
      id: 2,
      message: 'Leave Accepted',
      status: 'Approved',
      date: '2023-06-21',
      reason: 'N/A',
    },
    {
      id: 3,
      message: 'Leave Accepted',
      status: 'Approved',
      date: '2023-06-21',
      reason: 'N/A',
    },
  ];

  return (
    <div className="notifications-panel-container">
      <h1 className="notifications-heading">Notifications</h1>

      <table className="notifications-table">
        <thead>
          <tr>
            <th>Message</th>
            <th>Reason</th>
            <th>Date</th>
            {/* <th>Status</th> */}
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification) => (
            <tr key={notification.id}>
              <td>{notification.message}</td>
              {/* <td>{notification.status}</td> */}
              <td>{notification.reason}</td>
              <td>{notification.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationsPanel;
