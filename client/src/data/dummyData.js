import { exerciseObjectsWithAllInfo } from "./bodySegments";

const byDay = [
  {
    date: "03-01-2023",
    score: 10,
    exercises: [
      {
        exercise: exerciseObjectsWithAllInfo['Pullups'],
        sets: {
          Repetition: [520, 14, 2],
          Weight: [15, 0, 0],
        },
      },
      {
        exercise: exerciseObjectsWithAllInfo["Pushups"],
        sets: {
          Repetition: [5, 9],
          Weight: [15, 1],
        },
      },
    ],
  },
  {
    date: "03-09-2023",
    score: 10,
    exercises: [
      {
        exercise: exerciseObjectsWithAllInfo["Pullups"],
        sets: {
          Repetition: [1020, 9],
          Weight: [5, 7],
        },
      },
    ],
  },
  {
    date: "03-10-2023",
    score: 10,
    exercises: [
      {
        exercise: exerciseObjectsWithAllInfo["Pushups"],
        sets: {
          Repetition: [10, 9],
          Weight: [5, 7],
        },
      },
    ],
  },
  {
    date: "03-11-2023",
    score: 10,
    // weight: {
    //   value: 180,
    //   units: 'metric'
    // },
    weight: 10,
    exercises: [
      {
        exercise: exerciseObjectsWithAllInfo["Pullups"],
        sets: {
          Repetition: [5],
          Weight: [15],
        },
      },
      {
        exercise: exerciseObjectsWithAllInfo["Pushups"],
        sets: {
          Repetition: [5, 9],
          Weight: [15, 0],
        },
      },
    ],
  },
  {
    date: "03-25-2023",
    score: 10,
    exercises: [
      {
        exercise: exerciseObjectsWithAllInfo["Pullups"],
        sets: {
          Repetition: [5],
          Weight: [15],
        },
      },
      {
        exercise: exerciseObjectsWithAllInfo["Pushups"],
        sets: {
          Repetition: [5, 9],
          Weight: [15, 0],
        },
      },
    ],
  },
  {
    date: "03-30-2023",
    score: 10,
    exercises: [
      {
        exercise: exerciseObjectsWithAllInfo["Pullups"],
        sets: {
          Repetition: [5],
          Weight: [15],
        },
      },
      {
        exercise: exerciseObjectsWithAllInfo["Pushups"],
        sets: {
          Repetition: [5, 9],
          Weight: [15, 0],
        },
      },
    ],
  },
  {
    date: "04-06-2023",
    score: 10,
    exercises: [
      {
        exercise: exerciseObjectsWithAllInfo["Pullups"],
        sets: {
          Repetition: [5],
          Weight: [15],
        },
      },
      {
        exercise: exerciseObjectsWithAllInfo["Pushups"],
        sets: {
          Repetition: [5, 9],
          Weight: [15, 0],
        },
      },
    ],
  },
  {
    date: "04-19-2023",
    score: 10,
    weight:10,
    exercises: [
      {
        exercise: exerciseObjectsWithAllInfo["Pullups"],
        sets: {
          Repetition: [5],
          Weight: [15],
        },
      },
      {
        exercise: exerciseObjectsWithAllInfo["Pushups"],
        sets: {
          Repetition: [5, 9],
          Weight: [15, 0],
        },
      },
    ],
  },
];

const dummyData = {
  byDay,
};
export default dummyData