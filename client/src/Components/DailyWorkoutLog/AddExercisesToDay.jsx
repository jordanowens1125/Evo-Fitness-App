import React, { useState, useContext } from "react";
import DisplaySets from "./DisplaySets";
import CreateExercise from "./CreateExercise";
import { DataContext } from "../../context/Context";

const DifferentWorkoutDisplay = (newExercise, handleSetChange, removeSet) => {
  const detailReference = Object.keys(newExercise.details)[0];
  return newExercise.sets[detailReference].map((value, index) => {
    return (
      <div key={index} className="flex  flex-column bg-border padding-lg ">
        <span className="flex space-between">
          <p>Set {index+1}:</p>
          <p onClick={() => removeSet(index)}>X</p>
        </span>
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
  const [createModalOn, setCreateModalOn] = useState(true);
  const context = useContext(DataContext)
  const exercises = context.exerciseList
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
    updatedExercise["defaultSets"] = defaultSets;
    updatedExercise["details"] = exercises[value].details;
    setNewExercise(updatedExercise);
  };

  const addNewSetToExercise = () => {
    const updatedExercise = { ...newExercise };
    const details = Object.keys(updatedExercise.defaultSets);
    for (let i = 0; i < details.length; i++) {
      const oldSets = [...updatedExercise.sets[details[i]]];
      const defaultValue = { ...updatedExercise }.defaultSets[details[i]][0];
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

  const removeSet = (index) => {
    const updatedExercise = { ...newExercise };
    const details = Object.keys(updatedExercise.defaultSets);
    for (let i = 0; i < details.length; i++) {
      const oldSets = [...updatedExercise.sets[details[i]]];
      oldSets.splice(index, 1);
      updatedExercise.sets[details[i]] = oldSets;
      console.log(updatedExercise.sets);
    }
    setNewExercise(updatedExercise);
  };

  const cancelCreateWorkout = () => {
    setCreateModalOn(false);
  };

  return (
    <>
      {newWorkoutMode ? (
        <>
          <div className="modal">
            <div className="modal-content">
              <span className="flex space-between">
                <h2 className="margin-bottom-lg">Log an exercise:</h2>
                <button onClick={cancel}>Cancel</button>
              </span>

              <div className="flex space-between ">
                <span className="flex gap-lg wrap">
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
                  <button
                    className="secondary-buttono"
                    onClick={() => setCreateModalOn(true)}
                  >
                    Create New Exercise
                  </button>
                </span>
              </div>

              {/* Dropdown depends on exercise type */}
              <div className="flex wrap gap-lg">
                {DifferentWorkoutDisplay(
                  newExercise,
                  handleSetChange,
                  removeSet
                )}
              </div>
              <button onClick={addNewSetToExercise}>Add new set</button>
              <button onClick={addNewExerciseAndSets} className="primary">
                Submit
              </button>
            </div>
          </div>
          {createModalOn ? (
            <>
              <div className="modal">
                <div className="modal-content">
                  <CreateExercise cancel={cancelCreateWorkout} />
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
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
