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
    muscleGroup: {
      name: "Chest",
      image: "",
    },
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
    muscleGroup: {
      name: "Back",
      image: "",
    },
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
    muscleGroup: {
      name: "Squads",
      image: "",
    },
  }),
  new Exercise({
    _id: new mongoose.Types.ObjectId("646e3d34e59b38d469b0741e"),
    name: "Planks",
    segment: "Core",
    kind: {
      name: "Time",
      details: { Time },
    },
    details: {
      Time: { name: "Time", units: "Seconds" },
    },
    detailsList: [Repetition, Weight],
    defaultSets: {
      Time: [0],
    },
    muscleGroup: {
      name: "Abs",
      exercises: [],
      color: "",
      image: "Image of Abs",
    },
  }),
];

module.exports = seedExercises;