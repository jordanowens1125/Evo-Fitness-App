import React, { useState } from "react";
import { exercises } from "../../data/bodySegments";
import DisplaySets from "./DisplaySets";

const DifferentWorkoutDisplay = (newExercise, handleSetChange) => {
  const detailReference = Object.keys(newExercise.details)[0];
  return newExercise.sets[detailReference].map((value, index) => {
    return (
      <div key={index} className="flex  aic">
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
    name: exercises[0].name,
    kind: exercises[0].kind,
    details: { ...exercises[0].details },
    sets: { ...exercises[0].defaultSets }, //make sure default sets does not change
    defaultSets: { ...exercises[0].defaultSets },
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
      details: { ...exercises[0].details },
      sets: { ...exercises[0].defaultSets },
      defaultSets: { ...exercises[0].defaultSets }, //make sure default sets does not change,
    });
  };

  const setExerciseName = (e) => {
    const value = e.currentTarget.value;
    const updatedExercise = { ...newExercise };
    setExerciseValue(value);
    updatedExercise["name"] = exercises[value].name;
    updatedExercise["kind"] = exercises[value].kind;
    const defaultSets = { ...exercises[value].defaultSets };
    updatedExercise["sets"] = defaultSets;
    setNewExercise(updatedExercise);
  }; 

  const addNewSetToExercise = () => {
    const updatedExercise = { ...newExercise };
    const details = Object.keys(updatedExercise.defaultSets);

    for (let i = 0; i < details.length; i++) {
      const oldSets = [...updatedExercise.sets[details[i]]];
      const defaultValue = { ...updatedExercise }.defaultSets[details[i]];
      updatedExercise.sets[details[i]] = [...oldSets, defaultValue];
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
          <div className="flex flex-column space-between">
            <select
              name="exercise"
              id="exercise"
              onChange={setExerciseName}
              value={exerciseValue}
            >
              {exercises.map((exercise, index) => (
                <option value={index} key={exercise.name + index}>
                  {" "}
                  {exercise.name}
                </option>
              ))}
            </select>
            <button onClick={cancel}>Cancel</button>
          </div>

          {/* Dropdown depends on exercise type */}
          <div>
            {DifferentWorkoutDisplay(newExercise, handleSetChange)}
            <span className="flex space-between margin-top-lg">
              <button onClick={addNewSetToExercise}>Add new set</button>
              <button onClick={addNewExerciseAndSets}>Finish</button>
            </span>
          </div>
        </>
      ) : (
        <>
          <button
            onClick={() => handleNewWorkoutMode()}
            className="secondary-button"
          >
            Add Exercise
          </button>
        </>
      )}
    </>
  );
};

export default AddExercisesToDay;
