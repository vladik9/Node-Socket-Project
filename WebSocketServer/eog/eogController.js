const eogModel = require("./eogModel");

//set newData
const saveEogData = async (data) => {
  try {
    console.log("From EOG controller " + data);
    const newEogData = new eogModel({ eogDataRaw: data });
    await newEogData.save();
  }

  catch (err) { console.log(err); }

};
module.exports = { saveEogData };



//here will be methods to save
// const CTMEObject = mongoose.model('CTMEObject', { name: String });

// const newObject = new CTMEObject({ name: 'Zildjian' });
// newObject.save().then(() => console.log('\nSaved!!!\n'));