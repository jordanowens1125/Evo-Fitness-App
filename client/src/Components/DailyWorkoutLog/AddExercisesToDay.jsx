import React, { useState, useContext } from "react";
import DisplaySetsInput from "../Shared/DisplaySetsInput";
import CreateExercise from "../Shared/CreateExercise";
import { DataContext } from "../../context/Context";

const AddExercisesToDay = ({ addExerciseForDay }) => {
  const [newWorkoutMode, setNewWorkoutMode] = useState(false);
  const [exerciseValue, setExerciseValue] = useState(0);
  const context = useContext(DataContext);
  const exercises = context.exerciseList;
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

  const resetValues = () => {
    setExerciseValue(0);
    setNewExercise({
      name: exercises[0].name,
      kind: exercises[0].kind,
      details: { ...exercises[0].details },
      sets: { ...exercises[0].defaultSets },
      defaultSets: { ...exercises[0].defaultSets }, //make sure default sets does not change,
    });
  };

  const cancel = () => {
    setNewWorkoutMode(false);
    resetValues();
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

  const handleSetChange = (e,setIndex, detail) => {
    const updatedExercise = { ...newExercise };
    updatedExercise.sets[detail][setIndex] = e.currentTarget.value;
    setNewExercise(updatedExercise);
  };

  const removeSet = (index) => {
    const updatedExercise = { ...newExercise };
    const details = Object.keys(updatedExercise.defaultSets);
    for (let i = 0; i < details.length; i++) {
      const oldSets = [...updatedExercise.sets[details[i]]];
      oldSets.splice(index, 1);
      updatedExercise.sets[details[i]] = oldSets;
    }
    setNewExercise(updatedExercise);
  };

  return (
    <>
      {newWorkoutMode ? (
        <>
          <div className="modal ">
            <div className="modal-content ">
              <span className="flex space-between flex-start">
                <p className="margin-bottom-lg heading-md">Log an exercise:</p>
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
                  <CreateExercise />
                </span>
              </div>
              <div className="flex wrap gap-lg aic">
                <DisplaySetsInput
                  exercise={newExercise}
                  handleSetChange={handleSetChange}
                  removeSet={removeSet}
                />
              </div>
              <button onClick={addNewSetToExercise}>Add new set</button>
              <button onClick={addNewExerciseAndSets} className="primary">
                Submit
              </button>
            </div>
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
