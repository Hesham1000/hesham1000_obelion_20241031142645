import React, { useState, useEffect } from 'react';
import './Notification.css';
import axios from 'axios';

const Notification = () => {
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpcomingTasks = async () => {
      try {
        const response = await axios.get('https://fast_todoApp-backend.cloud-stacks.com/api/notifications/upcoming', {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setUpcomingTasks(response.data.upcomingTasks);
      } catch (error) {
        setError('Failed to load upcoming tasks');
      }
    };

    fetchUpcomingTasks();
  }, []);

  return (
    <div className="notification-container">
      {error ? (
        <p>{error}</p>
      ) : upcomingTasks.length > 0 ? (
        <ul>
          {upcomingTasks.map(task => (
            <li key={task.id} className="notification-item">
              <span className="notification-title">{task.title}</span>
              <span className="notification-date">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming due dates</p>
      )}
    </div>
  );
};

export default Notification;
