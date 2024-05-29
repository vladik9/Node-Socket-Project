//this will hold rotes for user/ medics that can view the data
const express = require('express');
const authMiddleware = require('../middleware/auth');
const User = require('../models/user');
const app = express();
const router = express.Router();
const jwt = require('jsonwebtoken');
const tokenSecret = process.env.TOKEN_SECRET;
app.use(express.json());

// Registration endpoint
router.post('/register', async (req, res) => {
  const { medicId, password, name } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ medicId });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({
      medicId, password, name // This will be hashed by the pre-save hook in the User model
    });

    // Save the user to the database
    await newUser.save();
    // Respond with success message
    try {
      const token = jwt.sign({ medicId: newUser.medicId }, tokenSecret);
      res.status(201).json({ message: 'User registered successfully', token: token });
    }
    catch (err) {
      console.log(err);
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

//login a user endpoint
router.post('/login', async (req, res) => {
  const { medicId, password } = req.body;

  try {
    const user = await User.findOne({ medicId });

    if (!user) {
      return res.status(400).json({ message: 'Invalid login info' });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid login info' });
    }

    const token = jwt.sign({ medicId: user.medicId }, tokenSecret);
    res.json({ token });

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/logout', authMiddleware, (req, res) => {
  res.send(`Hello ${req.user.name}, you have been log out.`);
});


module.exports = router;