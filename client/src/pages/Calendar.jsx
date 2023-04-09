import React, { useState, useContext, useEffect } from "react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { DataContext } from "../Context/Context";
import { convertMMDDYYYYtoYYYYMMDD } from "../utils/dateFunctions";
// import { generateRandomColor } from "../data/colors";

const test = (exercise) => {
  console.log(exercise);
}

function renderEventContent(eventInfo) {
  return (
    <>
      <div style={{ display: "flex", gap:'10px', backgroundColor:'white', border: 'white 1px solid', height:'20px'}}>
        {eventInfo.event._def.extendedProps.exercises.map((exercise) => {
          return (
            <div
              key={exercise.name}
              style={{
                backgroundColor: exercise.color || "#8884d8", borderRadius: '50%',
                aspectRatio: '1',
              }}
              onClick={(e)=> {test(exercise)}}
            >
              
            </div>
          );
        })}
      </div>
    </>
  );
}

const CalendarDisplay = () => {
  const context = useContext(DataContext);
  const data = context.data;
  useEffect(() => {
  }, [data])
  
  const calendarData = data.map((item ) => {
    const newItem = structuredClone(item)
    newItem.date = convertMMDDYYYYtoYYYYMMDD(newItem.date)
    return newItem;
  })

  const handleDateClick = (e) => {
    console.log(e);
  }
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={calendarData}
      eventContent={renderEventContent}
      dateClick={handleDateClick}
    />
  );
}

export default CalendarDisplay