const eog = require("./EOGModel");

//set newData
const saveEogData = async (data) => {
  console.log("From EOG controller " + data);


};
module.exports = { saveEogData };



//here will be methods to save
// const CTMEObject = mongoose.model('CTMEObject', { name: String });

// const newObject = new CTMEObject({ name: 'Zildjian' });
// newObject.save().then(() => console.log('\nSaved!!!\n'));