import React, { useState, useContext } from "react";
import { exercises } from "../../data/bodySegments";
import { DataContext } from "../../context/Context";
import { kindsOfExercises } from "../../data/exerciseCategories";
import DisplaySets from "./DisplaySets";

const CreateWorkout = () => {
  const [exercisesInWorkout, setExercisesInWorkout] = useState({});
  const [searchParam, setSearchParam] = useState("");
  const context = useContext(DataContext);
  const routines = context.routines;
  const setRoutines = context.setRoutines;

  const filteredItems = exercises.filter((item) => {
    const capitalizedTitle = item.exercise.name.toUpperCase();
    if (!exercisesInWorkout[item.exercise.name]) {
      return capitalizedTitle.includes(searchParam.toUpperCase());
    }
    return "";
  });

  const handleSearchParamChange = (e) => {
    setSearchParam(e.currentTarget.value);
  };

  const addExerciseToWorkout = (item) => {
    const copiedExercises = { ...exercisesInWorkout };
    copiedExercises[item.exercise.name] = {
      name: item.exercise.name,
      kind: item.exercise.kind,
      sets: item.exercise.defaultSets,
      muscleGroup: item.muscleGroup,
      segment: item.segment,
      details: item.exercise.details,
    };
    setExercisesInWorkout(copiedExercises);
  };

  const saveWorkout = () => {
    const exercises = [];
    Object.keys(exercisesInWorkout).forEach((exercise) => {
      exercises.push({
        name: exercisesInWorkout[exercise].name,
        kind: exercisesInWorkout[exercise].kind,
        sets: exercisesInWorkout[exercise].sets,
        muscleGroup: exercisesInWorkout[exercise].muscleGroup,
      });
    });
    const newRoutines = [exercises, ...routines];
    setRoutines(newRoutines);
    setExercisesInWorkout({});
  };

  const removeExerciseFromWorkout = (exercisekey) => {
    const updatedExercise = { ...exercisesInWorkout };
    delete updatedExercise[exercisekey];
    setExercisesInWorkout(updatedExercise);
  };

  const handleSetChange = () => {};

  return (
    <>
      <div>
        New Workout Exercises
        {Object.keys(exercisesInWorkout).map((key, index) => {
          return (
            <div key={key}>
              {exercisesInWorkout[key].name}
              {
                <DisplaySets
                  newExercise={exercisesInWorkout[key]}
                  index={index}
                  handleSetChange={handleSetChange}
                />
              }
              <button onClick={() => removeExerciseFromWorkout(key)}>
                Delete exercise from workout
              </button>
            </div>
          );
        })}
        <button onClick={saveWorkout}>Save workout</button>
      </div>
      Search Exercises
      <div>
        <input
          type="text"
          value={searchParam}
          onChange={handleSearchParamChange}
        />
        <ul id="search-results">
          {filteredItems.map((item) => {
            return (
              <div
                key={item.exercise.name}
                onClick={() => addExerciseToWorkout(item)}
              >
                {item.exercise.name}
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default CreateWorkout;
