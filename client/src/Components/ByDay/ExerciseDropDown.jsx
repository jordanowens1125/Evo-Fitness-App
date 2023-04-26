import React from 'react'
import {exercises} from '../../data/exerciseCategories'

const ExerciseDropDown = ({ exercise, handleExerciseChange }) => {
  //only exercises that have the correct kind can be used as an option
  return (
    <select
      name="exercise"
      id="exercise"
      onChange={handleExerciseChange}
      value={exercise}
    >
      {exercises.map((exercise) => (
        <option value={exercise.name} key={exercise.name}>
          {" "}
          {exercise.name}
        </option>
      ))}
    </select>
  );
};

export default ExerciseDropDown