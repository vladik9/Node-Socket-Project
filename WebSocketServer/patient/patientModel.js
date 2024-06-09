const mongoose = require('mongoose');

// Define Patient schema
const patientSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d+$/, 'id should contain only numbers.']
  },
  dataSeriesOne: {
    type: Array,
    required: true,
    validate: {
      validator: function (array) {
        return array.length >= 6;
      },
      message: 'Data should contain at least 6 elements.'
    }
  },
  dataSeriesTwo: {
    type: Array,
    required: true,
    validate: {
      validator: function (array) {
        return array.length >= 6;
      },
      message: 'Data should contain at least 6 elements.'
    }
  },

}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      // Adjust this if there are specific fields to remove
      delete ret.password;
      return ret;
    }
  },
  toObject: {
    transform: function (doc, ret) {
      // Adjust this if there are specific fields to remove
      delete ret.password;
      return ret;
    }
  }
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;