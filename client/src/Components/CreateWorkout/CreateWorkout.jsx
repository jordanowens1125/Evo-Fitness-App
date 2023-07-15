import React, { useState, useContext } from "react";
import { DataContext } from "../../Context/Context";
import DisplaySetsInput from "../Shared/DisplaySetsInput";
import useAuthContext from "../../hooks/useAuthContext";

const CreateWorkout = () => {
  const [showModal, setShowModal] = useState(false);
  const [exercisesInWorkout, setExercisesInWorkout] = useState({});
  const [searchParam, setSearchParam] = useState("");
  const context = useContext(DataContext);
  const exercises = context.exerciseList;
  const routines = context.routines;
  const setRoutines = context.setRoutines;
  const { user } = useAuthContext();

  const filteredItems = exercises.filter((item) => {
    const capitalizedTitle = item.name.toUpperCase();
    if (!exercisesInWorkout[item.name]) {
      return capitalizedTitle.includes(searchParam.toUpperCase());
    }
    return "";
  });

  const handleSearchParamChange = (e) => {
    setSearchParam(e.currentTarget.value);
  };

  const addExerciseToWorkout = (item) => {
    const copiedExercises = { ...exercisesInWorkout };
    const copy = structuredClone(item);
    copiedExercises[copy.name] = {
      name: copy.name,
      kind: copy.kind,
      sets: structuredClone(copy.defaultSets),
      muscleGroup: copy.muscleGroup,
      segment: copy.segment,
      details: copy.details,
      defaultSets: structuredClone(copy.defaultSets),
    };
    setExercisesInWorkout(copiedExercises);
  };

  const saveWorkout = async (e) => {
    e.preventDefault();
    if (!user) {
      //setError you must be logged in
      return;
    }
    const exercises = [];
    Object.keys(exercisesInWorkout).forEach((exercise) => {
      exercises.push({
        name: exercisesInWorkout[exercise].name,
        kind: exercisesInWorkout[exercise].kind,
        sets: exercisesInWorkout[exercise].sets,
        muscleGroup: exercisesInWorkout[exercise].muscleGroup,
        segment: exercisesInWorkout[exercise].segment,
        details: exercisesInWorkout[exercise].details,
        defaultSets: { ...exercisesInWorkout[exercise].defaultSets },
      });
    });
    const newRoutines = [exercises, ...routines];
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users/updateroutines`,
      {
        method: "PUT",
        body: JSON.stringify(newRoutines),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (!response.ok) {
      //setError(error)
    }
    if (response.ok) {
      //if api call is successful
      setRoutines(newRoutines);
      setExercisesInWorkout({});
      setShowModal(false);
    }
  };

  const removeExerciseFromWorkout = (exercisekey) => {
    const updatedExercise = { ...exercisesInWorkout };
    delete updatedExercise[exercisekey];
    setExercisesInWorkout(updatedExercise);
  };

  const handleSetChange = (e, setIndex, detail) => {
    const updatedExercises = { ...exercisesInWorkout };
    const exercise = e.currentTarget.id.split("-")[0];
    updatedExercises[exercise].sets[detail][setIndex] = e.currentTarget.value;
    setExercisesInWorkout(updatedExercises);
  };
  const handleCancel = () => {
    setExercisesInWorkout({});
    setShowModal(false);
  };

  const removeSet = (setIndex, exerciseName) => {
    const oldExerciseObject = { ...exercisesInWorkout };
    const exercise = oldExerciseObject[exerciseName];
    const details = Object.keys(exercise.details);
    if (exercise.sets[details[0]].length === 1) {
      delete oldExerciseObject[exerciseName];
    } else {
      for (let i = 0; i < details.length; i++) {
        const detail = details[i];
        exercise.sets[detail].splice(setIndex, 1);
      }
    }
    exercisesInWorkout[exerciseName] = exercise;
    setExercisesInWorkout(oldExerciseObject);
  };

  const addNewSet = (exerciseName) => {
    const copy = { ...exercisesInWorkout };
    const sets = copy[exerciseName].sets;
    const details = Object.keys(sets);
    const length = copy[exerciseName].sets[details[0]].length;
    for (let i = 0; i < details.length; i++) {
      const detail = details[i];
      //last value
      const lastValue = copy[exerciseName].sets[detail][length - 1];
      copy[exerciseName].sets[detail].push(lastValue);
    }
    setExercisesInWorkout(copy);
  };
  return (
    <>
      {showModal ? (
        <>
          <div className="modal">
            <div className="modal-content">
              <div className="flex-column gap-md">
                <h3 className="flex space-between gap-md aic margin-bottom-lg">
                  New Workout Exercises
                  <button
                    onClick={handleCancel}
                    className="ghost-button"
                    aria-label="Cancel"
                  >
                    Cancel
                  </button>
                </h3>
                <i>Search Exercises (Click exercise to add):</i>

                <div>
                  <input
                    type="text"
                    value={searchParam}
                    onChange={handleSearchParamChange}
                    placeholder="Enter exercise name..."
                    className="margin-bottom-md"
                    aria-label="Input Exercise Name"
                  />
                  <ul id="search-results" className="flex gap-md">
                    {filteredItems.map((item) => {
                      return (
                        <div
                          key={item.name}
                          onClick={() => addExerciseToWorkout(item)}
                          className="flex padding-md exercise-card"
                        >
                          {/* {item.muscleGroup.image} */}
                          <img src="" alt="" />
                          <div className="flex-column">
                            <i className="heading-sm">{item.name}</i>
                            <p className="sub-text">{item.muscleGroup.name}</p>
                          </div>
                        </div>
                      );
                    })}
                  </ul>
                </div>
                <div className="flex-column gap-md">
                  {Object.keys(exercisesInWorkout).map((key, index) => {
                    return (
                      <div key={key} className="gap-md card">
                        {
                          <>
                            <DisplaySetsInput
                              exercise={exercisesInWorkout[key]}
                              index={index}
                              displayName={true}
                              handleSetChange={handleSetChange}
                              removeExercise={() =>
                                removeExerciseFromWorkout(key)
                              }
                              removeSet={removeSet}
                            />
                            <button
                              onClick={() => addNewSet(key)}
                              className="secondary-button"
                              aria-label="Add New Set"
                            >
                              New Set
                            </button>
                          </>
                        }
                      </div>
                    );
                  })}
                </div>
                {Object.keys(exercisesInWorkout).length > 0 && (
                  <button
                    onClick={saveWorkout}
                    className="primary-button"
                    aria-label="Save Workout"
                  >
                    Save workout
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <button
          onClick={() => setShowModal(true)}
          className="secondary-button"
          aria-label="Create A New Workout"
        >
          New Workout
        </button>
      )}
    </>
  );
};

export default CreateWorkout;
