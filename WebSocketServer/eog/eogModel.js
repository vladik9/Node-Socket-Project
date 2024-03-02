const mongoose = require("mongoose");

const eogObjectSchema = new mongoose.Schema({
  eogDataRaw: { type: String, required: true, lowercase: true },
}
);

eogObjectSchema.methods.toJSON = function () {
  const data = this;
  const eogObject = data.toObject();
  return eogObject;
};

const eogModel = mongoose.model("eogTable", eogObjectSchema);

module.exports = eogModel;