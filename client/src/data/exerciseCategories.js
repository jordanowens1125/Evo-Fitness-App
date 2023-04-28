// const Weight = "Weight";
// const Distance = "Distance";
// const Time = "Time";
// const Repetition = "Repetition";

const Weight = { name: "Weight", units: "Pounds (lb)" };
const Distance = { name: "Distance", units: "Miles" };
const Time = { name: "Time", units: "Seconds" };
const Repetition = { name: "Repetition", units: "" };

const kindsOfExercises = [
  {
    name: "Weights/Reps",
    details: { Repetition, Weight },
    detailsList: [Repetition, Weight],
    exercises: ["Pushups", "Pullups"],
    defaultSets: {
      Repetition: [0],
      Weight: [0],
    },
  },
  {
    name: "Distance/Time",
    details: { Distance, Time },
    detailsList: [Distance, Time],
    etc: ["Average Distance Over Time"],
    exercises: ["Jog"],
    defaultSets: {
      Distance: [0],
      Time: [0],
    },
  },
  {
    name: "Time",
    details: { Time },
    detailsList: [Time],
    exercises: [],
    defaultSets: {
      Time: [0],
    },
  },
  {
    name: "Weights/Distance",
    details: { Weight, Distance },
    detailsList: [Weight, Distance],
    exercises: [],
    defaultSets: {
      Distance: [0],
      Weight: [0],
    },
  },
  {
    name: "Reps/Distance",
    details: { Repetition, Distance },
    detailsList: [Repetition, Distance],
    exercises: [],
    defaultSets: {
      Repetition: [0],
      Distance: [0],
    },
  },
  {
    name: "Reps/Time",
    details: { Repetition, Time },
    detailsList: [Repetition, Time],
    exercises: [],
    defaultSets: {
      Repetition: [0],
      Time: [0],
    },
  },
  {
    name: "Weight",
    details: { Weight },
    detailsList: [Weight],
    exercises: [],
    defaultSets: {
      Weight: [0],
    },
  },
  {
    name: "Repetition",
    details: { Repetition },
    detailsList: [Repetition],
    exercises: [],
    defaultSets: {
      Repetition: [0],
    }
  },
  {
    name: "Distance",
    details: { Distance },
    detailsList: [Distance],
    exercises: [],
    defaultSets: {
      Distance: [0]
    }
  },
];

let exercises = [];
let exerciseItems = {};
kindsOfExercises.map((kind) => {
  if (kind.exercises.length > 0) {
    const exerciseObjects = kind.exercises.map((exercise) => {
      const kindOfExercise = kind;
      const exerciseObject = {
        name: exercise,
        kind: kind,
        details: kindOfExercise["details"],
        defaultSets: kindOfExercise.defaultSets,
      };
      exerciseItems[exercise] = exerciseObject;
      return {
        name: exercise,
        kind: kind,
        details: kindOfExercise["details"],
        defaultSets: kindOfExercise.defaultSets,
      };
    });
    exercises = [...exercises, ...exerciseObjects];
  }
  return 1;
});

module.exports = { kindsOfExercises, exercises, exerciseItems };
