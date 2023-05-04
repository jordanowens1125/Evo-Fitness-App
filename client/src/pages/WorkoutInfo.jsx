import React, { useState, useContext } from "react";
import AllWorkouts from "../Components/WorkoutInfo/AllWorkouts";
import ByDay from "../Components/WorkoutInfo/ByDay";
import ExerciseLog from "../Components/WorkoutInfo/ExerciseLog";
import MuscleGroup from "../Components/WorkoutInfo/MuscleGroup";
import { DataContext } from "../context/Context";

// const options = ["All", "Muscle Groups", "Exercises"];
const options = ['All', 'Exercises']

const WorkoutInfo = () => {
  const [setting, setSetting] = useState("All");
  const context = useContext(DataContext);
  const exercises = context.exerciseList;
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [exerciseObject, setExerciseObject] = useState(exercises[0])
  const handleSettingChange = (e) => {
    setSetting(e.currentTarget.innerHTML);
  };

  const handleExerciseChange = (index) => {
    setExerciseIndex(index)
    setExerciseObject(exercises[index])
  }
  const settingSwitch = function (setting) {
    switch (setting) {
      case "All":
        return <AllWorkouts />;
      case "Muscle Groups":
        return <MuscleGroup />;
      case "Exercises":
        return (
          <>
            <ByDay
              exerciseIndex={exerciseIndex}
              setExerciseIndex={handleExerciseChange}
            />
            <ExerciseLog exerciseObject={exerciseObject} />
          </>
        );
      default:
        return <AllWorkouts />;
    }
  };

  return (
    <>
      <div>
        <span className="flex margin-bottom-lg jcc wrap">
          {options.map((option) => {
            return (
              <div
                className={
                  setting === option
                    ? "active padding-sm secondary-border"
                    : "secondary-border padding-sm inactive"
                }
                onClick={handleSettingChange}
                key={option}
              >
                {option}
              </div>
            );
          })}
        </span>

        {settingSwitch(setting)}
      </div>
    </>
  );
};

export default WorkoutInfo;
