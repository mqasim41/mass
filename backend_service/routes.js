const express = require('express');
const http = require('http');
const cors = require('cors');
const Module = require('./models/Module');
const VideoFrame = require('./models/VideoFrame.js').VideoFrame;
const connectDB = require('./config/db.js');
const { Alert } = require('./models/Alert.js');

const app = express();
const server = http.createServer(app);

// Configure CORS with specific options
// const corsOptions = {
//   origin: 'http://127.0.0.1:3000', // Specify the actual URL of your React app
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
//   optionsSuccessStatus: 204,
// };

  app.use(cors(
  {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'FETCH'], // Add other methods if needed
    credentials: true,        // Enable credentials 
  }));

//app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON bodies

connectDB();

app.get('/get-alerts', async (req, res) => {
  try {
    console.log("Request received on alerts");
    
    // Fetch the most recently created 10 alerts
    const alerts = await Alert.find().sort({ createdAt: -1 }).limit(10);

    res.json({ alerts });
  } catch (error) {
    console.error('Error fetching video frames:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/get-configs', async (req, res) => {
  try {
    console.log("Request received on config");
    
    
    const config = await Module.find();

    res.json({ config });
  } catch (error) {
    console.error('Error fetching video frames:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/get-frame/:id', async (req, res) => {
  try {
    const alertId = req.params.id;

    // Find the alert by ID
    const alert = await Alert.findById(alertId);
    if (!alert) {
      return res.status(404).json({ error: 'Alert not found' });
    }

    // Use the alert's ObjectId to find the associated frame
    const frame = await VideoFrame.findOne({ alert: alert._id });

    if (!frame) {
      return res.status(404).json({ error: 'Frame not found for the given alert' });
    }

    // Send the frame data in the response
    res.json({ frame });
  } catch (error) {
    console.error('Error fetching frame:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/refresh-token', async (req, res) => {
  // Your refresh-token logic here
});

// Configure
app.post('/configure', async (req, res) => 
{
  const { cameraName, cameraLocation } = req.body;

  try 
  {
    const existingCamera = await Module.findOne({ cameraName });
    // if (existingCamera) 
    // {
    //   return res.status(400).json({ message: 'Camera already exists' });
    // }

    const newModule = new Module({ cameraName, cameraLocation });
    await newModule.save();


    res.status(201).json({ cameraName, cameraLocation, message: 'Module registered successfully' });
  } 
  catch (error) 
  {
    res.status(500).json({ message: error.message });
  }
});


const port = 3003;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


