import React, { useState, useContext } from "react";
import { DataContext } from "../context/Context";
import { returnDaysWithExercise } from "../utils/filterFunctions";
import { exerciseObjectsWithAllInfo } from "../data/bodySegments";

const ExerciseDropdown = ({ exerciseObject, handleExerciseChange }) => {
  return (
    <>
      <select
        name="exercise"
        id="exercise"
        value={exerciseObject.exercise.name}
        onChange={handleExerciseChange}
      >
        {Object.keys(exerciseObjectsWithAllInfo).map((exercise) => {
          return (
            <option key={`${exercise}`} value={exercise}>
              {exercise}
            </option>
          );
        })}
      </select>
    </>
  );
};

const ExerciseLog = () => {
  const [exerciseObject, setExercise] = useState(
    exerciseObjectsWithAllInfo["Pushups"]
  );
  const context = useContext(DataContext);
  const data = context.data;
  const daysWithExercises = returnDaysWithExercise(data, exerciseObject);
  const handleExerciseChange = (e) => {
    const value = exerciseObjectsWithAllInfo[e.currentTarget.value];
    setExercise(value);
  };
  console.log(exerciseObject);
  return (
    <>
      <ExerciseDropdown
        exerciseObject={exerciseObject}
        handleExerciseChange={handleExerciseChange}
      />
      {daysWithExercises.map((day) => {
        return (
          <div key={day.date}>
            <span>{day.date}</span>
            <span>
              {Object.keys(exerciseObject.exercise.details).map((detail) => {
                return (
                  <span key={detail}>
                    {detail}
                    {day.sets[detail]}
                    </span>
                  )
              })}
            </span>
          </div>
        );
      })}
    </>
  );
};

export default ExerciseLog;
