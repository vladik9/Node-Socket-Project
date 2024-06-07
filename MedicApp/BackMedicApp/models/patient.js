// models/Patient.js
const mongoose = require('mongoose');

// Define Patient schema
const patientSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d+$/, 'id  should contain only numbers.']
  },
  chanel1: {
    type: Array,
    required: true,
    minlength: 6
  },

  chanel2: {
    type: Array,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true
  },
  assignedMedicId: {
    type: String,
    required: true
  }
}, {
  timestamps: true, toJSON: {
    transform: function (doc, ret) {
      delete ret.password;
      return ret;
    }
  }, toObject: {
    transform: function (doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
