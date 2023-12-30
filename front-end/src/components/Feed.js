import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const serverUrl = 'http://localhost:3001/user';
const socket = io(serverUrl, { auth: {token:'Test'} });
const cameraId = '1';

const Feed = () => {
  const [imageData, setImageData] = useState(null);
  const [highestLikelihoodObject, setHighestLikelihoodObject] = useState(null);

  useEffect(() => {
    const openFeed = async () => {
      try {
        socket.emit('get-feed', cameraId);
      } catch (error) {
        console.error('Error opening feed:', error);
      }
    };

    openFeed();

    socket.on(cameraId, (receivedData) => {
      
      
      // Destructure received data
      const { base64Image, objectsDetected } = receivedData;
      console.log(objectsDetected)
      // Find the object with the highest likelihood

      const highestLikelihoodObject = findHighestLikelihoodObject(objectsDetected);
      

      // Update state
      setImageData(base64Image);
      setHighestLikelihoodObject(highestLikelihoodObject.name);
    });
  }, []);

  // Function to find the object with the highest likelihood
  const findHighestLikelihoodObject = (objectsDetected) => {
    if (!objectsDetected || objectsDetected.length === 0) {
      return "No Object Detected";
    }

    // Assuming each object has a 'score' property indicating the likelihood
    return objectsDetected.reduce((maxObject, currentObject) => {
      return currentObject.score > maxObject.score ? currentObject : maxObject;
    }, objectsDetected[0]);
  };

  return (
    <div>
      {/* Display the image if imageData is available */}
      {imageData && (
        <div>
          <img
            src={`data:image/jpeg;base64,${imageData}`} // Assuming the image data is in base64 format
            alt="Received Image"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
          {/* Display the object with the highest likelihood */}
          {highestLikelihoodObject && (
            <p>Highest Likelihood Object: {highestLikelihoodObject}</p>
          )}
        </div>
      )}

      {/* Placeholder or loading message if no image data available */}
      {!imageData && <p>Loading image...</p>}
    </div>
  );
};

export default Feed;
