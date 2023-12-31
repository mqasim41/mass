//const Navigate = useNavigate();
const express = require('express');
const User = require('../models/User');
const Module = require('../models/Module');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authController = require('../controllers/authController');

// Generate Access Token
const generateAccessToken = (userId) => 
{
  return jwt.sign({ userId }, 'yourAccessTokenSecretKey', { expiresIn: '15m' });
};

// Generate Refresh Token
const generateRefreshToken = (userId) => 
{
  return jwt.sign({ userId }, 'yourRefreshTokenSecretKey');
};

// Login
router.post('/login', async (req, res) => 
{
  const { username, password } = req.body;

  try 
  {
    const user = await User.findOne({ username });
    if (!user)
    {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) 
    {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Update the user's refresh token in the database
    user.refreshToken = refreshToken;
    await user.save();
    // sessionStorage.setItem('currentUser', user);
    // console.log(sessionStorage.getItem('currentUser');
    //res.status(200).json({ accessToken, refreshToken, message: 'Login successful' });

    res.cookie('refreshToken', refreshToken, 
    {
      httpOnly: true,
    });

    res.status(200).json(
    {
      message: 'Login successful',
      redirectTo: 'http://localhost:3000/dashboard'
    });
  } 
  catch (err) 
  {
    //res.status(500).json({ message: err.message });
    console.log(err.message);
  }
});

router.post('/users', authController.createUser);

// Register
router.post('/register', async (req, res) => 
{
  const { username, email, password } = req.body;

  try 
  {
    const existingUser = await User.findOne({ username });
    if (existingUser) 
    {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const accessToken = generateAccessToken(newUser._id);
    const refreshToken = generateRefreshToken(newUser._id);
    newUser.refreshToken = refreshToken;
    await newuser.save();

    res.status(201).json({ accessToken, refreshToken, message: 'User registered successfully' });
    //res.status(201).json({ message: 'User registered successfully' });
  } 
  catch (error) 
  {
    res.status(500).json({ message: error.message });
  }
});

// Configure
router.post('/configure', async (req, res) => 
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

// Token verification middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token is required' });
  }

  jwt.verify(token, 'secret', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

module.exports = router;
