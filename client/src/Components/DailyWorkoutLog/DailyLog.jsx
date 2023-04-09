import React from 'react'
import WeightRepDisplay from './WeightRepDisplay';
import AddSetToExercise from './AddSetToExercise';
import DistanceTimeDisplay from './DistanceTimeDisplay';

const DailyLog = ({
  log,
  removeExerciseFromLog,
  updateExerciseEntryForDay,
  addSetToExerciseEntry,
  removeSetFromExercise,
}) => {

  const DifferentWorkoutDisplay = (exercise, exerciseIndex) => {
    switch (exercise.kind) {
      case "Weights/Reps":
        return (
          exercise.sets.Repetition.map((rep, setIndex) => {
            return (
              <div key={setIndex}>
                <WeightRepDisplay
                  Repetition={rep}
                  Weight={exercise.sets.Weight[setIndex]}
                  SetIndex={setIndex}
                  Units={exercise.units}
                  updateExerciseEntryForDay={updateExerciseEntryForDay}
                  exerciseIndex={exerciseIndex}
                ></WeightRepDisplay>
                <button
                  onClick={(e) =>
                    removeSetFromExercise(exerciseIndex, setIndex)
                  }
                >
                  Remove Set
                </button>
              </div>
            );
          }))
          ;
      case "Distance/Time":
        return exercise.sets.Time.map((time, setIndex) => {
          return (
            <div key={setIndex}>
              <DistanceTimeDisplay
                Time={time}
                Distance={exercise.sets.Distance[setIndex]}
                SetIndex={setIndex}
                Units={exercise.units}
                updateExerciseEntryForDay={updateExerciseEntryForDay}
                exerciseIndex={exerciseIndex}
              ></DistanceTimeDisplay>
              <button
                onClick={(e) => removeSetFromExercise(exerciseIndex, setIndex)}
              >
                Remove Set
              </button>
            </div>
          );
        });
      default:
        return <h1>No exercise of this kind</h1>;
    }
  }
  return (
    <>
      {log.exercises.map((exercise, exerciseIndex) => {
        return (
          <div key={exercise.name}>
            {exercise.name}
            <button onClick={(e) => removeExerciseFromLog(exerciseIndex)}>
              Delete this exercise from day
            </button>
            {/* Depends on exercise type */}
            Sets:
            {DifferentWorkoutDisplay(exercise,exerciseIndex)}
            <AddSetToExercise exerciseIndex={exerciseIndex} addSetToExerciseEntry={addSetToExerciseEntry} exercise={exercise} />
          </div>
        );
      })}
    </>
  );
};

export default DailyLog