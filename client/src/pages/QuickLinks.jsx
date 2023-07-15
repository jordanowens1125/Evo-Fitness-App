import React from "react";
import CreateExercise from "../Components/CreateExercise/CreateExercise";
import CreateWorkout from "../Components/CreateWorkout/CreateWorkout";
const QuickLinks = () => {
  return (
    <>
      <div className="flex-column gap-lg aic">
        <CreateExercise />
        <CreateWorkout />
      </div>
    </>
  );
};

export default QuickLinks;
