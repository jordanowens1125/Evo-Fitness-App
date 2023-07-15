import React, { useState, useContext, useEffect } from "react";
import DisplaySetsInput from "../Shared/DisplaySetsInput";
import CreateExercise from "../CreateExercise/CreateExercise";
import { DataContext } from "../../Context/Context";
import Buttons from "../Shared/Buttons";

const AddExercisesToDay = ({ addExercisesForDay }) => {
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

  useEffect(() => {
    //useeffect in case api exercises are still referencing dummy data
    setNewExercise({
      name: exercises[0].name,
      kind: exercises[0].kind,
      details: { ...exercises[0].details },
      sets: { ...exercises[0].defaultSets }, //make sure default sets does not change
      defaultSets: { ...exercises[0].defaultSets },
    });
  }, [exercises]);

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
    addExercisesForDay([newExercise]);
    cancel();
  };

  const handleSetChange = (e, setIndex, detail) => {
    const updatedExercise = { ...newExercise };
    updatedExercise.sets[detail][setIndex] = +e.currentTarget.value;
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
    if (updatedExercise.sets[details[0]].length === 0) {
      updatedExercise.sets = structuredClone(updatedExercise.defaultSets);
      //Must have a least one set popup
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
                <button
                  onClick={cancel}
                  className="ghost-button"
                  aria-label="Cancel Exercise Log"
                >
                  Cancel
                </button>
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
              <Buttons
                secondary={"Add New Set"}
                secondaryFunction={addNewSetToExercise}
                primary={"Submit"}
                primaryFunction={addNewExerciseAndSets}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <Buttons
            primary={"Add Exercise"}
            primaryFunction={handleNewWorkoutMode}
          />
        </>
      )}
    </>
  );
};

export default AddExercisesToDay;
