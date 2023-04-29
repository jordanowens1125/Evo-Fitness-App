import { exerciseObjectsWithAllInfo } from "./bodySegments";

const byDay = [
  {
    date: "03-01-2023",
    officialDate: new Date(2023, 2, 1),
    score: 10,
    exercises: [
      {
        name: exerciseObjectsWithAllInfo["Pullups"].name,
        segment: exerciseObjectsWithAllInfo["Pullups"].segment,
        defaultSets: exerciseObjectsWithAllInfo["Pullups"].defaultSets,
        kind: exerciseObjectsWithAllInfo["Pullups"].kind,
        muscleGroup: exerciseObjectsWithAllInfo["Pullups"].muscleGroup,
        details: exerciseObjectsWithAllInfo["Pullups"].details,
        sets: {
          Repetition: [520, 14, 2],
          Weight: [15, 0, 0],
        },
      },
      {
        name: exerciseObjectsWithAllInfo["Pushups"].name,
        segment: exerciseObjectsWithAllInfo["Pushups"].segment,
        defaultSets: exerciseObjectsWithAllInfo["Pushups"].defaultSets,
        kind: exerciseObjectsWithAllInfo["Pushups"].kind,
        muscleGroup: exerciseObjectsWithAllInfo["Pushups"].muscleGroup,
        details: exerciseObjectsWithAllInfo["Pushups"].details,
        sets: {
          Repetition: [5, 9],
          Weight: [15, 1],
        },
      },
    ],
  },
  {
    date: "03-09-2023",
    officialDate: new Date(2023, 2, 9),
    score: 10,
    exercises: [
      {
        name: exerciseObjectsWithAllInfo["Pullups"].name,
        segment: exerciseObjectsWithAllInfo["Pullups"].segment,
        defaultSets: exerciseObjectsWithAllInfo["Pullups"].defaultSets,
        kind: exerciseObjectsWithAllInfo["Pullups"].kind,
        muscleGroup: exerciseObjectsWithAllInfo["Pullups"].muscleGroup,
        details: exerciseObjectsWithAllInfo["Pullups"].details,
        sets: {
          Repetition: [1020, 9],
          Weight: [5, 7],
        },
      },
    ],
  },
  {
    date: "03-10-2023",
    officialDate: new Date(2023, 2, 10),
    score: 10,
    exercises: [
      {
        name: exerciseObjectsWithAllInfo["Pushups"].name,
        segment: exerciseObjectsWithAllInfo["Pushups"].segment,
        defaultSets: exerciseObjectsWithAllInfo["Pushups"].defaultSets,
        kind: exerciseObjectsWithAllInfo["Pushups"].kind,
        muscleGroup: exerciseObjectsWithAllInfo["Pushups"].muscleGroup,
        details: exerciseObjectsWithAllInfo["Pushups"].details,
        sets: {
          Repetition: [10, 9],
          Weight: [5, 7],
        },
      },
    ],
  },
  {
    date: "03-11-2023",
    officialDate: new Date(2023, 2, 11),
    score: 10,
    weight: 10,
    exercises: [
      {
        name: exerciseObjectsWithAllInfo["Pullups"].name,
        segment: exerciseObjectsWithAllInfo["Pullups"].segment,
        defaultSets: exerciseObjectsWithAllInfo["Pullups"].defaultSets,
        kind: exerciseObjectsWithAllInfo["Pullups"].kind,
        muscleGroup: exerciseObjectsWithAllInfo["Pullups"].muscleGroup,
        details: exerciseObjectsWithAllInfo["Pullups"].details,
        sets: {
          Repetition: [5],
          Weight: [15],
        },
      },
      {
        name: exerciseObjectsWithAllInfo["Pushups"].name,
        segment: exerciseObjectsWithAllInfo["Pushups"].segment,
        defaultSets: exerciseObjectsWithAllInfo["Pushups"].defaultSets,
        kind: exerciseObjectsWithAllInfo["Pushups"].kind,
        muscleGroup: exerciseObjectsWithAllInfo["Pushups"].muscleGroup,
        details: exerciseObjectsWithAllInfo["Pushups"].details,
        sets: {
          Repetition: [5, 9],
          Weight: [15, 0],
        },
      },
    ],
  },
  {
    date: "03-25-2023",
    officialDate: new Date(2023, 2, 25),
    score: 10,
    exercises: [
      {
        name: exerciseObjectsWithAllInfo["Pullups"].name,
        segment: exerciseObjectsWithAllInfo["Pullups"].segment,
        defaultSets: exerciseObjectsWithAllInfo["Pullups"].defaultSets,
        kind: exerciseObjectsWithAllInfo["Pullups"].kind,
        muscleGroup: exerciseObjectsWithAllInfo["Pullups"].muscleGroup,
        details: exerciseObjectsWithAllInfo["Pullups"].details,
        sets: {
          Repetition: [5],
          Weight: [15],
        },
      },
      {
        name: exerciseObjectsWithAllInfo["Pushups"].name,
        segment: exerciseObjectsWithAllInfo["Pushups"].segment,
        defaultSets: exerciseObjectsWithAllInfo["Pushups"].defaultSets,
        kind: exerciseObjectsWithAllInfo["Pushups"].kind,
        muscleGroup: exerciseObjectsWithAllInfo["Pushups"].muscleGroup,
        details: exerciseObjectsWithAllInfo["Pushups"].details,
        sets: {
          Repetition: [5, 9],
          Weight: [15, 0],
        },
      },
    ],
  },
  {
    date: "03-30-2023",
    officialDate: new Date(2023, 2, 30),
    score: 10,
    exercises: [
      {
        name: exerciseObjectsWithAllInfo["Pullups"].name,
        segment: exerciseObjectsWithAllInfo["Pullups"].segment,
        defaultSets: exerciseObjectsWithAllInfo["Pullups"].defaultSets,
        kind: exerciseObjectsWithAllInfo["Pullups"].kind,
        muscleGroup: exerciseObjectsWithAllInfo["Pullups"].muscleGroup,
        details: exerciseObjectsWithAllInfo["Pullups"].details,
        sets: {
          Repetition: [5],
          Weight: [15],
        },
      },
      {
        name: exerciseObjectsWithAllInfo["Pushups"].name,
        segment: exerciseObjectsWithAllInfo["Pushups"].segment,
        defaultSets: exerciseObjectsWithAllInfo["Pushups"].defaultSets,
        kind: exerciseObjectsWithAllInfo["Pushups"].kind,
        muscleGroup: exerciseObjectsWithAllInfo["Pushups"].muscleGroup,
        details: exerciseObjectsWithAllInfo["Pushups"].details,
        sets: {
          Repetition: [5, 9],
          Weight: [15, 0],
        },
      },
    ],
  },
  {
    date: "04-06-2023",
    officialDate: new Date(2023, 3, 6),
    score: 10,
    exercises: [
      {
        name: exerciseObjectsWithAllInfo["Pullups"].name,
        segment: exerciseObjectsWithAllInfo["Pullups"].segment,
        defaultSets: exerciseObjectsWithAllInfo["Pullups"].defaultSets,
        kind: exerciseObjectsWithAllInfo["Pullups"].kind,
        muscleGroup: exerciseObjectsWithAllInfo["Pullups"].muscleGroup,
        details: exerciseObjectsWithAllInfo["Pullups"].details,
        sets: {
          Repetition: [5],
          Weight: [15],
        },
      },
      {
        name: exerciseObjectsWithAllInfo["Pushups"].name,
        segment: exerciseObjectsWithAllInfo["Pushups"].segment,
        defaultSets: exerciseObjectsWithAllInfo["Pushups"].defaultSets,
        kind: exerciseObjectsWithAllInfo["Pushups"].kind,
        muscleGroup: exerciseObjectsWithAllInfo["Pushups"].muscleGroup,
        details: exerciseObjectsWithAllInfo["Pushups"].details,
        sets: {
          Repetition: [5, 9],
          Weight: [15, 0],
        },
      },
    ],
  },
  {
    date: "04-19-2023",
    officialDate: new Date(2023, 3, 19),
    score: 10,
    weight: 10,
    exercises: [
      {
        name: exerciseObjectsWithAllInfo["Pullups"].name,
        segment: exerciseObjectsWithAllInfo["Pullups"].segment,
        defaultSets: exerciseObjectsWithAllInfo["Pullups"].defaultSets,
        kind: exerciseObjectsWithAllInfo["Pullups"].kind,
        muscleGroup: exerciseObjectsWithAllInfo["Pullups"].muscleGroup,
        details: exerciseObjectsWithAllInfo["Pullups"].details,
        sets: {
          Repetition: [5, 2],
          Weight: [15, 1],
        },
      },
      {
        name: exerciseObjectsWithAllInfo["Pushups"].name,
        segment: exerciseObjectsWithAllInfo["Pushups"].segment,
        defaultSets: exerciseObjectsWithAllInfo["Pushups"].defaultSets,
        kind: exerciseObjectsWithAllInfo["Pushups"].kind,
        muscleGroup: exerciseObjectsWithAllInfo["Pushups"].muscleGroup,
        details: exerciseObjectsWithAllInfo["Pushups"].details,
        sets: {
          Repetition: [5, 9],
          Weight: [15, 0],
        },
      },
    ],
  },
  {
    date: "04-22-2023",
    officialDate: new Date(2023, 3, 22),
    score: 10,
    weight: 180,
    exercises: [
      {
        name: exerciseObjectsWithAllInfo["Pullups"].name,
        segment: exerciseObjectsWithAllInfo["Pullups"].segment,
        defaultSets: exerciseObjectsWithAllInfo["Pullups"].defaultSets,
        kind: exerciseObjectsWithAllInfo["Pullups"].kind,
        muscleGroup: exerciseObjectsWithAllInfo["Pullups"].muscleGroup,
        details: exerciseObjectsWithAllInfo["Pullups"].details,
        sets: {
          Repetition: [10, 2],
          Weight: [15, 12],
        },
      },
    ],
  },
  {
    date: "04-23-2023",
    officialDate: new Date(2023, 3, 23),
    score: 10,
    weight: 135,
    exercises: [
      {
        name: exerciseObjectsWithAllInfo["Pullups"].name,
        segment: exerciseObjectsWithAllInfo["Pullups"].segment,
        defaultSets: exerciseObjectsWithAllInfo["Pullups"].defaultSets,
        kind: exerciseObjectsWithAllInfo["Pullups"].kind,
        muscleGroup: exerciseObjectsWithAllInfo["Pullups"].muscleGroup,
        details: exerciseObjectsWithAllInfo["Pullups"].details,
        sets: {
          Repetition: [10, 2],
          Weight: [15, 12],
        },
      },
    ],
  },
  {
    date: "04-24-2023",
    officialDate: new Date(2023, 3, 24),
    score: 10,
    weight: 140,
    exercises: [
      {
        name: exerciseObjectsWithAllInfo["Pullups"].name,
        segment: exerciseObjectsWithAllInfo["Pullups"].segment,
        defaultSets: exerciseObjectsWithAllInfo["Pullups"].defaultSets,
        kind: exerciseObjectsWithAllInfo["Pullups"].kind,
        muscleGroup: exerciseObjectsWithAllInfo["Pullups"].muscleGroup,
        details: exerciseObjectsWithAllInfo["Pullups"].details,
        sets: {
          Repetition: [2],
          Weight: [12],
        },
      },
    ],
  },
  {
    date: "04-25-2023",
    officialDate: new Date(2023, 3, 25),
    score: 10,
    weight: 145,
    exercises: [
      {
        name: exerciseObjectsWithAllInfo["Pullups"].name,
        segment: exerciseObjectsWithAllInfo["Pullups"].segment,
        defaultSets: exerciseObjectsWithAllInfo["Pullups"].defaultSets,
        kind: exerciseObjectsWithAllInfo["Pullups"].kind,
        muscleGroup: exerciseObjectsWithAllInfo["Pullups"].muscleGroup,
        details: exerciseObjectsWithAllInfo["Pullups"].details,
        sets: {
          Repetition: [10],
          Weight: [15],
        },
      },
    ],
  },
  {
    date: "04-29-2023",
    officialDate: new Date(2023, 3, 29),
    score: 10,
    weight: 159,
    exercises: [
      {
        name: exerciseObjectsWithAllInfo["Pullups"].name,
        segment: exerciseObjectsWithAllInfo["Pullups"].segment,
        defaultSets: exerciseObjectsWithAllInfo["Pullups"].defaultSets,
        kind: exerciseObjectsWithAllInfo["Pullups"].kind,
        muscleGroup: exerciseObjectsWithAllInfo["Pullups"].muscleGroup,
        details: exerciseObjectsWithAllInfo["Pullups"].details,
        sets: {
          Repetition: [10],
          Weight: [15],
        },
      },
      {
        name: exerciseObjectsWithAllInfo["Pushups"].name,
        segment: exerciseObjectsWithAllInfo["Pushups"].segment,
        defaultSets: exerciseObjectsWithAllInfo["Pushups"].defaultSets,
        kind: exerciseObjectsWithAllInfo["Pushups"].kind,
        muscleGroup: exerciseObjectsWithAllInfo["Pushups"].muscleGroup,
        details: exerciseObjectsWithAllInfo["Pushups"].details,
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
export default dummyData;
