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
    }
    const result = exercise.sets[detailReference].map((value, index) => {
      return (
        <div key={index} className="full-width flex gap-lg">
          <SetsDisplayForLog
            exercise={formattedExercise}
            editMode={editMode}
            SetIndex={index}
            exerciseIndex={exerciseIndex}
            updateExerciseEntryForDay={updateExerciseEntryForDay}
            removeSetFromExercise={removeSetFromExercise}
            setUpdatedExercise={setUpdatedExercise}
            details={details}
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
      console.log(copy);
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
              className="margin-md padding-lg flex aic jcc flex-column "
            >
              <div className="width-md">
                <span className="flex gap-sm aic wrap full-width space-between margin-bottom-lg">
                  {exercise.name}
                  <button onClick={() => setEditMode(false)}>Cancel</button>
                </span>

                {WorkoutDisplay(
                  updatedExercise,
                  exerciseIndex,
                  editMode,
                  setUpdatedExercise
                )}
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
              className="margin-bottom-sm padding-md flex flex-column aic"
            >
              <div className="width-md">
                <span className="flex gap-lg margin-bottom-md full-width">
                  {exercise.name}
                  <button onClick={() => setEditMode(true)}>Edit</button>
                  <button onClick={(e) => removeExerciseFromLog(exerciseIndex)}>
                    Delete Exercise
                  </button>
                </span>

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
