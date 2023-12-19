import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Notifications.css';

const NotificationsPanel = ({ loggedInEmployeeId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Make an API request to fetch the employee leaves data
        const response = await axios.get(`http://localhost:8000/api/leave`);
        const notificationsData = response.data;

        // Map the notifications data to the desired format or adjust the code based on the API response structure
        const mappedNotifications = notificationsData.map((notification) => ({
          id: notification.id,
          message: notification.message,
          date: notification.date,
        }));

        setNotifications(mappedNotifications);
      } catch (error) {
        console.error('Error occurred while fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [loggedInEmployeeId]);

  return (
    <div className="notifications-panel-container">
      <h1 className="notifications-heading">Notifications</h1>

      <table className="notifications-table">
        <thead>
          <tr>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification) => (
            <tr key={notification.id}>
              <td>{notification.message}</td>
              <td>{notification.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationsPanel;
