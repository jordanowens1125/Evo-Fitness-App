// const Weight = "Weight";
// const Distance = "Distance";
// const Time = "Time";
// const Repetition = "Repetition";

const Weight = { name: "Weight", units: "Pounds (lb)" };
const Distance = { name: "Distance", units: "Miles" };
const Time = { name: "Time", units: "Seconds" };
const Repetition = { name: "Repetition", units: "" };

const kindsOfExercises = {
  "Weights/Reps": {
    details: { Repetition, Weight },
    detailsList: [Repetition, Weight],
    exercises: ["Pushups", "Pullups"],
    defaultSets: {
      Repetition: [0],
      Weight: [0],
    },
  },
  "Distance/Time": {
    details: { Distance, Time },
    detailsList: [Distance, Time],
    etc: ["Average Distance Over Time"],
    exercises: ["Jog"],
    defaultSets: {
      Distance: [0],
      Time: [0],
    },
  },
  Time: {
    details: { Time },
    detailsList: [Time],
    exercises: [],
    // defaultSets: {
    //   Repetition: [0],
    //   Weight: [0]
    // }
  },
  "Weights/Distance": {
    details: { Weight, Distance },
    detailsList: [Weight, Distance],
    exercises: [],
    // defaultSets: {
    //   Repetition: [0],
    //   Weight: [0]
    // }
  },
  "Reps/Distance": {
    details: { Repetition, Distance },
    detailsList: [Repetition, Distance],
    exercises: [],
    // defaultSets: {
    //   Repetition: [0],
    //   Weight: [0]
    // }
  },
  "Reps/Time": {
    details: { Repetition, Time },
    detailsList: [Repetition, Time],
    exercises: [],
  },
  Weight: {
    details: { Weight },
    detailsList: [Weight],
    exercises: [],
  },
  Reps: {
    details: { Repetition },
    detailsList: [Repetition],
    exercises: [],
  },
  Distance: {
    details: { Distance },
    detailsList: [Distance],
    exercises: [],
  },
};

let exercises = [];
let exerciseItems = {};
Object.keys(kindsOfExercises).forEach(function (key) {
  if (kindsOfExercises[key].exercises.length > 0) {
    const exerciseObjects = kindsOfExercises[key].exercises.map((exercise) => {
      const kindOfExercise = kindsOfExercises[key];
      const exerciseObject = {
        name: exercise,
        kind: key,
        details: kindOfExercise["details"],
        defaultSets: kindOfExercise.defaultSets,
      };
      exerciseItems[exercise] = exerciseObject;
      return {
        name: exercise,
        kind: key,
        details: kindOfExercise["details"],
        defaultSets: kindOfExercise.defaultSets,
      };
    });
    exercises = [...exercises, ...exerciseObjects];
  }
});

module.exports = { kindsOfExercises, exercises, exerciseItems };
