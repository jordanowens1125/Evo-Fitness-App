import { kindsOfExercises } from "../data/exerciseCategories";

export const findExerciseDetails = (exercise) => {
    const details = kindsOfExercises[exercise.kind].details;
    return details
};

