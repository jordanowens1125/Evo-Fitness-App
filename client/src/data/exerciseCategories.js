const Weight = 'Weight'
const Distance = 'Distance'
const Time = 'Time'
const Repetition= 'Repetition'

const kindsOfExercises = {
  "Weights/Reps": {
    details: [Repetition, Weight],
    exercises: ["Pushups", "Pullups"],
    units: "Pounds",
    defaultSets: {
      Repetition: [1],
      Weight: [0],
    },
  },
  "Distance/Time": {
    details: [Distance, Time, ],
    etc:["Average Distance Over Time"],
    exercises: ["Jog"],
    units: "Miles",
    defaultSets: {
      Distance: [1],
      Time: [0],
    },
  },
  Time: {
    details: [Time],
    exercises: [],
    // defaultSets: {
    //   Repetition: [1],
    //   Weight: [0]
    // }
  },
  "Weights/Distance": {
    details: [Weight, Distance],
    exercises: [],
    // defaultSets: {
    //   Repetition: [1],
    //   Weight: [0]
    // }
  },
  "Reps/Distance": {
    details: [Repetition, Distance],
    exercises: [],
    // defaultSets: {
    //   Repetition: [1],
    //   Weight: [0]
    // }
  },
  "Reps/Time": {
    details: [Repetition,Time],
    exercises: [],
  },
  Weight: {
    details: [Weight],
    exercises: [],
  },
  Reps: {
    details: [Repetition],
    exercises: [],
  },
  Distance: {
    details: [Distance],
    exercises: [],
  },
};

let exercises = []

Object.keys(kindsOfExercises).forEach(function (key) {
  if (kindsOfExercises[key].exercises.length > 0) {
    const exerciseObjects = kindsOfExercises[key].exercises.map((exercise) => {
    return {
      name: exercise,
      kind: key,
      units: kindsOfExercises[key].units,
    };
  });
  exercises = [...exercises, ...exerciseObjects];
  }
});

module.exports = {kindsOfExercises, exercises}
