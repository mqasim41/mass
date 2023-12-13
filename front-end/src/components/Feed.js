import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Use the correct server URL

const Feed = () => {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    // Add your WebSocket event listeners here
    socket.on('image', (receivedImageData) => {
      // Handle the received image data (update state, display the image, etc.)
      setImageData(receivedImageData);
    });

    // Clean up when the component is unmounted
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      {/* Display the image if imageData is available */}
      {imageData && (
        <img
          src={`data:image/jpeg;base64,${imageData}`} // Assuming the image data is in base64 format
          alt="Received Image"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      )}

      {/* Placeholder or loading message if no image data available */}
      {!imageData && <p>Loading image...</p>}
    </div>
  );
};

export default Feed;
