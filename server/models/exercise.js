const mongoose = require("mongoose");
const { Schema } = mongoose;

const ExerciseSchema = new Schema({
  name: { type: String, required: true, unique: true },
  segment: { type: String },
  // kind: { type: String },muscleGroup: { type: String },
  kind: {},
  muscleGroup: {},
  sets: {},
  details: {},
  defaultSets: {},
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
