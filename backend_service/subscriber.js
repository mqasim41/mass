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
const mqttBroker = 'mqtt://34.122.153.163';
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
    mqttClient.subscribe(mqttTopic, { qos: 2 }); // Adjust the QoS value

  }
});


mqttClient.on('message', (topic, message) => {
  // Convert the binary data to Base64
  const base64Image = message.toString('base64');

  // Log the Base64-encoded data (optional)
  console.log('Received Base64-encoded image:', base64Image);

  // Broadcast the Base64-encoded image to all connected clients
  io.emit('image', base64Image);
});



const port = 3001;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
