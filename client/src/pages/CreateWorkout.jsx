import React, { useState, useContext } from "react";
import { exercises } from "../data/exerciseCategories";
import { DataContext } from "../context/Context";
import { kindsOfExercises } from "../data/exerciseCategories";

const CreateWorkout = () => {
  const [exercisesInWorkout, setExercisesInWorkout] = useState({});
  const [searchParam, setSearchParam] = useState("");
  const context = useContext(DataContext);
  const routines = context.routines
  const setRoutines = context.setRoutines;

  const filteredItems = exercises.filter((item) => {
    const capitalizedTitle = item.name.toUpperCase();
    if (!exercisesInWorkout[item.name]) {
      return capitalizedTitle.includes(searchParam.toUpperCase());
    }
    return ""
  });

  const handleSearchParamChange = (e) => {
    setSearchParam(e.currentTarget.value);
  };

  const addExerciseToWorkout = (exercise) => {
    const copiedExercises = { ...exercisesInWorkout };
    copiedExercises[exercise.name] = {
      name: exercise.name,
      kind: exercise.kind,
      units: exercise.units,
      sets: exercise.defaultSets,
      muscleGroup: exercise.muscleGroup,
    };
    setExercisesInWorkout(copiedExercises);
  };

  const saveWorkout = () => {
    const exercises = [];

    Object.keys(exercisesInWorkout).forEach((exercise) => {
      exercises.push({
        name: exercisesInWorkout[exercise].name,
        kind: exercisesInWorkout[exercise].kind,
        units: exercisesInWorkout[exercise].units,
        sets: exercisesInWorkout[exercise].sets,
        muscleGroup: exercisesInWorkout[exercise].muscleGroup,
      });
    });
    const newRoutines = [exercises, ...routines]
    setRoutines(newRoutines)
    setExercisesInWorkout({});
  };
  const removeExerciseFromWorkout = (exercisekey) => {
    const updatedExercise = { ...exercisesInWorkout };
    delete updatedExercise[exercisekey];
    setExercisesInWorkout(updatedExercise);
  };
  return (
    <>
      <div>
        Selected
        {Object.keys(exercisesInWorkout).map((key) => {
          return (
            <div key={key}>
              {exercisesInWorkout[key].name}
              {kindsOfExercises[exercisesInWorkout[key].kind].details.map((detail) => {
                return (<div>{ detail}{exercisesInWorkout[key].sets[detail]}</div>)
              })}
              
              {}
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
              <div key={item.name} onClick={() => addExerciseToWorkout(item)}>
                {item.name}
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default CreateWorkout;
