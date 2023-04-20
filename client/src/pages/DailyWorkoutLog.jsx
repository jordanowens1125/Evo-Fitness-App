import React, { useState, useContext } from "react";
import DailyLog from "../Components/DailyWorkoutLog/DailyLog";
import {
  convertDateToMMDDYYYYFormat,
  sortObjectsWithDatePropertyInMMDDYYYY,
} from "../utils/dateFunctions";
import AddExercisesToDay from "../Components/DailyWorkoutLog/AddExercisesToDay";
import { DataContext } from "../context/Context";
import AddRoutineToDay from "../Components/DailyWorkoutLog/AddRoutineToDay";
import { findExerciseDetails } from "../utils/exerciseFunctions";

const findLogForDate = (date, data) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].date === date) {
      return [data[i], i];
    }
  }
  return [];
};

const DailyWorkoutLog = () => {
  const context = useContext(DataContext);
  const data = context.data;
  const setData = context.setData;
  const routines = context.routines;
  const setRoutines = context.setRoutines;

  const [date, setDate] = useState(new Date());
  const test = convertDateToMMDDYYYYFormat(date);
  const [dailyLog, logIndex] = findLogForDate(test, data);

  const addRoutine = (listOfExercises) => {
    let copy = [...data]
    for (let i = 0; i < listOfExercises.length; i++){
      copy = addExerciseForDay(listOfExercises[i], copy)
    }
    setData(copy)
  };

  const handleDateChange = (num) => {
    const newDate = new Date(date.setDate(date.getDate() + num));
    setDate(newDate);
  };

  const jumpToDate = (e) => {
    const [year, month, day] = e.currentTarget.value.split("-");
    setDate(new Date(year, +month - 1, day));
  };

  const removeExerciseFromLog = (exerciseIndex) => {
    const updatedData = [...data];
    updatedData[logIndex].exercises.splice(exerciseIndex, 1);
    if (updatedData[logIndex].exercises.length === 0) {
      updatedData.splice(logIndex, 1);
    }
    setData(updatedData);
  };

  const saveRoutine = () => {
    const updatedRoutines = [...routines];
    const copiedExercises = [...dailyLog.exercises];
    updatedRoutines.push(copiedExercises);
    setRoutines(updatedRoutines);
  };

  const updateExerciseEntryForDay = (exercise, exerciseIndex) => {
    const updatedData = [...data];
    updatedData[logIndex].exercises[exerciseIndex] = exercise;
    setData(updatedData);
  };

  const removeSetFromExercise = (exerciseIndex, setIndex) => {
    const updatedData = [...data];
    updatedData[logIndex].exercises[exerciseIndex].sets.Repetition.splice(
      setIndex,
      1
    );
    updatedData[logIndex].exercises[exerciseIndex].sets.Weight.splice(
      setIndex,
      1
    );
    if (
      updatedData[logIndex].exercises[exerciseIndex].sets.Repetition.length ===
        0 ||
      updatedData[logIndex].exercises[exerciseIndex].sets.Weight.length === 0
    ) {
      updatedData[logIndex].exercises.splice(exerciseIndex, 1);
      //if day empty
      if (updatedData[logIndex].exercises.length === 0) {
        updatedData.splice(logIndex, 1);
      }
    }
    setData(updatedData);
  };

  const addSetToExerciseEntry = (exerciseIndex, object) => {
    const updatedData = [...data];
    const details = Object.keys(object);
    for (let i = 0; i < details.length; i++) {
      const currentDetail =
        updatedData[logIndex].exercises[exerciseIndex].sets[details[i]];
      if (currentDetail) {
        currentDetail.push(+object[details[i]]);
      }
    }
    setData(updatedData);
  };

  const addExerciseForDay = (newExercise, dateData=data) => {
    const inputDate = convertDateToMMDDYYYYFormat(date);
    const score = 1;
    //insert exercise for date
    let count = 0;
    let updatedData = structuredClone(dateData);
    for (let i = 0; i < updatedData.length; i++) {
      let dataForDay = updatedData[i];
      if (dataForDay.date === inputDate) {
        for (let j = 0; j < dataForDay.exercises.length; j++) {
          //check and see if exercise is already present
          if (newExercise.name === dataForDay.exercises[j].name) {
            const details = findExerciseDetails(newExercise);
            for (let i = 0; i < details.length; i++) {
              const detail = details[i];
              dataForDay.exercises[j].sets[detail] = dataForDay.exercises[
                j
              ].sets[detail].concat(newExercise.sets[detail]);
            }
            count += 1;
          }
          //if exercise is not present in day
          //include exercise length to ensure it only happens after getting to end of list
          if (count === 0 && j === dataForDay.exercises.length - 1) {
            dataForDay.exercises.push(newExercise);
            count += 1;
            //be sure to break to prevent adding to list again
            break;
          }
        }
        updatedData[i] = dataForDay;
      }
    }

    if (count === 0) {
      updatedData.push({
        date: inputDate,
        score,
        exercises: [newExercise],
      });
      //sort newly added day
      updatedData = sortObjectsWithDatePropertyInMMDDYYYY(updatedData);
    }
    // console.log(updatedData);
    setData(updatedData);
    return updatedData
  };

  return (
    <>
      <div>
        <button onClick={(e) => handleDateChange(-1)}>left</button>
        <label htmlFor="Date">Date:</label>
        <input
          type="date"
          id="start"
          name="Date"
          value={date.toISOString().slice(0, 10)}
          min="2023-04-01"
          max="2040-12-31"
          onChange={jumpToDate}
        ></input>
        <button onClick={(e) => handleDateChange(1)}>right</button>
      </div>

      {/* Form to add exercises */}
      <AddExercisesToDay addExerciseForDay={addExerciseForDay} />
      {/* End of Form to add exercises */}
      <AddRoutineToDay addRoutine={addRoutine} />

      <div>
        {dailyLog ? (
          <>
            <button onClick={saveRoutine}>Save today as routine</button>
            <DailyLog
              log={dailyLog}
              test={test}
              removeExerciseFromLog={removeExerciseFromLog}
              updateExerciseEntryForDay={updateExerciseEntryForDay}
              addSetToExerciseEntry={addSetToExerciseEntry}
              removeSetFromExercise={removeSetFromExercise}
            />
          </>
        ) : (
          "No exercises"
        )}
      </div>
    </>
  );
};

export default DailyWorkoutLog;
