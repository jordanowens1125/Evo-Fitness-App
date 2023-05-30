import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../Context/Context";
import DisplaySets from "../Shared/DisplaySets";
import CreateWorkout from "../Shared/CreateWorkout";
import useAuthContext from "../../hooks/useAuthContext";

const AddRoutineToDay = ({ addRoutine }) => {
  const [editMode, setEditMode] = useState(false);
  const context = useContext(DataContext);
  const routines = context.routines;
  const setRoutines = context.setRoutines;

  const { user } = useAuthContext();

  const deleteRoutine = async (index) => {
    //if api call is successful
    const copiedRoutines = [...routines];
    copiedRoutines.splice(index, 1);

    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/updateroutines`, {
      method: "PUT",
      body: JSON.stringify(copiedRoutines),
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
      setRoutines(copiedRoutines);
    }
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
                <CreateWorkout />
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
                            Log
                          </button>
                          <button onClick={(e) => deleteRoutine(index)}>
                            Delete
                          </button>
                        </span>
                      </div>
                      {routine.map((exercise) => {
                        return (
                          <div key={+index + exercise.name}>
                            <DisplaySets
                              exercise={exercise}
                              displayName={true}
                            />
                          </div>
                        );
                      })}
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
            Add Routine
          </button>
        </>
      )}
    </>
  );
};

export default AddRoutineToDay;
