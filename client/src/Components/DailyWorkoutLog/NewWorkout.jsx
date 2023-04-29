import React from "react";
import Exercises from "../../pages/Exercises";
import CreateExercise from "./CreateExercise";

const NewWorkout = ({ cancel }) => {
  return (
    <section className="modal">
      <div className="modal-content">
        <span className="flex space-between full-width">
          <h3>New Workout:</h3> <button onClick={cancel}>X</button>
        </span>
        <div className="flex space-between gap-lg">
          <div className="bg padding-lg grow">Current Exercises:</div>
          <div className="grow flex bg padding-lg">
            <Exercises />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewWorkout;
