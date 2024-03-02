//getting network ip address
require('../network/network');

//reading .env files
const dotenv = require('dotenv');
dotenv.config();

//connection to mongo db
// require('./mongodb');
require('../db/mongoose');
//saving local port variable from .env or default

const getCurrentTimeFormat = () => {
  const date = new Date();
  return date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    year: 'numeric'
  });
};



const PORT = process.env.PORT || 8080;
module.exports = { PORT, getCurrentTimeFormat };