// FeedContainer Component
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Feed from '../components/feed';

function FeedContainer() {
  const [cameraConfigurations, setCameraConfigurations] = useState([]);

  useEffect(() => {
    const fetchCameraConfigurations = async () => {
      try {
        const response = await axios.get('http://localhost:3003/get-configs');
        setCameraConfigurations(response.data.config);
      } catch (error) {
        console.error('Error fetching camera configurations:', error.message);
      }
    };

    fetchCameraConfigurations();
  }, []);

  return (
    <>
      <div className="row g-0">
        {cameraConfigurations.map((config, index) => (
          <div key={index} className="col-3">
            <Feed cameraId={config.cameraName} />
          </div>
        ))}
      </div>
    </>
  );
}

export default FeedContainer;
