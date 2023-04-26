import { exerciseObjectsWithAllInfo } from "./bodySegments";

export const storedRoutines = [
  [
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
  [
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
];
