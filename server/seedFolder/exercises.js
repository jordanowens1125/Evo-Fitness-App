const mongoose = require("mongoose");
const Exercise = require("../models/exercise");

const Weight = { name: "Weight", units: "Pounds (lb)" };
const Distance = { name: "Distance", units: "Miles" };
const Time = { name: "Time", units: "Seconds" };
const Repetition = { name: "Repetition", units: "" };

const seedExercises = [
  new Exercise({
    _id: new mongoose.Types.ObjectId("645ae2215a22a8ffb1eced8d"),
    name: "Pushups",
    segment: "Upper",
    kind: {
      name: "Weights/Reps",
      details: { Repetition, Weight },
    },
    details: {
      Repetition: { name: "Repetition", units: "", min: 1 },
      Weight: { name: "Weight", units: "Pounds (lb)" },
    },
    detailsList: [Repetition, Weight],
    defaultSets: { Repetition: [0], Weight: [0] },
  }),
  new Exercise({
    _id: new mongoose.Types.ObjectId("645ae2215a22a8ffb1eced8e"),
    name: "Pullups",
    segment: "Upper",
    kind: {
      name: "Weights/Reps",
      details: { Repetition, Weight },
    },
    details: {
      Repetition: { name: "Repetition", units: "", min: 1 },
      Weight: { name: "Weight", units: "Pounds (lb)" },
    },
    detailsList: [Repetition, Weight],
    defaultSets: { Repetition: [0], Weight: [0] },
  }),
  new Exercise({
    _id: new mongoose.Types.ObjectId("645ae2215a22a8ffb1eced8f"),
    name: "Squats",
    segment: "Lower",
    kind: {
      name: "Weights/Reps",
      details: { Repetition, Weight },
    },
    details: {
      Repetition: { name: "Repetition", units: "", min: 1 },
      Weight: { name: "Weight", units: "Pounds (lb)" },
    },
    detailsList: [Repetition, Weight],
    defaultSets: { Repetition: [0], Weight: [0] },
  }),
];

module.exports = seedExercises;