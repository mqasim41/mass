// AlertList.js
import React, { useState, useEffect } from 'react';

const AlertList = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [selectedFrame, setSelectedFrame] = useState(null);

  useEffect(() => {
    // Fetch alerts when the component mounts
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await fetch('http://localhost:3003/get-alerts');
      const data = await response.json();
      setAlerts(data.alerts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching alerts:', error.message);
      setLoading(false);
    }
  };

  const handleAlertClick = async (alertId) => {
    try {
      // Fetch the associated frame when an alert is clicked
      const response = await fetch(`http://localhost:3003/get-frame/${alertId}`);
      const data = await response.json();

      // Update state with selected alert and frame
      setSelectedAlert(alerts.find((alert) => alert._id === alertId));
      setSelectedFrame(data.frame);
    } catch (error) {
      console.error('Error fetching frame:', error.message);
    }
  };

  return (
    <div>
      <h2>Alerts List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {alerts.map((alert) => (
            <li key={alert._id} onClick={() => handleAlertClick(alert._id)}>
              <strong>{alert.camera}</strong>: {alert.message}
            </li>
          ))}
        </ul>
      )}

      {selectedAlert && (
        <div>
          <h3>Selected Alert</h3>
          <p>
            <strong>Camera:</strong> {selectedAlert.camera}
          </p>
          <p>
            <strong>Message:</strong> {selectedAlert.message}
          </p>
        </div>
      )}

      {selectedFrame && (
        <div>
          <h3>Associated Frame</h3>
          {/* Display frame information as needed */}
          {/* Example: */}
          <img src={`data:image/jpeg;base64,${selectedFrame.image}`} alt="Associated Frame" />
        </div>
      )}
    </div>
  );
};

export default AlertList;
