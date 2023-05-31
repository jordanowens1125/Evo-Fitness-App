import React, { useState } from "react";
import DisplaySets from "../Shared/DisplaySets";
import DisplaySetsInput from "../Shared/DisplaySetsInput";

const DailyLog = ({
  log,
  removeExerciseFromLog,
  updateExerciseEntryForDay,
}) => {
  const ExerciseDisplay = ({ exercise, exerciseIndex }) => {
    const [editMode, setEditMode] = useState(false);
    const [updatedExercise, setUpdatedExercise] = useState(
      structuredClone(exercise)
    );
    const addNewSet = () => {
      const copy = { ...updatedExercise };
      const details = Object.keys(copy.details);
      const newSet = copy.defaultSets;

      for (let i = 0; i < details.length; i++) {
        const detail = details[i];
        copy.sets[detail] = [...copy.sets[detail], ...newSet[detail]];
      }
      setUpdatedExercise(copy);
    };

    const handleSubmit = () => {
      updateExerciseEntryForDay(updatedExercise, exerciseIndex);
    };
    const handleSetChange = (e, setIndex, detail) => {
      const copy = { ...updatedExercise };
      copy.sets[detail][setIndex] = e.currentTarget.value;
      setUpdatedExercise(copy);
    };
    const removeSetFromExercise = (setIndex) => {
      const copy = { ...updatedExercise };
      const details = Object.keys(copy.details);
      for (let i = 0; i < details.length; i++) {
        copy.sets[details[i]].splice(setIndex, 1);
      }
      if (
       copy.sets[details[0]]
          .length === 0
      ) {
        copy.sets = structuredClone(copy.defaultSets)
        //Must have a least one set popup
      }
      setUpdatedExercise(copy);
    };
    return (
      <>
        {editMode ? (
          <>
            <section
              key={exercise.name}
              className="padding-lg flex aic modal"
            >
              <div className="modal-content">
                <span className="flex gap-sm aic wrap full-width space-between">
                  <h2 className="primary">{exercise.name}</h2>

                  <button onClick={() => setEditMode(false)} className="ghost-button">Cancel</button>
                </span>
                <div className="flex wrap gap-lg">
                  <DisplaySetsInput
                    exercise={updatedExercise}
                    handleSetChange={handleSetChange}
                    removeSet={removeSetFromExercise}
                    exerciseIndex={exerciseIndex}
                  />
                </div>

                <span className="flex aic space-between margin-top-lg">
                  <button onClick={addNewSet} className="secondary-button">New Set?</button>
                  <button onClick={() => handleSubmit()} className="primary-button">Submit</button>
                </span>
              </div>
            </section>
          </>
        ) : (
          <>
            <section
              key={exercise.name}
              className="margin-bottom-sm padding-lg flex flex-column"
            >
              <span className="flex margin-bottom-md gap-lg wrap">
                <h2 className="primary">{exercise.name}</h2>
                <button onClick={() => setEditMode(true)} className="secondary-button">Edit</button>
                <button onClick={(e) => removeExerciseFromLog(exerciseIndex)} className="ghost-button">
                  Delete Exercise
                </button>
              </span>
              <div className="flex wrap gap-lg">
                <DisplaySets exercise={exercise} />
              </div>
            </section>
          </>
        )}
      </>
    );
  };
  return (
    <>
      {log.exercises.map((exercise, exerciseIndex) => {
        return (
          <ExerciseDisplay
            exercise={exercise}
            exerciseIndex={exerciseIndex}
            key={exerciseIndex}
          />
        );
      })}
    </>
  );
};

export default DailyLog;
