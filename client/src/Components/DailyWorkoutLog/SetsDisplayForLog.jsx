import React, { useEffect, useState } from "react";
import { kindsOfExercises } from "../../data/exerciseCategories";
const SetsDisplayForLog = ({
  exercise,
  SetIndex,
  exerciseIndex,
  editMode,
  removeSetFromExercise,
  setUpdatedExercise,
}) => {

  const details = Object.keys(exercise.exercise.exercise.details);

  const handleInputChange = (e) => {
    const splitID = e.currentTarget.id.split("-");
    const updatedExercise = { ...exercise };
    //the detail is stored as the last item after the split
    updatedExercise.sets[splitID[3]][SetIndex] = +e.currentTarget.value;
    setUpdatedExercise(updatedExercise)
  };

  return (
    <>
      {editMode ? (
        <>
          {details.map((detail) => {
            return (
              <span key={`${detail}-input`}>
                <input
                  key={detail}
                  type="number"
                  name={`Exercise${exercise.name}Set${SetIndex}${detail}`}
                  id={`Log-Exercise${exercise.name}-Set${SetIndex}-${detail}`}
                  value={exercise.sets[detail][SetIndex]}
                  placeholder={detail}
                  onChange={handleInputChange}
                />
              </span>
            );
          })}
          {exercise.units}
          <button
            onClick={() => removeSetFromExercise(exerciseIndex, SetIndex)}
          >
            Remove Set
          </button>
        </>
      ) : (
        <>
          {details.map((detail) => {
            return (
              <span key={`${detail}-input`}>
                <div>
                  {detail}
                  {exercise.sets[detail][SetIndex]}
                </div>
              </span>
            );
          })}
          {exercise.units}
        </>
      )}
    </>
  );
};

export default SetsDisplayForLog;
