const User = require('../models/User'); // Import the User model

// Function to handle user creation
const createUser = async (req, res) => 
{
  const { username, email, password } = req.body;

  try 
  {
    const newUser = new User({
      username,
      email,
      password,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } 
  catch (error) 
  {
    res.status(500).json({ error: error.message });
  }
};

module.exports = 
{
  createUser,
};
