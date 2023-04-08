import React, { useState }  from 'react'

const DistanceTimeDisplay = ({
  Time, Distance,SetIndex, Units, updateExerciseEntryForDay,exerciseIndex
}) => {
  const [editMode, setEditMode] = useState(false);
  const [time, setTime] = useState(Time);
  const [distance, setDistance] = useState(Distance);

  const handleEdit = () => {
    const newTime = document.getElementById(
      `Exercise${exerciseIndex}Set${SetIndex}Time`
    ).value;
    const newDistance = document.getElementById(
      `Exercise${exerciseIndex}Set${SetIndex}Distance`
    ).value;

    updateExerciseEntryForDay(exerciseIndex, SetIndex, newTime, newDistance);
    setEditMode(false);
  };
  const cancel = () => {
      setEditMode(false);
      setTime(time)
      setDistance(distance)
  };

  const handleInputChange = (e) => {
    if (
      e.currentTarget.id === `Exercise${exerciseIndex}Set${SetIndex}Repetition`
    ) {
      setTime(e.currentTarget.value)
      }
    else {
        setDistance(e.currentTarget.value);
      }
  };

  return (
    <>
    {editMode ? (
        <>
          <input
            type="number"
            name={`Exercise${exerciseIndex}Set${SetIndex}`}
            id={`Exercise${exerciseIndex}Set${SetIndex}Time`}
            value={time}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name=""
            id={`Exercise${exerciseIndex}Set${SetIndex}Distance`}
            value={distance}
            onChange={handleInputChange}
          />
          <button onClick={handleEdit}>Submit</button>
          <button onClick={cancel}>Cancel</button>
        </>
      ) : (
        <>
          Time: {Time} - Distance: {Distance} {Units}
          <button onClick={(e) => setEditMode(!editMode)}>Edit</button>
        </>
      )}
    </>
  )
}

export default DistanceTimeDisplay