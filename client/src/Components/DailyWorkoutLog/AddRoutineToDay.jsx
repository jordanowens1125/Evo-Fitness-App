import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../context/Context";
import DisplaySets from "../Shared/DisplaySets";
import NewWorkOut from './NewWorkout'


const AddRoutineToDay = ({ addRoutine }) => {
  const [editMode, setEditMode] = useState(false);
  const [newWorkout, setNewWorkout] = useState(true);
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
  const handleOpenModal = () => {
    setNewWorkout(true)
  }
  useEffect(() => {}, [context, routines]);
  return (
    <>
      {editMode ? (
        <>
          <div className="modal">
            <div className="modal-content">
              <span className="flex space-between flex-start heading-sm gap-lg">
                Choose the workout you would like to add:
                <button
                  onClick={() => {
                    setEditMode(false);
                  }}
                >
                  Cancel
                </button>
              </span>

              <div className="flex flex-column wrap gap-lg">
                <button onClick={handleOpenModal}>New Workout</button>
                {newWorkout ? (
                  <>
                    <NewWorkOut cancel={()=> setNewWorkout(false)}/>
                  </>
                ) : (
                  <></>
                )}
                {routines.map((routine, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-border padding-md full-width"
                    >
                      <div className="flex-column wrap margin-bottom-md gap-lg">
                        <b className="primary">Routine {index + 1}:</b>
                        <span className="flex gap-lg">
                          <button
                            onClick={() => handleRoutineSubmission(routine)}
                          >
                            Add Me
                          </button>
                          <button onClick={(e) => deleteRoutine(index)}>
                            Delete Routine
                          </button>
                        </span>
                      </div>
                      {routine.map((exercise) => {
                        return (
                          <div key={+index + exercise.name}>
                            <DisplaySets exercise={exercise} />
                          </div>
                        );
                      })}
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
