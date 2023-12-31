import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import Alert from './alert';

function AlertBox() {
  const [alerts, setAlerts] = useState([]);
  const [configurations, setConfigurations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const socket = io('http://localhost:3001', {
          auth: {
            token: 'Test',
          },
          
        });

        const response = await axios.get('http://localhost:3003/get-configs');
        setConfigurations(response.data.config);

        // Use Promise.all to wait for all socket.emit to complete
        await Promise.all(
          configurations.map((config) => {
            return new Promise((resolve) => {
              socket.emit('get-feed', config.cameraName, () => resolve());
            });
          })
        );

        socket.on('newAlert', (newAlert) => {
          setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className="bg-gray-900 mt-1 px-2" style={{ maxHeight: '20vw', overflowY: 'auto' }}>
      <h2 className="mb-2 text-orange-600" style={{ fontSize: '1.5rem' }}> Alerts </h2>
      {alerts.map((alert, index) => (
        <Alert key={index} data={alert} />
      ))}
    </div>
  );
}

export default AlertBox;
