const mongoose = require('mongoose');
const User = require('./models/User'); // Import the User model

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Authentication', 
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create and save a user
const newUser = new User({
  username: 'abc',
  email: 'abc@abc.com',
  password: 'abc',
  // Other fields as needed
});

newUser.save()
  .then(savedUser => {
    console.log('User saved:', savedUser);
    mongoose.connection.close(); // Close the connection after seeding
  })
  .catch(error => {
    console.error('Error saving user:', error);
  });
