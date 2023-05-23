import React, { useState, useContext } from "react";
import { DataContext } from "../../Context/Context";
import { returnDaysWithExercise } from "../../Utils/filterFunctions";
import NoData from "../Shared/NoData";
import DisplaySets from "../Shared/DisplaySets";

const displaySets = (exercise) => {
  //get the detail
  //get the length
  //for each index in length get all detail info
  const keys = Object.keys(exercise.sets);
  const reference = keys[0];
  const length = exercise.sets[reference].length;
  const indexMap = [];
  for (let i = 0; i < length; i++) {
    indexMap.push(i);
  }

  return (
    <>
      {indexMap.map((index) => {
        return (
          <div key={index}>
            {keys.map((key) => {
              return (
                <span key={key}>
                  {key} : {exercise.sets[key][index]}{" "}
                  {exercise.details[key].units} x{"  "}
                  {/* {exercise.exercise.details[key].units} - {"  "} */}
                </span>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

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
