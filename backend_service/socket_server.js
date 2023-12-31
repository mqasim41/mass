const VideoFrame = require('./models/VideoFrame.js').VideoFrame;
const Alert = require('./models/Alert.js').Alert;
const { connectDB } = require('./config/db.js');
const express = require('express');
const app = express();
const vision = require('@google-cloud/vision');
const base64js = require('base64-js');
const cors = require('cors');
const mqtt = require('mqtt');
const { createCanvas, loadImage } = require('canvas');

const visionClient = new vision.ImageAnnotatorClient({
  keyFilename: 'mass.json', // Replace with your keyfile path
});

connectDB();

const mqttBroker = 'mqtt://34.28.207.68';

const mqttClient = mqtt.connect(mqttBroker);

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
  mqttClient.subscribe('1');
});

const io = require('socket.io')(3001, {
  cors: {
    origin: ['http://localhost:3000'],
  },
});

app.use(cors());
const userIo = io.of('/user');

userIo.on('connection', (socket) => {
  socket.on('get-feed', (cameraId) => {
    socket.join(cameraId);
  });
});

userIo.use((socket, next) => {
  if (socket.handshake.auth.token == 'Test') {
    socket.username = 'Qasim';
    next();
  } else {
    next(new Error('Please Provide An Authentication Token'));
  }
});

const findHighestLikelihoodObject = (objectsDetected) => {
  if (!objectsDetected || objectsDetected.length === 0) {
    return "No Object Detected";
  }

  return objectsDetected.reduce((maxObject, currentObject) => {
    return currentObject.score > maxObject.score ? currentObject : maxObject;
  }, objectsDetected[0]);
};

const annotateImage = async (base64Image, objectsDetected) => {
  try {
    // Draw bounding boxes
    const canvas = createCanvas(640, 480); // Adjust canvas size as needed
    const ctx = canvas.getContext('2d');
    const image = await loadImage(`data:image/jpeg;base64,${base64Image}`);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;

    objectsDetected.forEach((obj) => {
      const [topLeft, topRight, bottomRight, bottomLeft] = obj.bound.normalizedVertices;
      const startX = topLeft.x * canvas.width;
      const startY = topLeft.y * canvas.height;
      const width = (topRight.x - topLeft.x) * canvas.width;
      const height = (bottomRight.y - topRight.y) * canvas.height;

      ctx.strokeRect(startX, startY, width, height);
    });

    // Convert canvas to base64 image
    const annotatedImageBase64 = canvas.toDataURL().split(',')[1];
    return annotatedImageBase64;
  } catch (error) {
    console.error('Error during image annotation:', error.message);
  }
};

mqttClient.on('message', async (topic, message) => {
  try {
    const base64Image = message.toString('base64');
    const [result] = await visionClient.objectLocalization({
      image: { content: base64Image },
    });

    const objectsDetected = result.localizedObjectAnnotations.map((obj) => ({
      name: obj.name,
      bound: obj.boundingPoly,
    }));

    const annotatedImage = await annotateImage(base64Image, objectsDetected);

    if (findHighestLikelihoodObject(objectsDetected).name === 'Person') {
      let alert = new Alert({
        camera: "1",
        message: 'A Person Has Been Detected',
      });

      await alert.save();

      const frame = new VideoFrame({
        user: "1",
        camera: "1",
        image: base64Image,
        alert: alert._id,
      });

      await frame.save();

      // Backend setup: Emit notification to the frontend
      const notificationData = 
      {
        message: 'A Person Has Been Detected',
        cameraId: '1',
        frameUrl: frame.url, // Include the URL of the video frame
        alertId: alert._id,
      };
      socket.emit('newAlert', notificationData);
    }

    userIo.to(topic).volatile.emit(topic, { base64Image: annotatedImage, objectsDetected });
  } catch (error) {
    console.error('Error during object detection:', error.message);
  }
});