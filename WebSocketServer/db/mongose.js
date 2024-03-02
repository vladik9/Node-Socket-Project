const mongoose = require('mongoose');

const userName = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

const url = `mongodb+srv://${userName}:${password}@ctmeproject.lbtx1xs.mongodb.net/?retryWrites=true&w=majority`;

const databaseIsReady = false;
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
  console.log("Successfully connected to MongoDB database!");
  console.log("##########################################");
  if (!databaseIsReady) databaseIsReady = true;
});

module.export = databaseIsReady;



//here will be methods to save
// const CTMEObject = mongoose.model('CTMEObject', { name: String });

// const newObject = new CTMEObject({ name: 'Zildjian' });
// newObject.save().then(() => console.log('\nSaved!!!\n'));