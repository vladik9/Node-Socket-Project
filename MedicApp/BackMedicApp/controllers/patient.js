//this will hold rotes for users/medics that can view the data
const express = require('express');
const authMiddleware = require('../middleware/auth');
const Patient = require('../models/patient');
const app = express();
const router = express.Router();

app.use(express.json());


router.get('/search/:id', authMiddleware, async (req, res) => {

  try {
    //TODO: to remove this as temp solution
    const data = getPatientData(req.params.id);
    res.send({ patientData: data });

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }


  // try {
  //   const patient = await Patient.findOne({ patientId: req.params.id });
  //   if (!patient) {
  //     return res.status(404).json({ message: 'Patient not found' });
  //   }
  //   res.send(patient);
  // } catch (error) {
  //   res.status(500).json({ message: 'Internal server error' });
  // }
});
const getPatientData = (patientId) => {
  const patientsData = {
    12345678: [1.0, 3.5, 7.2, 6.8, 4.4, 9.1, 2.9, 5.3, 8.0, 1.6, 6.7, 3.2, 7.2, 6.8, 4.4, 9.1, 2.9, 5.3, 8.0],
    87654321: [1.0, 3.5, 7.2, 6.8, 4.4, 9.1, 2.9, 5.3, 8.0, 1.6, 6.7, 3.2, 7.2, 6.8, 4.4, 9.1, 2.9, 5.3, 8.0, 1.0, 3.5, 7.2, 6.8, 4.4, 9.1, 2.9, 5.3, 8.0, 1.6, 6.7, 3.2, 7.2, 6.8, 4.4, 9.1, 2.9, 5.3, 8.0],
    23456789: [2.3, 4.8, 9.0, 36, 7.2, 6.8, 4.4, 9.1, 2.9, 5.3, 8.0, 7.1, 3.7, 8.2, 5.6, 2.4, 6.3, 1.9, 5.4, 3.8],
    98765432: [7.2, 6.8, 4.4, 9.1, 2.9, 5.3, 8.0, 3.4, 2.2, 6.5, 9.3, 4.1, 7.7, 5.1, 3.0, 8.6, 2.5, 6.1, 4.7],
    34567890: [1.8, 5.9, 3.6, 8.4, 4.9, 7.5, 6.2, 3.3, 9.7, 7.2, 6.8, 4.4, 9.1, 2.9, 5.3, 8.0, 2.7, 5.7, 3.9],
  };

  return patientsData[patientId] || null;
};

module.exports = router;