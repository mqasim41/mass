const express = require('express');
const http = require('http');
const path = require('path');
const mqtt = require('mqtt');
const base64js = require('base64-js');
const cors = require('cors'); // Import the cors middleware

// ...

const app = express();
app.use(cors());
const server = http.createServer(app);

// Use cors middleware
app.use(cors());

// MQTT broker settings
const mqttBroker = 'mqtt://34.28.62.241';
const mqttTopic = 'toImageTopic'; // Adjust to match the ESP32 topic

const mqttClient = mqtt.connect(mqttBroker);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
  mqttClient.subscribe(mqttTopic);
});

const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

let connectedClients = 0;

io.on('connection', (socket) => {
  console.log('Client connected');
  connectedClients++;

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    connectedClients--;

    if (connectedClients === 0) {
      mqttClient.unsubscribe(mqttTopic);
    }
  });

  if (connectedClients === 1) {
    mqttClient.subscribe(mqttTopic);
  }
});


mqttClient.on('message', (topic, message) => {
  // Assuming the received message is Base64-encoded
  const base64String = message.toString('utf8');

  // Decode Base64 to binary
  const binaryData = base64js.toByteArray(base64String);

  // Assuming the message is an image buffer
  const imageBuffer = Buffer.from(binaryData);
  console.log('Received image buffer:', binaryData);

  // Broadcast the image buffer to all connected clients
  io.emit('image', imageBuffer.toString('base64'));
});


const port = 3001;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
