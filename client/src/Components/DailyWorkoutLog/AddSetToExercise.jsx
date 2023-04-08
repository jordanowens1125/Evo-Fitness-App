import React, { useState } from "react";

function InputByTypes(exercise, values) {
  switch (exercise.kind) {
    case "Weights/Reps":
      return (
        <>
          <input type="number" name="" id="newSetReps" value={values[0]} />
          <input type="number" name="" id="newSetWeight" value={values[1]} />
          {exercise.units}
        </>
      );
    case "Distance/Time":
      return (
        <>
          <input type="number" name="" id="newSetTime" value={values[0]} />
          <input type="number" name="" id="newSetDistance" value={values[1]} />
          {exercise.units}
        </>
      );
    default:
      <></>;
  }
}

const AddSetToExercise = ({
  addSetToExerciseEntry,
  exerciseIndex,
  exercise,
}) => {
  const [showPotentialNewSet, setShowPotentialNewSet] = useState(false);
  const inputValues = useState([0, 0, 0, 0, 0])
  
  const cancel = () => {
    setShowPotentialNewSet(false);
  };

  const addNewSet = () => {
    let returnItem
    switch (exercise.kind) {
      case "Weights/Reps":
        const newReps = document.getElementById("newSetReps").value;
        const newWeight = document.getElementById("newSetWeight").value;
        returnItem = { };
        returnItem['Reps'] = newReps
        returnItem['Weight'] = newWeight
        addSetToExerciseEntry(exerciseIndex, returnItem);
        break;
      case "Distance/Time":
        const newTime = document.getElementById("newSetTime").value;
        const newDistance = document.getElementById("newSetDistance").value;
        returnItem = {Time: +newTime, Distance: +newDistance}
        addSetToExerciseEntry(exerciseIndex, returnItem);
        break;
      default:
        return;
    }
    // setShowPotentialNewSet(false);
  };

  return (
    <>
      {showPotentialNewSet ? (
        <>
          {InputByTypes(exercise, inputValues)}
          <button onClick={addNewSet}>Add Set</button>
          <button onClick={cancel}>Cancel</button>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              setShowPotentialNewSet(true);
            }}
          >
            New Set?
          </button>
        </>
      )}
    </>
  );
};

export default AddSetToExercise;
