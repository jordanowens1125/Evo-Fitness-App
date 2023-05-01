import React from "react";
import CreateExercise from "../Components/Shared/CreateExercise";
import CreateWorkout from "../Components/Shared/CreateWorkout";
const QuickLinks = () => {
  return (
    <>
      <div className="flex-column gap-lg aic">
        <CreateExercise />
        <CreateWorkout/>
      </div>
    </>
  );
};

export default QuickLinks;
