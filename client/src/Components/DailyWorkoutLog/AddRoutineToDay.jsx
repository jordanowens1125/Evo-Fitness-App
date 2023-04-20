import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../context/Context";

const AddRoutineToDay = ({ addRoutine }) => {
  const [editMode, setEditMode] = useState(false)
  const context = useContext(DataContext);
  const routines = context.routines;
  const setRoutines = context.setRoutines;
  const deleteRoutine = (index) => {
    const copiedRoutines = [...routines];
    copiedRoutines.splice(index, 1);
    setRoutines(copiedRoutines);
  };
  const handleRoutineSubmission = (routine) => {
    addRoutine(routine);
    setEditMode(false)
  };
  useEffect(() => {}, [context, routines]);
  return (
    <>
      {editMode ? (
        <>
          <button
            onClick={() => {
              setEditMode(false);
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              setEditMode(true);
            }}
          >
            AddRoutineToDay
          </button>
        </>
      )}
      {editMode ? (
        <>
          <div>
            Choose the routine you would like to add
            {routines.map((routine, index) => {
              return (
                <div key={index}>
                  <div>
                    Routine{index}
                    {routine.map((exercise) => {
                      return <div key={exercise.name}>{exercise.name}</div>;
                    })}
                    <button onClick={() => handleRoutineSubmission(routine)}>
                      Add me
                    </button>
                  </div>
                  {/* Add exercise to date ability */}
                  {/* Edit routine */}
                  {editMode ? (
                    <>
                      <button onClick={(e) => deleteRoutine(index)}>
                        Delete Routine
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default AddRoutineToDay;
