import React, { useState } from "react";
import { kindsOfExercises } from "../../data/exerciseCategories";

const WeightsReps = (newExercise, index, reps, weight, handleSetChange) => {
  const handleChange = (e) => {
    handleSetChange(index, e.currentTarget.value, e.currentTarget.id);
  };
  return (
    <>
      <input
        type="number"
        name=""
        id={`Repetition`}
        placeholder="Reps"
        value={reps}
        onChange={handleChange}
      />
      <input
        type="number"
        name=""
        id={`Weight`}
        placeholder="Weight"
        value={weight}
        onChange={handleChange}
      />
      {newExercise.units}
    </>
  );
};

const TimeDistance = (newExercise, index, time, distance, handleSetChange) => {
  const handleChange = (e) => {
    handleSetChange(index, e.currentTarget.value, e.currentTarget.id);
  };
  return (
    <>
      <input
        type="number"
        name=""
        id={`Time`}
        placeholder="Time"
        value={time}
        onChange={handleChange}
      />
      <input
        type="number"
        name=""
        id={`Distance`}
        placeholder="Distance"
        value={distance}
        onChange={handleChange}
      />
      {newExercise.units}
    </>
  );
};

const DifferentWorkoutDisplay = (newExercise, handleSetChange) => {
  switch (newExercise.kind) {
    case "Weights/Reps":
      return newExercise.sets.Repetition.map((reps, index) => {
        return (
          <li key={index}>
            {WeightsReps(
              newExercise,
              index,
              reps,
              newExercise.sets.Weight[index],
              handleSetChange
            )}
          </li>
        );
      });
    case "Distance/Time":
      return newExercise.sets.Time.map((time, index) => {
        return (
          <li key={index}>
            {TimeDistance(
              newExercise,
              index,
              time,
              newExercise.sets.Distance[index],
              handleSetChange
            )}
          </li>
        );
      });

    default:
      return <h1>No exercise of this kind</h1>;
  }
};

const AddExercisesToDay = ({ addExerciseForDay }) => {
  const [newWorkoutMode, setNewWorkoutMode] = useState(false);
  const [newSetMode, setNewSetMode] = useState(false);
  const [exerciseValue, setExerciseValue] = useState(0);

  let exercises = [];

  Object.keys(kindsOfExercises).forEach(function (key) {
    const exerciseObjects = kindsOfExercises[key].exercises.map((exercise) => {
      return {
        name: exercise,
        kind: key,
        units: kindsOfExercises[key].units,
      };
    });
    exercises = [...exercises, ...exerciseObjects];
  });

  const [newExercise, setNewExercise] = useState({
    name: exercises[0].name,
    kind: exercises[0].kind,
    units: exercises[0].units,
    sets: {
      Repetition: [1],
      Weight: [0],
    },
  });

  const handleNewWorkoutMode = () => {
    setNewWorkoutMode(true);
  };

  const cancel = () => {
    setNewWorkoutMode(false);
    setExerciseValue(0)
    setNewExercise({
      name: exercises[0].name,
      kind: exercises[0].kind,
      units: exercises[0].units,
      sets: {
        Repetition: [1],
        Weight: [0],
      },
    });
  };

  const setExerciseName = (e) => {
    const updatedExercise = { ...newExercise };
    setExerciseValue(e.currentTarget.value);
    updatedExercise["name"] = exercises[e.currentTarget.value].name;
    updatedExercise["kind"] = exercises[e.currentTarget.value].kind;
    updatedExercise["units"] = exercises[e.currentTarget.value].units;
    const copiedSets = structuredClone(
      kindsOfExercises[exercises[e.currentTarget.value].kind].defaultSets
    );
    updatedExercise.sets = copiedSets
    setNewExercise(updatedExercise);
  };

  const addNewSetToExercise = () => {
    const updatedExercise = { ...newExercise };
    switch (newExercise.kind) {
      case "Weights/Reps":
        updatedExercise.sets.Repetition = [
          ...updatedExercise.sets.Repetition,
          1,
        ];
        updatedExercise.sets.Weight = [...updatedExercise.sets.Weight, 0];
        break;
      case "Distance/Time":
        updatedExercise.sets.Distance = [...updatedExercise.sets.Distance, 0];
        updatedExercise.sets.Time = [...updatedExercise.sets.Time, 0];
        break;
      default:
        break;
    }
    setNewExercise(updatedExercise);
  };

  const addNewExerciseAndSets = () => {
    addExerciseForDay(newExercise);
    cancel();
  };

  const handleSetChange = (index, value, itemname) => {
    const updatedExercise = { ...newExercise };
    updatedExercise.sets[itemname][index] = value;
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
              <option value={index} key={exercise.name}>
                {" "}
                {exercise.name}
              </option>
            ))}
          </select>
          {/* Dropdown depends on exercise type */}

          {DifferentWorkoutDisplay(newExercise, handleSetChange)}

          <button onClick={addNewSetToExercise}>Add new set</button>
          <button onClick={addNewExerciseAndSets}>
            Add Exercise and its sets to Day
          </button>
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
