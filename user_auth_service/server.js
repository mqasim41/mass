const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express(); 
const uri =
    'mongodb+srv://mqasim41:lA983MUT87GJCSEB@mass0.acsrwmt.mongodb.net/?retryWrites=true&w=majority';
// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => 
{
  // Middleware
  app.use(express.json());

  // Enable CORS for requests from 'http://localhost:3000'
  app.use(cors(
  {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'FETCH'], // Add other methods if needed
    credentials: true,        // Enable credentials 
  }));

  // Handle preflight OPTIONS requests for all routes
  app.options('*', cors());

  // Routes
  app.use('/api', authRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => 
  {
    console.log(`Server running on port ${PORT}`);
  });
})

.catch((err) => 
{
  console.error('MongoDB connection error:', err);
});
