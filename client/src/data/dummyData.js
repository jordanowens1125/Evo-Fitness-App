 const exercises = [
    {
      name: "pushups",
      kind: "Weights/Reps",
      units: "Pounds",
      details: [
        {
          day: 2,
          month: 1,
          year: 2023,
          date: function(){
            return new Date(this.year, this.month, this.day)
          },
          sets: [
            {
              reps: 5,
              weight: 6,
            },
          ],
        },
        {
          day: 1,
          month: 2,
          year: 2023,
          date: function(){
            return new Date(this.year, this.month, this.day)
          },
          sets: [
            {
              reps: 5,
              weight: 6,
            },
            {
              reps: 5,
              weight: 0,
            },
            {
              reps: 10,
              weight: 0,
            },
            {
              reps: 20,
              weight: 1,
            },
            {
              reps: 10,
              weight: 0,
            },
            {
              reps: 5,
              weight: 0,
            },
          ],
        },
        {
          day: 31,
          month: 2,
          year: 2023,
          date: function(){
            return new Date(this.year, this.month, this.day)
          },
          sets: [
            {
              reps: 50,
              weight: 6,
            },
            {
              reps: 52,
              weight: 0,
            },
            {
              reps: 10,
              weight: 0,
            },
            {
              reps: 24,
              weight: 1,
            },
            {
              reps: 18,
              weight: 3,
            },
          ],
        },
      ],
    },
    {
      name: "pullups",
      kind: "Weights/Reps",
      units: "Pounds",
      details: [
        {
          day: 2,
          month: 2,
          year: 2023,
          date: function(){
            return new Date(this.year, this.month, this.day)
          },
          sets: [
            {
              reps: 5,
              weight: 6,
            },
            {
              reps: 3,
              weight: 0,
            },
            {
              reps: 2,
              weight: 0,
            },
            {
              reps: 20,
              weight: 1,
            },
            {
              reps: 20,
              weight: 0,
            },
            {
              reps: 10,
              weight: 0,
            },
          ],
        },
        {
          day: 31,
          month: 2,
          year: 2023,
          date: function(){
            return new Date(this.year, this.month, this.day)
          },
          sets: [
            {
              reps: 5,
              weight: 6,
            },
            {
              reps: 32,
              weight: 0,
            },
            {
              reps: 20,
              weight: 0,
            },
            {
              reps: 24,
              weight: 1,
            },
            {
              reps: 18,
              weight: 0,
            },
          ],
        },
      ],
    },
]
  
