let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
});

module.exports = recipientSchema;
