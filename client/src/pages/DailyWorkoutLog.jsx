import React, { useState } from "react";
import dummyData from "../data/dummyData";
import DailyLog from "../Components/DailyWorkoutLog/DailyLog";
import { convertDateToMMDDYYYYFormat } from "../utils/dateFunctions";
import AddExercisesToDay from "../Components/DailyWorkoutLog/AddExercisesToDay";

const findLogForDate = (date, data) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].date === date) {
      return [data[i], i];
    }
  }
  return [];
};

const DailyWorkoutLog = () => {
  const [data, setData] = useState(dummyData.byDay);
  const [date, setDate] = useState(new Date());

  const handleDateChange = (num) => {
    const newDate = new Date(date.setDate(date.getDate() + num));
    setDate(newDate);
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
    Weight,
    exercise
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
    const updatedData = [...data]
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
    const updatedData = [...data];
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

            setData(updatedData);
            return;
          }
          if (count === 0 && j === updatedData[i].exercises.length - 1) {
            updatedData[i].exercises.push(newExercise);
            count++;
            setData(updatedData);
            return;
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
    }
    setData(updatedData);
  };

  return (
    <>
      <div>
        <button onClick={(e) => handleDateChange(-1)}>left</button>
        <span>{date.toISOString().slice(0, 10)}</span>
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
