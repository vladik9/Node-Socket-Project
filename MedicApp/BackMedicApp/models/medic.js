const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define Medic schema
const medicSchema = new mongoose.Schema({
  medicId: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d+$/, 'id should contain only numbers.']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true
  },
  assignedPatients: {
    type: Array,
    required: false
  },
  token: {
    type: Array,
    required: false,
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      delete ret.password;
      return ret;
    }
  },
  toObject: {
    transform: function (doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});

// Hash the password before saving the medic model
medicSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
medicSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Medic = mongoose.model('Medic', medicSchema);

module.exports = Medic;
