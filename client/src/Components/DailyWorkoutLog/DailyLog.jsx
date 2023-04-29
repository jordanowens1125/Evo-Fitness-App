import React, { useState } from "react";
import SetsDisplayForLog from "./SetsDisplayForLog";

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
    const details = Object.keys(exercise.details);
    const detailReference = details[0];

    const formattedExercise = {
      sets: exercise.sets,
      name: exercise.name,
      kind: exercise.kind,
      defaultSets: exercise.defaultSets,
      muscleGroup: exercise.muscleGroup,
      details: exercise.details,
    };
    const result = exercise.sets[detailReference].map((value, index) => {
      return (
        <div
          key={index}
        >
          <SetsDisplayForLog
            exercise={formattedExercise}
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
    return (
      <>
        {editMode ? (
          <>
            <section
              key={exercise.name}
              className="margin-md padding-lg flex aic modal"
            >
              <div className="modal-content">
                <span className="flex gap-sm aic wrap full-width space-between">
                  <h2 className="primary">{exercise.name}</h2>

                  <button onClick={() => setEditMode(false)}>Cancel</button>
                </span>
                <div className="flex wrap gap-lg">
                  {WorkoutDisplay(
                    updatedExercise,
                    exerciseIndex,
                    editMode,
                    setUpdatedExercise
                  )}
                </div>

                <span className="flex aic space-between margin-top-lg">
                  <button onClick={addNewSet}>New Set?</button>
                  <button onClick={() => handleSubmit()}>Submit</button>
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
                  <button onClick={() => setEditMode(true)}>Edit</button>
                  <button onClick={(e) => removeExerciseFromLog(exerciseIndex)}>
                    Delete Exercise
                  </button>
              </span>
              <div className="flex wrap gap-lg">
                {WorkoutDisplay(exercise, exerciseIndex)}
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
