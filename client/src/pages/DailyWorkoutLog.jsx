import { useState, useContext, useEffect } from "react";
import DailyLog from "../Components/DailyWorkoutLog/DailyLog";
import { convertDateToMMDDYYYYFormat } from "../utils/dateFunctions";
import AddExercisesToDay from "../Components/DailyWorkoutLog/AddExercisesToDay";
import { DataContext } from "../Context/Context";
import AddRoutineToDay from "../Components/DailyWorkoutLog/AddRoutineToDay";
import { findIndex } from "../utils/searchFunction";
import NoData from "../Components/Shared/NoData";
import DateComponent from "../Components/Shared/Date";
import useAuthContext from "../hooks/useAuthContext";

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
  const setExerciseList = context.setExerciseList;
  const setWeightLog = context.setWeightLog;
  const [date, setDate] = useState(new Date());

  const { user } = useAuthContext();
  useEffect(() => {
    async function fetchData() {
      //get user data
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      
      const json = await response.json();
      if (response.ok) {
        setRoutines(json.user.routines);
        if (json.user.exercises.length > 0) {
          setExerciseList(json.user.exercises);
        }
        setData(json.user.log);
        setWeightLog(json.user.weightLog);
      }
    }

    if (user) {
      fetchData();
    }
  }, [user, setExerciseList, setRoutines, setData, setWeightLog]);

  const formattedDate = convertDateToMMDDYYYYFormat(date);

  const [dailyLog, logIndex] = findLogForDate(formattedDate, data);

  const addRoutine = (listOfExercises) => {
    let copy = [...data];
    const arr = JSON.parse(JSON.stringify(listOfExercises));
    addExercisesForDay(arr, copy);
  };

  const handleDateChange = (num) => {
    const newDate = new Date(date.setDate(date.getDate() + num));
    setDate(newDate);
  };

  const jumpToDate = (e) => {
    const [year, month, day] = e.currentTarget.value.split("-");
    setDate(new Date(year, +month - 1, day));
  };

  const removeExerciseFromLog = async (exerciseIndex) => {
    const updatedData = [...data];
    updatedData[logIndex].exercises.splice(exerciseIndex, 1);
    if (updatedData[logIndex].exercises.length === 0) {
      updatedData.splice(logIndex, 1);
    }

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users/updatelog`,
      {
        method: "PUT",
        body: JSON.stringify(updatedData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (!response.ok) {
      console.log("Error");
      //setError
    }
    if (response.ok) {
      setData(updatedData);
    }
  };

  const saveRoutine = async () => {
    const updatedRoutines = [...routines];
    const copiedExercises = [...dailyLog.exercises];
    updatedRoutines.push(copiedExercises);
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users/updateroutines`,
      {
        method: "PUT",
        body: JSON.stringify(updatedRoutines),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (!response.ok) {
      console.log("Error");
      //setError
    }
    if (response.ok) {
      setRoutines(updatedRoutines);
    }
  };

  const updateExerciseEntryForDay = async (exercise, exerciseIndex) => {
    const updatedData = [...data];
    updatedData[logIndex].exercises[exerciseIndex] = exercise;

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users/updatelog`,
      {
        method: "PUT",
        body: JSON.stringify(updatedData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (!response.ok) {
      console.log("Error");
      //setError
    }
    if (response.ok) {
      setData(updatedData);
    }
  };

  const removeSetFromExercise = async (exerciseIndex, setIndex) => {
    const updatedData = [...data];
    const details = Object.keys(
      updatedData[logIndex].exercises[exerciseIndex].details
    );
    for (let i = 0; i < details.length; i++) {
      updatedData[logIndex].exercises[exerciseIndex].sets[details[i]].splice(
        setIndex,
        1
      );
    }
    if (
      updatedData[logIndex].exercises[exerciseIndex].sets[details[0]].length ===
      0
    ) {
      updatedData[logIndex].exercises.splice(exerciseIndex, 1);
      //if day empty
      if (updatedData[logIndex].exercises.length === 0) {
        updatedData.splice(logIndex, 1);
      }
    }
    //console.log("Api call to edit log with new info since exercise was edited");
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users/updatelog`,
      {
        method: "PUT",
        body: JSON.stringify(updatedData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (!response.ok) {
      console.log("Error");
      //setError
    }
    if (response.ok) {
      setData(updatedData);
    }
  };

  const addExercisesForDay = async (newExercises) => {
    const inputDate = convertDateToMMDDYYYYFormat(date);
    const score = 1;
    //insert exercise for date
    let updatedData = [...data];
    if (updatedData.length > 0) {
      const index = findIndex(data, date);
      if (updatedData[index]) {
        if (updatedData[index].date === inputDate) {
          let dayExerciseObject = {};
          for (let i = 0; i < updatedData[index].exercises.length; i++) {
            let name = updatedData[index].exercises[i].name;
            dayExerciseObject[name] = updatedData[index].exercises[i];
          }
          for (let j = 0; j < newExercises.length; j++) {
            let name = newExercises[j].name;
            if (dayExerciseObject[name]) {
              const details = Object.keys(newExercises[j].details);
              for (let i = 0; i < details.length; i++) {
                const detail = details[i];
                const newExerciseSets = newExercises[j].sets[detail];
                const oldExerciseSets = dayExerciseObject[name].sets[detail];

                dayExerciseObject[name].sets[detail] = [
                  ...oldExerciseSets,
                  ...newExerciseSets,
                ];
              }
            } else {
              dayExerciseObject[name] = newExercises[j];
            }
          }
          updatedData[index].exercises = [];
          for (const key in dayExerciseObject) {
            if (dayExerciseObject.hasOwnProperty(key)) {
              updatedData[index].exercises.push(dayExerciseObject[key]);
            }
          }
        } else {
          let templateDay = {
            date: inputDate,
            score,
            officialDate: date,
            exercises: newExercises,
          };
          updatedData.splice(index, 0, templateDay);
        }
      } else {
        let templateDay = {
          date: inputDate,
          score,
          officialDate: date,
          exercises: newExercises,
        };
        updatedData.push(templateDay);
      }
    } else {
      let templateDay = {
        date: inputDate,
        score,
        officialDate: date,
        exercises: newExercises,
      };
      updatedData.push(templateDay);
    }

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users/updatelog`,
      {
        method: "PUT",
        body: JSON.stringify(updatedData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (!response.ok) {
      console.log("Error");
      //setError
    }
    if (response.ok) {
      setData(updatedData);
    }
    return updatedData;
  };

  const setDateToday = () => {
    const newDate = new Date();
    setDate(newDate);
  };

  return (
    <>
      <DateComponent
        decreaseby1={() => handleDateChange(-1)}
        increaseby1={() => handleDateChange(1)}
        input={date}
        jumpToDate={jumpToDate}
        setDateToday={setDateToday}
      />
      <span className="flex jcc gap-lg">
        {/* Form to add exercises */}
        <AddExercisesToDay addExercisesForDay={addExercisesForDay} />

        {/* End of Form to add exercises */}
        <AddRoutineToDay addRoutine={addRoutine} />
      </span>

      <div>
        {dailyLog ? (
          <div className="flex flex-column jcc margin-lg gap-lg">
            <button
              onClick={saveRoutine}
              className="align-self-center secondary-button"
              aria-label="Save Today As A Routine"
            >
              Save today as routine
            </button>

            <DailyLog
              log={dailyLog}
              removeExerciseFromLog={removeExerciseFromLog}
              updateExerciseEntryForDay={updateExerciseEntryForDay}
              removeSetFromExercise={removeSetFromExercise}
            />
          </div>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
};

export default DailyWorkoutLog;
