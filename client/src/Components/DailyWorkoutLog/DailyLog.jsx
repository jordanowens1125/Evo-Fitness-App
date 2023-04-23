import React, { useState } from "react";
import SetsDisplayForLog from "./SetsDisplayForLog";
import { kindsOfExercises } from "../../data/exerciseCategories";

const DailyLog = ({
  log,
  removeExerciseFromLog,
  updateExerciseEntryForDay,
  removeSetFromExercise,
}) => {
  const WorkoutDisplay = (
    exercise,
    exerciseIndex,
    editMode,
    setUpdatedExercise
  ) => {
    const detailReference = Object.keys(exercise.exercise.exercise.details)[0];
    
    const result = exercise.sets[detailReference].map((value, index) => {
      return (
        <div key={index}>
          <SetsDisplayForLog
            exercise={exercise}
            editMode={editMode}
            SetIndex={index}
            exerciseIndex={exerciseIndex}
            updateExerciseEntryForDay={updateExerciseEntryForDay}
            removeSetFromExercise={removeSetFromExercise}
            setUpdatedExercise={setUpdatedExercise}
          ></SetsDisplayForLog>
        </div>
      );
    });
    return result;
  };

  const ExerciseDisplay = ({ exercise, exerciseIndex }) => {
    const [editMode, setEditMode] = useState(false);
    const [updatedExercise, setUpdatedExercise] = useState(
      structuredClone(exercise)
    );
      
    const addNewSet = () => {
      const copy = structuredClone(updatedExercise)
      const newSet = kindsOfExercises[updatedExercise.kind].defaultSets
      const details = kindsOfExercises[updatedExercise.kind].details;
      for (let i = 0; i < details.length; i++){
        const detail = details[i]
        copy.sets[detail]= [...copy.sets[detail],...newSet[detail]]
      }
      setUpdatedExercise(copy)
    };

    const handleSubmit = () => {
      updateExerciseEntryForDay(updatedExercise, exerciseIndex);
    };
    return (
      <>
        {editMode ? (
          <>
            <div key={exercise.name}>
              {exercise.name}
              <button onClick={addNewSet}>New Set?</button>
              <button onClick={() => setEditMode(false)}>Cancel</button>
              <button onClick={(e) => removeExerciseFromLog(exerciseIndex)}>
                Delete this exercise from day
              </button>
              <button onClick={() => handleSubmit()}>Submit</button>
              Sets:
              {WorkoutDisplay(
                updatedExercise,
                exerciseIndex,
                editMode,
                setUpdatedExercise
              )}
            </div>
          </>
        ) : (
          <>
            <div key={exercise.name}>
              {exercise.name}
              <button onClick={() => setEditMode(true)}>Edit</button>
              Sets:
              {WorkoutDisplay(exercise, exerciseIndex)}
            </div>
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