const test = [
  {
    name: "pushups",
    kind: "Weights/Reps",
    units: "Pounds",
    day: 2,
    month: 1,
    year: 2023,
    date: new Date(2022, 1, 2).toISOString().slice(0, 10),
    sets: [
      {
        reps: 5,
        weight: 6,
      },
    ],
  },
  {
    name: "pushups",
    kind: "Weights/Reps",
    units: "Pounds",
    day: 2,
    month: 1,
    year: 2023,
    date: new Date(2022, 1, 2).toISOString().slice(0, 10),
    sets: [
      {
        reps: 5,
        weight: 6,
      },
    ],
  },
  {
    name: "pushups",
    kind: "Weights/Reps",
    units: "Pounds",
    day: 1,
    month: 2,
    year: 2023,
    date: new Date(2023, 2, 1).toISOString().slice(0, 10),
    sets: [
      {
        reps: 5,
        weight: 6,
      },
      {
        reps: 5,
        weight: 0,
      },
      {
        reps: 10,
        weight: 0,
      },
      {
        reps: 20,
        weight: 1,
      },
      {
        reps: 10,
        weight: 0,
      },
      {
        reps: 5,
        weight: 0,
      },
    ],
  },
  {
    name: "pushups",
    kind: "Weights/Reps",
    units: "Pounds",
    day: 1,
    month: 2,
    year: 2023,
    date: new Date(2023, 2, 1).toISOString().slice(0, 10),
    sets: [
      {
        reps: 5,
        weight: 6,
      },
      {
        reps: 5,
        weight: 6,
      },
    ],
  },
  {
    name: "pushups",
    kind: "Weights/Reps",
    units: "Pounds",
    day: 1,
    month: 2,
    year: 2023,
    date: new Date(2023, 2, 1).toISOString().slice(0, 10),
    sets: [
      {
        reps: 5,
        weight: 6,
      },
      {
        reps: 5,
        weight: 6,
      },
    ],
  },
  {
    name: "pushups",
    kind: "Weights/Reps",
    units: "Pounds",
    day: 31,
    month: 2,
    year: 2023,
    date: new Date(2023, 2, 31).toISOString().slice(0, 10),
    sets: [
      {
        reps: 50,
        weight: 6,
      },
      {
        reps: 52,
        weight: 0,
      },
      {
        reps: 10,
        weight: 0,
      },
      {
        reps: 24,
        weight: 1,
      },
      {
        reps: 18,
        weight: 3,
      },
    ],
  },
  {
    name: "pullups",
    kind: "Weights/Reps",
    units: "Pounds",
    day: 1,
    month: 2,
    year: 2023,
    date: new Date(2023, 2, 1).toISOString().slice(0, 10),
    sets: [
      {
        reps: 5,
        weight: 6,
      },
      {
        reps: 32,
        weight: 0,
      },
      {
        reps: 20,
        weight: 0,
      },
      {
        reps: 24,
        weight: 1,
      },
      {
        reps: 18,
        weight: 0,
      },
    ],
  },
  {
    name: "pullups",
    kind: "Weights/Reps",
    units: "Pounds",
    day: 12,
    month: 2,
    year: 2023,
    date: new Date(2023, 2, 12).toISOString().slice(0, 10),
    sets: [
      {
        reps: 5,
        weight: 6,
      },
      {
        reps: 32,
        weight: 0,
      },
      {
        reps: 20,
        weight: 0,
      },
      {
        reps: 24,
        weight: 1,
      },
      {
        reps: 18,
        weight: 0,
      },
    ],
  },
  {
    name: "pullups",
    kind: "Weights/Reps",
    units: "Pounds",
    day: 2,
    month: 2,
    year: 2023,
    date: new Date(2023, 2, 2).toISOString().slice(0, 10),
    sets: [
      {
        reps: 5,
        weight: 6,
      },
      {
        reps: 3,
        weight: 0,
      },
      {
        reps: 2,
        weight: 0,
      },
      {
        reps: 20,
        weight: 1,
      },
      {
        reps: 20,
        weight: 0,
      },
      {
        reps: 10,
        weight: 0,
      },
    ],
  },
];

const byDay = [
  {
    date: "03-01-2023",
    score: 10,
    exercises: [
      {
        name: "Pullups",
        kind: "Weights/Reps",
        units: "Pounds",
        sets: {
          Repetition: [520, 14, 2],
          Weight: [15, 0, 0],
        },
      },
      {
        name: "Pushups",
        kind: "Weights/Reps",
        units: "Pounds",
        sets: {
          Repetition: [5, 9],
          Weight: [15, 1, 3],
        },
      },
    ],
  },
  {
    date: "03-09-2023",
    score: 10,
    exercises: [
      {
        name: "Pullups",
        kind: "Weights/Reps",
        units: "Pounds",
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
        name: "Pushups",
        kind: "Weights/Reps",
        units: "Pounds",
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
    exercises: [
      {
        name: "Pullups",
        kind: "Weights/Reps",
        units: "Pounds",
        sets: {
          Repetition: [5],
          Weight: [15],
        },
      },
      {
        name: "Pushups",
        kind: "Weights/Reps",
        units: "Pounds",
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
        name: "Pullups",
        kind: "Weights/Reps",
        units: "Pounds",
        sets: {
          Repetition: [5],
          Weight: [15],
        },
      },
      {
        name: "Pushups",
        kind: "Weights/Reps",
        units: "Pounds",
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
        name: "Pullups",
        kind: "Weights/Reps",
        units: "Pounds",
        sets: {
          Repetition: [5],
          Weight: [15],
        },
      },
      {
        name: "Pushups",
        kind: "Weights/Reps",
        units: "Pounds",
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
        name: "Pullups",
        kind: "Weights/Reps",
        units: "Pounds",
        sets: {
          Repetition: [5],
          Weight: [15],
        },
      },
      {
        name: "Pushups",
        kind: "Weights/Reps",
        units: "Pounds",
        sets: {
          Repetition: [5, 9],
          Weight: [15, 0],
        },
      },
    ],
  },
];

const dummyData = {
  exercises: exercises,
  test, 
  byDay,
};
export default dummyData