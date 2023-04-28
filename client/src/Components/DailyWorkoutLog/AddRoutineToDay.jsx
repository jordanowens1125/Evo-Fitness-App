import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../context/Context";

const AddRoutineToDay = ({ addRoutine }) => {
  const [editMode, setEditMode] = useState(false);
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
    setEditMode(false);
  };
  useEffect(() => {}, [context, routines]);
  return (
    <>
      {editMode ? (
        <>
          <div className="modal">
            <div className="modal-content">
              <span className="flex space-between">
                Choose the routine you would like to add
                <button
                  onClick={() => {
                    setEditMode(false);
                  }}
                >
                  Cancel
                </button>
              </span>

              <div>
                {routines.map((routine, index) => {
                  return (
                    <div key={index}>
                      <div>
                        Routine{index}
                        {routine.map((exercise) => {
                          return <div key={exercise.name}>{exercise.name}</div>;
                        })}
                        <button
                          onClick={() => handleRoutineSubmission(routine)}
                        >
                          Add me
                        </button>
                      </div>
                      <button onClick={(e) => deleteRoutine(index)}>
                        Delete Routine
                      </button>
                      {/* Add exercise to date ability */}
                      {/* Edit routine */}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              setEditMode(true);
            }}
          >
            Add Routine To Day
          </button>
        </>
      )}
    </>
  );
};

export default AddRoutineToDay;
