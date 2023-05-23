import { useState, useContext, useEffect } from "react";
import DailyLog from "../Components/DailyWorkoutLog/DailyLog";
import {
  convertDateToMMDDYYYYFormat,
  sortObjectsWithDatePropertyInMMDDYYYY,
} from "../utils/dateFunctions";
import AddExercisesToDay from "../Components/DailyWorkoutLog/AddExercisesToDay";
import { DataContext } from "../Context/Context";
import AddRoutineToDay from "../Components/DailyWorkoutLog/AddRoutineToDay";
// import { findIndex } from "../utils/searchFunction";
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

  const [date, setDate] = useState(new Date());

  const { user } = useAuthContext();

  useEffect(() => {
    async function fetchData() {
      const exerciseResponse = await fetch("/exercises", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const exercisejson = await exerciseResponse.json();
      if (exerciseResponse.ok) {
        if (exercisejson.length > 0) {
          setExerciseList(exercisejson);
        }
      }

      //get user data
      const response = await fetch("/users", {
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
      }
    }

    if (user) {
      fetchData();
    }
  }, [user, setExerciseList, setRoutines, setData]);

  const test = convertDateToMMDDYYYYFormat(date);

  const [dailyLog, logIndex] = findLogForDate(test, data);
  const addRoutine = (listOfExercises) => {
    let copy = [...data];
    for (let i = 0; i < listOfExercises.length; i++) {
      const newExercise = {
        name: listOfExercises[i].name,
        kind: listOfExercises[i].kind,
        details: listOfExercises[i].details,
        defaultSets: listOfExercises[i].defaultSets,
        muscleGroup: listOfExercises[i].muscleGroup,
        segment: listOfExercises[i].segment,
        sets: listOfExercises[i].sets,
      };
      copy = addExerciseForDay(newExercise, copy);
    }
    setData(copy);
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

    const response = await fetch("/users/updatelog", {
      method: "PUT",
      body: JSON.stringify(updatedData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

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
    console.log("Api call to save routine");
    console.log(updatedRoutines);
    const response = await fetch("/users/updateroutines", {
      method: "PUT",
      body: JSON.stringify(updatedRoutines),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

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

    const response = await fetch("/users/updatelog", {
      method: "PUT",
      body: JSON.stringify(updatedData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

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
    const response = await fetch("/users/updatelog", {
      method: "PUT",
      body: JSON.stringify(updatedData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (!response.ok) {
      console.log("Error");
      //setError
    }
    if (response.ok) {
      setData(updatedData);
    }
  };

  const addExerciseForDay = async (newExercise, dateData = data) => {
    const name = newExercise.name;
    // const index = findIndex(dateData, new Date(2023, 4, 1));
    // console.log(index);
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
          if (name === dataForDay.exercises[j].name) {
            const details = Object.keys(newExercise.details);
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
        officialDate: date,
      });
      //sort newly added day
      updatedData = sortObjectsWithDatePropertyInMMDDYYYY(updatedData);
    }

    //console.log("Api call to update log");
    const response = await fetch("/users/updatelog", {
      method: "PUT",
      body: JSON.stringify(updatedData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

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
        <AddExercisesToDay addExerciseForDay={addExerciseForDay} />

        {/* End of Form to add exercises */}
        <AddRoutineToDay addRoutine={addRoutine} />
      </span>

      <div>
        {dailyLog ? (
          <div className="flex flex-column jcc margin-lg gap-lg">
            <button onClick={saveRoutine} className="align-self-center">
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
