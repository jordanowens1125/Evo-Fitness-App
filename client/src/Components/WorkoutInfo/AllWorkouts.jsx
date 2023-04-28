import React, { useState, useContext } from "react";
import { DataContext } from "../../context/Context";
import NoData from "../Shared/NoData";

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
                  {key} {exercise.sets[key][index]}
                  {"  "}
                  {exercise.details[key].units} - {"  "}
                </span>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

const AllWorkouts = () => {
  const context = useContext(DataContext);
  const data = context.data;

  return (
    <>
      <div className="page">
        <h1 className="padding-md">All Workouts</h1>
        {data.length > 0 ? (
          <>
            {data.map((item) => {
              return (
                <div key={item.date} className="secondary-border padding-md">
                  <h3 className="primary heading-md margin-bottom-md">
                    Date: {item.date}
                  </h3>

                  {item.exercises.map((exercise) => {
                    //Depends on exercise
                    return (
                      <section
                        className="padding-md"
                        key={item.date + exercise.name}
                      >
                        <h4 className="heading-sm margin-bottom-md">
                          {exercise.name}
                        </h4>
                        {displaySets(exercise)}
                      </section>
                    );
                  })}
                </div>
              );
            })}
          </>
        ) : (
          <>
            <NoData />
          </>
        )}
      </div>
    </>
  );
};

export default AllWorkouts;
