const kindsOfExercises = {
  "Weights/Reps": {
    details: ["Repetition", "Weight"],
    exercises: ["Pushups", "Pullups"],
    units: "Pounds",
    defaultSets: {
      Repetition: [1],
      Weight: [0],
    },
  },
  "Distance/Time": {
    details: ["Distance", "Time", "Average Distance Over Time"],
    etc:[],
    
    exercises: ["Jog"],
    units: "Miles",
    defaultSets: {
      Distance: [1],
      Time: [0],
    },
  },
  Time: {
    details: ["Time"],
    exercises: [],
    // defaultSets: {
    //   Repetition: [1],
    //   Weight: [0]
    // }
  },
  "Weights/Distance": {
    details: [],
    exercises: [],
    // defaultSets: {
    //   Repetition: [1],
    //   Weight: [0]
    // }
  },
  "Reps/Distance": {
    details: [],
    exercises: [],
    // defaultSets: {
    //   Repetition: [1],
    //   Weight: [0]
    // }
  },
  "Reps/Time": {
    details: [],
    exercises: [],
  },
  Weight: {
    details: [],
    exercises: [],
  },
  Reps: {
    details: [],
    exercises: [],
  },
  Distance: {
    details: [],
    exercises: [],
  },
};

const exercises = [
  {

  },
  
]

module.exports = {kindsOfExercises}
