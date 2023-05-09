const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String },
  uid: { type: String, },
  handle: { type: String, },
  age: { type: Number },
  weight: { type: Number },
  routines: [],
  log: [],
});

module.exports = mongoose.model("User", UserSchema);
