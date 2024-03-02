const eogModel = require("./eogModel");

//set newData
const saveEogData = async (data) => {
  try {
    console.log(`From EOG controller  "${data}"`);
    const newEogData = new eogModel({ eogDataRaw: data });
    await newEogData.save();
  }

  catch (err) { console.log(err); }

};
module.exports = { saveEogData };
