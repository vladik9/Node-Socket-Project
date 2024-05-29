const mongoose = require('mongoose');

const userName = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const connectionString = process.env.MONGO_CONNECTION_STRING;

const url = `mongodb+srv://${userName}:${password}${connectionString}`;

//connect using connection string to mongodb
mongoose.connect(url);
//create a connection variable to check status
const db = mongoose.connection;
//on error
db.on('error', console.error.bind(console, 'connection error:'));
//on connection ok!
db.once('open', function () {
  // we're connected!
  console.log("\n##########################################");
  console.log(`Connected to database with user : ${userName}`);
  console.log("##########################################");

});




