const eogModel = require("./patientModel");

//set newData
const saveNewPatient = async (data) => {
  try {
    console.log(`From EOG controller  "${data}"`);
    // const newEogData = new eogModel({ eogDataRaw: data });
    // await newEogData.save();
  }

  catch (err) { console.log(err); }

};
module.exports = { saveNewPatient };
