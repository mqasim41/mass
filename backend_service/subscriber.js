const express = require('express');
const http = require('http');
const path = require('path');
const mqtt = require('mqtt');

const app = express();
const server = http.createServer(app);

// MQTT broker settings
const mqttBroker = 'mqtt://localhost'; // Update with your MQTT broker address
const mqttTopic = 'toimageTopic';

// Set up MQTT client
const mqttClient = mqtt.connect(mqttBroker);

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Initialize MQTT subscriber
mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
  mqttClient.subscribe(mqttTopic);
});

// WebSocket and image streaming logic
const io = require('socket.io')(server);
let connectedClients = 0;

// Handle new WebSocket connections
io.on('connection', (socket) => {
  console.log('Client connected');
  connectedClients++;

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    connectedClients--;

    // If no clients are connected, stop MQTT subscription
    if (connectedClients === 0) {
      mqttClient.unsubscribe(mqttTopic);
    }
  });

  // If it's the first connected client, start MQTT subscription
  if (connectedClients === 1) {
    mqttClient.subscribe(mqttTopic);
  }
});

// Handle MQTT messages
mqttClient.on('message', (topic, message) => {
  // Assuming the message is an image buffer
  const imageBuffer = Buffer.from(message);
  console.log('Received image buffer:', imageBuffer);

  // Broadcast the image buffer to all connected clients
  io.emit('image', imageBuffer.toString('base64'));
});

// Start the server
const port = 3001; // Update with your desired port
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
