import React, { useState } from "react";

function InputByTypes(exercise, values, updateInput) {
  switch (exercise.kind) {
    case "Weights/Reps":
      return (
        <>
          <input
            type="number"
            name=""
            id="new-Set-Repetition"
            value={values.Repetition}
            onChange={updateInput}
          />
          <input
            type="number"
            name=""
            id="new-Set-Weight"
            value={values.Weight}
            onChange={updateInput}
          />
          {exercise.units}
        </>
      );
    case "Distance/Time":
      return (
        <>
          <input
            type="number"
            name=""
            id="new-Set-Time"
            value={values.Time}
            onChange={updateInput}
          />
          <input
            type="number"
            name=""
            id="new-Set-Distance"
            value={values.Distance}
            onChange={updateInput}
          />
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
  const [inputValues, setInputValues] = useState({
    Time: 0,
    Weight: 0,
    Repetition: 1,
    Distance:0,
  })
  
  const cancel = () => {
    setShowPotentialNewSet(false);
    setInputValues({
      Time: 0,
      Weight: 0,
      Repetition: 1,
      Distance: 0,
    });
  };

  const updateInput = (e) => {
    const changedValue = e.currentTarget.id.split("-")[2];
    const newValues = { ...inputValues }
    newValues[changedValue] = +e.currentTarget.value
    setInputValues(newValues)
  }

  const addNewSet = () => {
    let returnItem
    switch (exercise.kind) {
      case "Weights/Reps":
        // const newReps = document.getElementById("newSetReps").value;
        // const newWeight = document.getElementById("newSetWeight").value;
        returnItem = { };
        returnItem['Reps'] = +inputValues.Repetition
        returnItem['Weight'] = +inputValues.Weight
        addSetToExerciseEntry(exerciseIndex, returnItem);
        break;
      case "Distance/Time":
        const newTime = inputValues.Time
        const newDistance = inputValues.Distance
        // const newTime = document.getElementById("newSetTime").value;
        // const newDistance = document.getElementById("newSetDistance").value;
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
          {InputByTypes(exercise, inputValues, updateInput)}
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
