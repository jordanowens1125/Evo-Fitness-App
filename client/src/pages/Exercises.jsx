import React, { useState, useContext } from "react";
import { exercises, bodySegments, muscleGroups } from "../data/bodySegments";
import { DataContext } from "../context/Context";
import CreateExercise from "../Components/DailyWorkoutLog/CreateExercise";

const Exercises = () => {
  const [unfiltered, setUnFiltered] = useState(exercises);
  const [filtered, setFiltered] = useState(exercises);
  const [segment, setSegment] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [muscleGroupsInSegment, setMuscleGroupsInSegment] =
    useState(muscleGroups);
  const [searchParam, setSearchParam] = useState("");
  //filter by exercises completed
  //filter by exercises in favorites/routines

  function handleParamChange(e) {
    setSearchParam(e.currentTarget.value);
    const newFiltered = unfiltered.filter((item) => {
      const capitalized = item.exercise.name.toUpperCase();
      return capitalized.includes(e.currentTarget.value.toUpperCase());
    });
    setFiltered(newFiltered);
  }

  function removeFilters() {
    setFiltered(exercises);
    setSegment("");
    setMuscleGroup("");
    setMuscleGroupsInSegment(muscleGroups);
  }

  function filterBySegment(value) {
    let newFiltered = exercises.filter(
      (exercise) => exercise.segment === value
    );
    setFiltered(newFiltered);
    setUnFiltered(newFiltered);
  }

  function handleSegmentChange(e) {
    setSegment(e.currentTarget.value);
    if (e.currentTarget.value === "") {
      removeFilters();
    } else {
      filterBySegment(e.currentTarget.value);
      let newMuscleGroups = muscleGroups.filter(
        (group) => group.segment.name === e.currentTarget.value
      );
      setMuscleGroupsInSegment(newMuscleGroups);
    }
  }

  function handleMuscleGroupChange(e) {
    setMuscleGroup(e.currentTarget.value);
    if (e.currentTarget.value === "") {
      removeFilters();
    } else {
      filterByMuscleGroup(e.currentTarget.value);
    }
  }

  function filterByMuscleGroup(value) {
    let newFiltered = exercises.filter(
      (exercise) => exercise.muscleGroup.name === value
    );
    setUnFiltered(newFiltered);
    setFiltered(newFiltered);
  }

  return (
    <>
      Exercises: <CreateExercise />
      <div className="flex aic gap-lg">
        {/* <input
        type="text"
        name=""
        id=""
        value={searchParam}
        onChange={handleParamChange}
      />
      <button onClick={()=> setSearchParam('')}>Clear</button> */}
        <span>
          <label htmlFor="Segment">Body Segment:</label>
          <select
            name="Segment"
            id="Segment"
            value={segment}
            onChange={handleSegmentChange}
          >
            <option value=""></option>
            {bodySegments.map((segment) => {
              return (
                <option key={segment.name} value={segment.name}>
                  {segment.name}
                </option>
              );
            })}
          </select>
        </span>
        <span>
          <label htmlFor="Muscle Group">Muscle Group:</label>
          <select
            name="Muscle Group"
            id="Muscle Group"
            value={muscleGroup}
            onChange={handleMuscleGroupChange}
          >
            <option value=""></option>
            {muscleGroupsInSegment.map((muscleGroup) => {
              return (
                <option key={muscleGroup.name} value={muscleGroup.name}>
                  {muscleGroup.name}
                </option>
              );
            })}
          </select>
        </span>

        <button onClick={removeFilters}>Remove Filters</button>
      </div>
      <div className="flex space-between">
        
        <div>
          {filtered.map((exercise, index) => {
          return (
            <div key={index}>
              {exercise.muscleGroup.image}
              {exercise.name}
              {exercise.muscleGroup.name}
              <button>Add exercise</button>
            </div>
          );
        })}
        </div>
        
      </div>
    </>
  );
};

export default Exercises;
