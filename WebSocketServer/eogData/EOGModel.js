const mongoose = require("mongoose");

const eogObjectData = new mongoose.Schema({
  eogDataRow: { type: String, required: true, lowercase: true },
}
);

eogObjectData.methods.toJSON = function () {
  const data = this;
  const eogObject = data.toObject();
  return eogObject;
};

const eog = mongoose.model("eogDataModel", eogObjectData);

module.exports = eog;