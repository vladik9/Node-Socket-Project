const mongoose = require('mongoose');

const medicName = process.env.MONGO_MEDIC_ID;
const password = process.env.MONGO_PASSWORD;
const connectionString = process.env.MONGO_CONNECTION_STRING;

const url = `mongodb+srv://${medicName}:${password}${connectionString}`;

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
  console.log(`Connected to database with medic : ${medicName}`);
  console.log("##########################################");

});




