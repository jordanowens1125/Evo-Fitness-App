import React, { useState, useContext } from "react";
import DailyLog from "../Components/DailyWorkoutLog/DailyLog";
import {
  convertDateToMMDDYYYYFormat,
  sortObjectsWithDatePropertyInMMDDYYYY,
} from "../utils/dateFunctions";
import AddExercisesToDay from "../Components/DailyWorkoutLog/AddExercisesToDay";
import { DataContext } from "../Context/Context";

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
  const [date, setDate] = useState(new Date());

  const handleDateChange = (num) => {
    const newDate = new Date(date.setDate(date.getDate() + num));
    setDate(newDate);
  };

  const jumpToDate = (e) => {
    const [year, month, day] = e.currentTarget.value.split("-")
    setDate(new Date(year, +month-1,day));
  };

  const test = convertDateToMMDDYYYYFormat(date);
  const [dailyLog, logIndex] = findLogForDate(test, data);

  const removeExerciseFromLog = (exerciseIndex) => {
    const updatedData = [...data];
    updatedData[logIndex].exercises.splice(exerciseIndex, 1);
    if (updatedData[logIndex].exercises.length === 0) {
      updatedData.splice(logIndex, 1);
    }
    setData(updatedData);
  };

  const updateExerciseEntryForDay = (
    exerciseIndex,
    setIndex,
    Repetition,
    Weight
    // exercise
  ) => {
    const updatedData = [...data];
    updatedData[logIndex].exercises[exerciseIndex].sets.Repetition[setIndex] =
      Repetition;
    updatedData[logIndex].exercises[exerciseIndex].sets.Weight[setIndex] =
      Weight;
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
    switch (updatedData[logIndex].exercises[exerciseIndex].kind) {
      case "Weights/Reps":
        updatedData[logIndex].exercises[exerciseIndex].sets.Repetition.push(
          object.Reps
        );
        updatedData[logIndex].exercises[exerciseIndex].sets.Weight.push(
          object.Weight
        );
        break;
      case "Distance/Time":
        updatedData[logIndex].exercises[exerciseIndex].sets.Time.push(
          object.Time
        );
        updatedData[logIndex].exercises[exerciseIndex].sets.Distance.push(
          object.Distance
        );
        break;
      default:
        break;
    }
    setData(updatedData);
  };
  const addExerciseForDay = (newExercise) => {
    const inputDate = convertDateToMMDDYYYYFormat(date);
    const score = 1;
    //insert exercise for date
    let count = 0;
    let updatedData = [...data];
    for (let i = 0; i < updatedData.length; i++) {
      if (updatedData[i].date === inputDate) {
        for (let j = 0; j < updatedData[i].exercises.length; j++) {
          if (newExercise.name === updatedData[i].exercises[j].name) {
            count += 1;
            switch (newExercise.kind) {
              case "Weights/Reps":
                updatedData[i].exercises[j].sets.Repetition.push.apply(
                  updatedData[i].exercises[j].sets.Repetition,
                  newExercise.sets.Repetition
                );
                updatedData[i].exercises[j].sets.Weight.push.apply(
                  updatedData[i].exercises[j].sets.Weight,
                  newExercise.sets.Weight
                );
                break;
              case "Distance/Time":
                updatedData[i].exercises[j].sets.Time.push.apply(
                  updatedData[i].exercises[j].sets.Time,
                  newExercise.sets.Time
                );
                updatedData[i].exercises[j].sets.Distance.push.apply(
                  updatedData[i].exercises[j].sets.Distance,
                  newExercise.sets.Distance
                );
                break;
              default:
                break;
            }
          }

          if (count === 0 && j === updatedData[i].exercises.length - 1) {
            updatedData[i].exercises.push(newExercise);
            count++;
          }
        }
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
    setData(updatedData);
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

      <div>
        {dailyLog ? (
          <DailyLog
            log={dailyLog}
            test={test}
            removeExerciseFromLog={removeExerciseFromLog}
            updateExerciseEntryForDay={updateExerciseEntryForDay}
            addSetToExerciseEntry={addSetToExerciseEntry}
            removeSetFromExercise={removeSetFromExercise}
          />
        ) : (
          "No exercises"
        )}
      </div>
    </>
  );
};

export default DailyWorkoutLog;
