import React, { useState } from "react";
import { kindsOfExercises } from "../../data/exerciseCategories";
import { exercises } from "../../data/bodySegments";
import DisplaySets from "./DisplaySets";

const DifferentWorkoutDisplay = (newExercise, handleSetChange) => {
  const detailReference = Object.keys(newExercise.details)[0];
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
  const [newExercise, setNewExercise] = useState({
    name: exercises[0].exercise.name,
    kind: exercises[0].exercise.kind,
    details: exercises[0].exercise.details,
    sets: exercises[0].exercise.defaultSets,
    defaultSets : exercises[0].exercise.defaultSets,
  });

  const handleNewWorkoutMode = () => {
    setNewWorkoutMode(true);
  };

  const cancel = () => {
    setNewWorkoutMode(false);
    setExerciseValue(0);
    setNewExercise({
      name: exercises[0].exercise.name,
      kind: exercises[0].exercise.kind,
      details: exercises[0].exercise.details,
      sets: exercises[0].exercise.defaultSets,
    });
  };

  const setExerciseName = (e) => {
    const value = e.currentTarget.value;
    const updatedExercise = { ...newExercise };
    setExerciseValue(value);
    updatedExercise["name"] = exercises[value].exercise.name;
    updatedExercise["kind"] = exercises[value].exercise.kind;
    const defaultSets = { ...exercises[value].exercise.defaultSets }
    updatedExercise["sets"] = defaultSets;
    setNewExercise(updatedExercise);
  };

  const addNewSetToExercise = () => {
    const updatedExercise = { ...newExercise };
    const details = Object.keys(updatedExercise.defaultSets)
    
    for (let i = 0; i < details.length; i++) {
      const oldSets = [...updatedExercise.sets[details[i]]]
      const defaultSets = [...updatedExercise.defaultSets[details[i]]]
      updatedExercise.sets[details[i]] = oldSets.concat(defaultSets);
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
              <option value={index} key={exercise.exercise.name}>
                {" "}
                {exercise.exercise.name}
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
