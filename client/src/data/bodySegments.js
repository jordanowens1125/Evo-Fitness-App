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
} from "./muscleGroups";

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
      Triceps,
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
    muscleGroups: [],
  },
  {
    name: "ETC",
    muscleGroups: [],
  },
];

export const exercises = [];
export const muscleGroups = []
export const exerciseObjectsWithAllInfo = {
  
}

bodySegments.map((segment) => {
  return segment.muscleGroups.map((muscleGroup) => {
    if (muscleGroup.exercises.length > 0) {
        
      muscleGroup.exercises.map((exercise) => {
        exercises.push({
          exercise,
          segment: segment.name,
          muscleGroup: { name: muscleGroup.name, image: muscleGroup.image },
        });
        exerciseObjectsWithAllInfo[exercise.name] = {
          exercise,
          segment: segment.name,
          muscleGroup: { name: muscleGroup.name, image: muscleGroup.image },
        };
        muscleGroups.push({
          name: muscleGroup.name,
          exercises: muscleGroup.exercises,
          segment: segment
        })
        return {
          exercise,
        };
      });
    }
    return muscleGroup;
  });
});

