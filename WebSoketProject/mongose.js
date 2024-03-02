const mongoose = require('mongoose');

const userName = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

const url = `mongodb+srv://${userName}:${password}@ctmeproject.lbtx1xs.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(url);




const CTMEObject = mongoose.model('CTMEObject', { name: String });

const newObject = new CTMEObject({ name: 'Zildjian' });
newObject.save().then(() => console.log('\nSaved!!!\n'));