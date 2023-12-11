const axios = require('axios');
const mqtt = require('mqtt');

// Configuration
const imageDownloadUrl = 'https://picsum.photos/200/300'; // Replace with your image URL
const brokerUrl = 'mqtt://localhost:1883'; // Replace with your MQTT broker URL
const mqttTopic = 'toimageTopic'; // Replace with your MQTT topic
const publishInterval = 500; // Publish an image every 5 seconds (adjust as needed)

// Function to download the image
async function downloadImage() {
  try {
    const response = await axios.get(imageDownloadUrl, { responseType: 'arraybuffer' });
    return response.data;
  } catch (error) {
    throw new Error(`Error downloading image: ${error.message}`);
  }
}

// Connect to MQTT broker
const client = mqtt.connect(brokerUrl);

client.on('connect', () => {
  console.log('Connected to MQTT broker');

  // Function to publish image
  const publishImage = async () => {
    try {
      const imageBuffer = await downloadImage();
      // Publish the image buffer to the specified MQTT topic
      client.publish(mqttTopic, imageBuffer);
      console.log('Image published to MQTT');
    } catch (error) {
      console.error(error.message);
    }
  };

  // Set up interval to publish images
  const publishIntervalId = setInterval(publishImage, publishInterval);

  // Stop publishing after a certain duration (e.g., 60 seconds)
  setTimeout(() => {
    clearInterval(publishIntervalId);
    client.end(); // Close the MQTT connection after publishing
    console.log('Image publishing stopped');
  }, 60000); // Adjust the duration as needed
});

client.on('error', (error) => {
  console.error('MQTT Connection Error:', error);
});
