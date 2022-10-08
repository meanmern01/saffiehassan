const mongoose = require("mongoose");
const ResSchema = mongoose.Schema({
  User: String,
  Data: Object,
});

module.exports = mongoose.model("Response", ResSchema);
