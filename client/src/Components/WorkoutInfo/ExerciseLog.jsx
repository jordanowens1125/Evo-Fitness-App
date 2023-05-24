import React, { useContext } from "react";
import { DataContext } from "../../Context/Context";
import { returnDaysWithExercise } from "../../utils/filterFunctions";
import NoData from "../Shared/NoData";
import DisplaySets from "../Shared/DisplaySets";

const ExerciseLog = (exerciseObject) => {
  const context = useContext(DataContext);
  const data = context.data;
  const daysWithExercises = returnDaysWithExercise(
    data,
    exerciseObject.exerciseObject
  );

  return (
    <>
      {daysWithExercises.length === 0 ? (
        <NoData />
      ) : (
        daysWithExercises.map((day) => {
          return (
            <section key={day.date} className="margin-md padding-md">
              <h3 className="primary heading-md margin-bottom-md">
                {day.date}
              </h3>
              <div>
                <DisplaySets exercise={day} />
              </div>
            </section>
          );
        })
      )}
    </>
  );
};

export default ExerciseLog;
