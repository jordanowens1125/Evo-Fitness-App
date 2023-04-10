import React, { useState, useContext, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import multiMonthPlugin from "@fullcalendar/multimonth";
import { DataContext } from "../Context/Context";
import {
  convertDateToMMDDYYYYFormat,
  convertMMDDYYYYtoYYYYMMDD,
  sortObjectsWithDatePropertyInMMDDYYYY,
} from "../utils/dateFunctions";

const CalendarDisplay = () => {
  const context = useContext(DataContext);
  const data = context.data;
  const setData = context.setData;
  const [copiedExercises, setCopiedExercises] = useState([]);
  const [currentDay, setCurrentDay] = useState({
    date: "",
    exercises: [],
  });
  const [showCurrentDay, setShowCurrentDay] = useState(false);

  const handleDateClick = (e) => {
    const [year, month, day] = e.dateStr.split('-')
    const date = `${month}-${day}-${year}`
    pasteExercises(date)
  }

  const handleDateClickForFilledDay = (date) => {
    const formattedDate = convertDateToMMDDYYYYFormat(date)
    pasteExercises(formattedDate)
  }

  useEffect(() => {
    
  },[data])
  function renderEventContent(eventInfo) {
    const date = eventInfo.event._instance.range.start;
    const exercisesForDay = eventInfo.event._def.extendedProps.exercises;
    return (
      <>
        <div
          style={{
            display: "flex",
            gap: "10px",
            backgroundColor: "white",
            border: "white 1px solid",
            height: "20px",
            overflow: "hidden",
            justifyContent: "center",
          }}
          onClick={(e) => {
            test(exercisesForDay, date);
          }}
        >
          {exercisesForDay.map((exercise) => {
            return (
              <div
                key={exercise.name}
                style={{
                  backgroundColor: exercise.color || "#8884d8",
                  borderRadius: "50%",
                  aspectRatio: "1",
                }}
              ></div>
            );
          })}
        </div>
      </>
    );
  }

  function renderEventContentForPaste(eventInfo) {
    const date = eventInfo.event._instance.range.start;
    const exercisesForDay = eventInfo.event._def.extendedProps.exercises;
    return (
      <>
        <div
          style={{
            display: "flex",
            gap: "10px",
            backgroundColor: "white",
            border: "white 1px solid",
            height: "20px",
            overflow: "hidden",
            justifyContent: "center",
          }}
          onClick={() => {
            handleDateClickForFilledDay(date);
          }}
        >
          {exercisesForDay.map((exercise) => {
            return (
              <div
                key={exercise.name}
                style={{
                  backgroundColor: exercise.color || "#8884d8",
                  borderRadius: "50%",
                  aspectRatio: "1",
                }}
              ></div>
            );
          })}
        </div>
      </>
    );
  }

  const addExerciseForDay = (newExercise, date) => {
    console.log(newExercise);
    const inputDate =date;
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
            setCurrentDay(updatedData[i])
          }

          if (count === 0 && j === updatedData[i].exercises.length - 1) {
            updatedData[i].exercises.push(newExercise);
            setCurrentDay(updatedData[i]);
            count++;
          }
        }
      }
    }

    if (count === 0) {
      const newDay = {
        date: inputDate,
        score,
        exercises: [newExercise],
      }
      updatedData.push({
        date: inputDate,
        score,
        exercises: [newExercise],
      });
      setCurrentDay(newDay);
      //sort newly added day
      updatedData = sortObjectsWithDatePropertyInMMDDYYYY(updatedData);
    }
    console.log(updatedData);
    setData(updatedData);
  };

  const test = (exercises, date) => {
    const updatedCurrentDay = { ...currentDay };
    updatedCurrentDay.date = convertDateToMMDDYYYYFormat(date);
    updatedCurrentDay.exercises = exercises;
    setCurrentDay(updatedCurrentDay);
    setShowCurrentDay(true);
  };

  useEffect(() => {}, [data]);

  const copyExercises = (e) => {
    setCopiedExercises(currentDay.exercises);
  }

  const pasteExercises = (date) => {
    for (let i = 0; i < copiedExercises.length; i++){
      const copy = structuredClone(copiedExercises[i])
      addExerciseForDay(copy,date)
    }
  }

  const calendarData = data.map((item) => {
    const newItem = structuredClone(item);
    newItem.date = convertMMDDYYYYtoYYYYMMDD(newItem.date);
    return newItem;
  });

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, multiMonthPlugin]}
        initialView="dayGridMonth"
        events={calendarData}
        eventContent={renderEventContent}
      />
      <div>
        {/* style={{ position: 'absolute', zIndex: '10', top: '0' }} */}
        {currentDay.date}
        {
          <button onClick={copyExercises}>
            Copy exercises
          </button>
        }
        {copiedExercises.length > 0 ? (
          <>
            <button onClick={pasteExercises}>Paste</button>
          </>
        ) : (
          <></>
        )}
        {currentDay.exercises.map((exercise) => {
          return <div key={exercise.name}>{exercise.name}</div>;
        })}
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, multiMonthPlugin]}
        initialView="dayGridMonth"
        events={calendarData}
        eventContent={renderEventContentForPaste}
        dateClick={handleDateClick}
      />
    </>
  );
};

export default CalendarDisplay;
