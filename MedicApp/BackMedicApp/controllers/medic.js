//this will hold rotes for users/medics that can view the data
const express = require('express');
const authMiddleware = require('../middleware/auth');
const Medic = require('../models/medic');
const app = express();
const router = express.Router();
const jwt = require('jsonwebtoken');
const tokenSecret = process.env.TOKEN_SECRET;
app.use(express.json());

// Registration endpoint
router.post('/register', async (req, res) => {
  const { medicId, password, name } = req.body;
  try {
    // Check if the medic already exists
    const existingMedic = await Medic.findOne({ medicId });
    if (existingMedic) {
      return res.status(400).json({ message: 'Medic already exists' });
    }

    // Create a new medic
    const newMedic = new Medic({
      medicId, password, name // This will be hashed by the pre-save hook in the Medic model
    });

    // Save the medic to the database
    await newMedic.save();
    // Respond with success message
    try {
      const token = jwt.sign({ medicId: newMedic.medicId }, tokenSecret);
      res.status(201).json({ message: 'Medic registered successfully', token: token });
    }
    catch (err) {
      console.log(err);
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

//login a medic endpoint
router.post('/login', async (req, res) => {
  const { medicId, password } = req.body;

  try {
    const medic = await Medic.findOne({ medicId });
    console.log(medic);

    if (!medic) {
      return res.status(400).json({ message: 'Invalid login info' });
    }

    const isPasswordValid = await medic.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid login info' });
    }

    const token = jwt.sign({ medicId: medic.medicId }, tokenSecret);
    res.json({ token, medic: medic });

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/logout', authMiddleware, (req, res) => {
  res.send(`Hello ${req.medic.medicId}, you have been log out.`);
});


module.exports = router;