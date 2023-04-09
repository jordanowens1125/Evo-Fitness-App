import React, { useState, useContext } from "react";
import { DataContext } from "../Context/Context";

const AllWorkouts = () => {
  const context = useContext(DataContext);
  const data = context.data;
  return (
    <>
      <div>All Workouts</div>
      {data.map((item) => {
          return (
            <div key={item.date}>
                  {item.date}
                  {
                      item.exercises.map((exercise) => {
                          //Depends on exercise
                          return (
                              <ul key={item.date+exercise.name}>
                                  {
                                      exercise.name
                                      
                                  }
                                  {exercise.sets.Repetition.map((reps,index) => {
                                      return (
                                          <li key={item.date+exercise.name+reps}>
                                              {
                                                reps
                                              }
                                              reps X 
                                              
                                              {
                                                exercise.sets.Weight[index]
                                              }

                                              {
                                                  exercise.units
                                              }
                                          </li>
                                      )
                                      })}
                                  </ul>
                          )
                      })
                  }
            </div>);
      })}
    </>
  );
};

export default AllWorkouts;
