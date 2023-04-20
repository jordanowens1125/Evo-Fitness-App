import React, { useState, useContext } from "react";
import { DataContext } from "../context/Context";
import { returnDaysWithExercise } from "../utils/filterFunctions";
import { kindsOfExercises, exercises } from "../data/exerciseCategories";

const ExerciseDropdown = ({ exercise, handleExerciseChange }) => {
  return (
    <>
      <select
        name="exercise"
        id="exercise"
        value={exercise}
        onChange={handleExerciseChange}
      >
        {exercises.map((exercise) => {
          return (
            <option key={`${exercise.name}`} value={exercise.name}>
              {exercise.name}
            </option>
          );
        })}
      </select>
    </>
  );
};

const ExerciseLog = () => {
  const [kindOfExercise, setKindofExercise] = useState("Weights/Reps");
  const [exercise, setExercise] = useState(exercises[0].name);
  const context = useContext(DataContext);
  const data = context.data;
  const daysWithExercises = returnDaysWithExercise(data, exercise);
  const handleExerciseChange = (e) => {
    setExercise(e.currentTarget.value);
  };

  return (
    <>
      <ExerciseDropdown
        exercise={exercise}
        handleExerciseChange={handleExerciseChange}
      />

      {daysWithExercises.map((idk) => {
        return (
          <div key={idk.date}>
            {idk.date}
            {/* Different details needs to be displays differently */}
            {kindsOfExercises[kindOfExercise].details.map((detail) => {
              return (
                <>
                  <div>{detail}</div>
                  <div>{idk.sets[detail]}</div>
                  {/* Fix when units are displayed */}
                  <div>{idk.units}</div>
                </>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default ExerciseLog;
