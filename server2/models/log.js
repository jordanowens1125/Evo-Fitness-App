const mongoose = require("mongoose");
const { Schema } = mongoose;

const LogSchema = new Schema({
  date: { type: String },
  officialDate: { type: Date },
  score: { type: Number },
  exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
});

module.exports = mongoose.model("Log", LogSchema);
