import {
  LowerBack,
  Abs,
  Quads,
  Calves,
  Glutes,
  Hamstrings,
  Neck,
  Chest,
  Shoulders,
  Traps,
  Biceps,
  Forearms,
  Lats,
  Triceps,
  Heart,
} from "./muscleGroups";
import { exerciseType, muscleGroupType } from "../types/exercise";

export const bodySegments = [
  {
    name: "Upper",
    muscleGroups: [
      LowerBack,
      Chest,
      Neck,
      Biceps,
      Triceps,
      Shoulders,
      Forearms,
      Lats,
      Traps,
    ],
  },
  {
    name: "Lower",
    muscleGroups: [Hamstrings, Glutes, Calves, Quads],
  },
  {
    name: "Core",
    muscleGroups: [Abs],
  },
  {
    name: "Cardio",
    muscleGroups: [Heart],
  },
  {
    name: "ETC",
    muscleGroups: [],
  },
];

export const exercises: exerciseType[] = [];

export const muscleGroups: muscleGroupType[] = [];
export const exerciseObjectsWithAllInfo: any = {};

bodySegments.map((segment) => {
  return segment.muscleGroups.map((muscleGroup) => {
    const muscleGroupObject: muscleGroupType = {
      name: muscleGroup.name,
      image: muscleGroup.image,
      color: muscleGroup.color,
      segment: segment.name,
      // exercises: muscleGroup.exercises,
    };
    if (muscleGroup.exercises.length > 0) {
      muscleGroup.exercises.map((exercise) => {
        const exerciseObject: exerciseType = {
          name: exercise.name,
          kind: exercise.kind,
          details: exercise.details,
          defaultSets: exercise.defaultSets,
          segment: segment.name,
          muscleGroup: { name: muscleGroup.name, image: muscleGroup.image },
        };
        exercises.push(exerciseObject);
        exerciseObjectsWithAllInfo[exercise.name] = exerciseObject;

        return {
          exercise,
        };
      });
    }
    muscleGroups.push(muscleGroupObject);
    return muscleGroup;
  });
});
