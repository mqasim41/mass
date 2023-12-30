const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/Authentication', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    const db = mongoose.connection;

    db.once('open', () => {
      console.log('Connected to MongoDB');
    });

    db.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    // Optionally, you can return the connection object if needed
    return db;
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
