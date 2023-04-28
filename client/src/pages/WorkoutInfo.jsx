import React, { useState } from "react";
import AllWorkouts from "../Components/WorkoutInfo/AllWorkouts";
import ByDay from "../Components/WorkoutInfo/ByDay";
import ExerciseLog from "../Components/WorkoutInfo/ExerciseLog";
import MuscleGroup from "../Components/WorkoutInfo/MuscleGroup";
import { exerciseObjectsWithAllInfo } from "../data/bodySegments";

const options = ["All", "Muscle Groups", "Exercises"];

const WorkoutInfo = () => {
  const [setting, setSetting] = useState("All");
  const [exerciseObject, setExerciseObject] = useState(
    exerciseObjectsWithAllInfo["Pushups"]
  );
  const handleSettingChange = (e) => {
    setSetting(e.currentTarget.innerHTML);
  };

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
              exerciseObject={exerciseObject}
              setExerciseObject={setExerciseObject}
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
