import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from './alert';

function AlertBox() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get('http://your-server-url/get-alerts');
        setAlerts(response.data.alerts);
      } catch (error) {
        console.error('Error fetching alerts:', error.message);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <div className="bg-gray-900 mt-1 px-2" style={{ maxHeight: '20vw', overflowY: 'auto' }}>
      <h2 className="mb-2 text-orange-600" style={{ fontSize: '1.5rem' }}> Alerts </h2>
      {alerts.map((alert) => (
        <Alert
          key={alert._id} // Assuming your alert object has a unique identifier like '_id'
          message={alert.message}
          cameraNumber={alert.camera}
        />
      ))}
    </div>
  );
}

export default AlertBox;
