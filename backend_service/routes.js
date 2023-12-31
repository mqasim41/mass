const express = require('express');
const http = require('http');
const cors = require('cors');
const VideoFrame = require('./models/VideoFrame.js').VideoFrame;
const { DBConnect } = require('./database/database.js');
const { Alert } = require('./models/Alert.js');

const app = express();
const server = http.createServer(app);

// Configure CORS with specific options
const corsOptions = {
  origin: '*', // Allow requests from any origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};


app.use(cors(corsOptions));

DBConnect();

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

const port = 3003;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
