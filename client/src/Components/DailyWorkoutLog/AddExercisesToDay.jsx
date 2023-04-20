import React, { useState } from "react";
import { kindsOfExercises } from "../../data/exerciseCategories";
import DisplaySets from "./DisplaySets";

const DifferentWorkoutDisplay = (newExercise, handleSetChange) => {
  const detailReference = kindsOfExercises[newExercise.kind].details[0];
  return newExercise.sets[detailReference].map((value, index) => {
    return (
      <div key={index}>
        <DisplaySets
          newExercise={newExercise}
          index={index}
          handleSetChange={handleSetChange}
        />
      </div>
    );
  });
};

const AddExercisesToDay = ({ addExerciseForDay }) => {
  const [newWorkoutMode, setNewWorkoutMode] = useState(false);
  const [exerciseValue, setExerciseValue] = useState(0);

  let exercises = [];

  Object.keys(kindsOfExercises).forEach(function (key) {
    const exerciseObjects = kindsOfExercises[key].exercises.map((exercise) => {
      return {
        name: exercise,
        kind: key,
        units: kindsOfExercises[key].units,
      };
    });
    exercises = [...exercises, ...exerciseObjects];
  });

  const [newExercise, setNewExercise] = useState({
    name: exercises[0].name,
    kind: exercises[0].kind,
    units: exercises[0].units,
    sets: {
      Repetition: [0],
      Weight: [0],
    },
  });

  const handleNewWorkoutMode = () => {
    setNewWorkoutMode(true);
  };

  const cancel = () => {
    setNewWorkoutMode(false);
    setExerciseValue(0);
    setNewExercise({
      name: exercises[0].name,
      kind: exercises[0].kind,
      units: exercises[0].units,
      sets: {
        Repetition: [0],
        Weight: [0],
      },
    });
  };

  const setExerciseName = (e) => {
    const updatedExercise = { ...newExercise };
    
    setExerciseValue(e.currentTarget.value);
    updatedExercise["name"] = exercises[e.currentTarget.value].name;
    updatedExercise["kind"] = exercises[e.currentTarget.value].kind;
    updatedExercise["units"] = exercises[e.currentTarget.value].units;
    const defaultSets = structuredClone(
      kindsOfExercises[exercises[e.currentTarget.value].kind].defaultSets
    );
    updatedExercise["sets"] = defaultSets;
    setNewExercise(updatedExercise)
  };

  const addNewSetToExercise = () => {
    const updatedExercise = { ...newExercise };
    const kindofExercise = kindsOfExercises[updatedExercise.kind];
    const details = kindofExercise.details;
    const defaultSets = kindofExercise.defaultSets;
    for (let i = 0; i < details.length; i++) {
      updatedExercise.sets[details[i]] = updatedExercise.sets[details[i]].concat(
        defaultSets[details[i]][0])
    }
    setNewExercise(updatedExercise);
  };

  const addNewExerciseAndSets = () => {
    addExerciseForDay(newExercise);
    cancel();
  };

  const handleSetChange = (index, value, itemname) => {
    const updatedExercise = { ...newExercise };
    updatedExercise.sets[itemname][index] = +value;
    setNewExercise(updatedExercise);
  };

  return (
    <>
      {newWorkoutMode ? (
        <>
          <select
            name="exercise"
            id="exercise"
            onChange={setExerciseName}
            value={exerciseValue}
          >
            {exercises.map((exercise, index) => (
              <option value={index} key={exercise.name}>
                {" "}
                {exercise.name}
              </option>
            ))}
          </select>
          {/* Dropdown depends on exercise type */}
          {DifferentWorkoutDisplay(newExercise, handleSetChange)}

          <button onClick={addNewSetToExercise}>Add new set</button>
          <button onClick={addNewExerciseAndSets}>Finish</button>
          <button onClick={cancel}>Cancel</button>
        </>
      ) : (
        <>
          <button onClick={() => handleNewWorkoutMode()}>Add Exercise</button>
        </>
      )}
    </>
  );
};

export default AddExercisesToDay;
