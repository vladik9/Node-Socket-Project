//this will hold rotes for users/medics that can view the data
const express = require('express');
const authMiddleware = require('../middleware/auth');
const Patient = require('../models/patient');
const Medic = require('../models/medic');
const app = express();
const router = express.Router();

app.use(express.json());

//add new patients no need for auth
router.post('/register', async (req, res) => {
  const { patientId, dataSeriesOne, dataSeriesTwo } = req.body;

  try {
    const newPatient = new Patient({
      patientId, dataSeriesOne, dataSeriesTwo
    });
    await newPatient.save();
    res.status(201).json({ message: 'Patient registered successfully', patientId });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

//search for new patients
router.get('/search/:id', authMiddleware, async (req, res) => {
  console.log("MyGet");
  const patientId = req.params.id;
  try {
    const existingPatient = await Patient.findOne({ patientId: patientId });
    if (!existingPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.send({ message: 'Patient info', existingPatient });
  } catch (error) {
    console.log(error);
  }

});

// search for new patient based on id provided

router.get('/search/new/:medicId/:patientId', authMiddleware, async (req, res) => {
  const { patientId, medicId } = req.params;
  try {
    const patient = await Patient.findOne({ patientId: patientId });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    //call medic endpoint to update assignedPatients it there
    const medic = await Medic.findOne({ medicId: medicId });
    if (!medic) {
      return res.status(404).json({ message: 'Medic not found' });
    }
    medic.assignedPatients.push(patientId);
    console.log(medic);
    await medic.save();
    res.send({ message: 'Patient added to medic list' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});






module.exports = router;