import React from 'react'
import kindsOfExercises from '../../data/exerciseCategories';

const ExerciseDropDown = ({ exercise, setExercise, kind }) => {
  //only exercises that have the correct kind can be used as an option
  return (
    <select
      name="exercise"
      id="exercise"
      onChange={(e) => setExercise(e.currentTarget.value)}
      value={exercise}
    >
      {kindsOfExercises[kind]["exercises"].map((exercise) => (
        <option value={exercise} key={exercise}>
          {" "}
          {exercise}
        </option>
      ))}
    </select>
  );
};

export default ExerciseDropDown