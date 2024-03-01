//getting network ip address
require('./network');

//reading .env files
const dotenv = require('dotenv');
dotenv.config();

//connection to mongo db
require('./mongodb');
//saving local port variable from .env or default

const PORT = process.env.PORT || 8080;
module.exports = PORT;