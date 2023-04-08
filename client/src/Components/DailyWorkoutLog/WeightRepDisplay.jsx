import React, { useState } from "react";

const WeightRepDisplay = ({
  Repetition,
  Weight,
  SetIndex,
  Units,
  updateExerciseEntryForDay,
  exerciseIndex,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [reps, setReps] = useState(Repetition);
  const [weight, setWeight] = useState(Weight);

  const handleEdit = () => {
    const newReps = document.getElementById(
      `Exercise${exerciseIndex}Set${SetIndex}Repetition`
    ).value;
    const newWeight = document.getElementById(
      `Exercise${exerciseIndex}Set${SetIndex}Weight`
    ).value;

    updateExerciseEntryForDay(exerciseIndex, SetIndex, newReps, newWeight);
    setEditMode(false);
  };
  const cancel = () => {
      setEditMode(false);
      setReps(reps)
      setWeight(weight)
  };

  const handleInputChange = (e) => {
    if (
      e.currentTarget.id === `Exercise${exerciseIndex}Set${SetIndex}Repetition`
    ) {
      setReps(e.currentTarget.value)
      }
    else {
        setWeight(e.currentTarget.value);
      }
  };

  return (
    <>
      {editMode ? (
        <>
          <input
            type="number"
            name={`Exercise${exerciseIndex}Set${SetIndex}`}
            id={`Exercise${exerciseIndex}Set${SetIndex}Repetition`}
            value={reps}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name=""
            id={`Exercise${exerciseIndex}Set${SetIndex}Weight`}
            value={weight}
            onChange={handleInputChange}
          />
          <button onClick={handleEdit}>Submit</button>
          <button onClick={cancel}>Cancel</button>
        </>
      ) : (
        <>
          Reps: {Repetition} - Weight: {Weight} {Units}
          <button onClick={(e) => setEditMode(!editMode)}>Edit</button>
        </>
      )}
    </>
  );
};

export default WeightRepDisplay;
