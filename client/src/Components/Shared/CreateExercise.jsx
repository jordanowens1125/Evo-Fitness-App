import React, { useState, useContext } from "react";
import { kindsOfExercises } from "../../data/exerciseCategories";
import { muscleGroups } from "../../data/bodySegments";
import DropDownUsingName from "./DropDownUsingName";
import { DataContext } from "../../Context/Context";
import useAuthContext from "../../hooks/useAuthContext";

const CreateExercise = () => {
  const context = useContext(DataContext);
  const exercises = context.exerciseList;
  const setExerciseList = context.setExerciseList;
  const [newExercise, setNewExercise] = useState({
    name: exercises[0].name,
    kind: exercises[0].kind,
    details: { ...exercises[0].details },
    sets: { ...exercises[0].defaultSets }, //make sure default sets does not change
    defaultSets: { ...exercises[0].defaultSets },
  });

  const { user } = useAuthContext();
  const [muscleGroup, setMuscleGroup] = useState(0);
  const [active, setActive] = useState(false);
  const [kind, setKind] = useState(0);
  const [name, setName] = useState("");
  const handleMuscleGroupChange = (e) => {
    setMuscleGroup(e.currentTarget.value);
  };
  const handleNameChange = (e) => {
    setName(e.currentTarget.value);
  };
  const handleChangeOfKind = (e) => {
    setKind(e.currentTarget.value);
  };

  const resetExerciseProps = () => {
    setName("");
    setMuscleGroup(0);
    setKind(0);
    cancel();
  };

  const cancel = () => {
    setActive(false);
  };

  const resetValues = () => {
    // setExerciseValue(0);
    setNewExercise({
      name: exercises[0].name,
      kind: exercises[0].kind,
      details: { ...exercises[0].details },
      sets: { ...exercises[0].defaultSets },
      defaultSets: { ...exercises[0].defaultSets }, //make sure default sets does not change,
    });
  };
  const handleCreateNewExerciseClick = () => {
    setActive(true);
    resetValues();
  };

  const createNewExercise = async (e) => {
    e.preventDefault();

    if (!user) {
      //setError('You must be logged in')
      return;
    }

    const copy = [...exercises];
    const muscleG = muscleGroups[muscleGroup];
    const exerciseType = kindsOfExercises[kind];
    const newExercise = {
      name,
      kind: exerciseType,
      muscleGroup: muscleG,
      details: exerciseType.details,
      defaultSets: exerciseType.defaultSets,
      segment: muscleG.segment,
    };

    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/exercises/create`, {
      method: "POST",
      body: JSON.stringify(newExercise),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (!response.ok) {
      console.log(response);
      //setError(json.error)
    }
    copy.push(newExercise)
    if (response.ok) {
      setExerciseList(copy);
      resetExerciseProps();
      cancel();
    }
  };

  return (
    <>
      {active ? (
        <>
          <div className="modal">
            <form className="modal-content" onSubmit={createNewExercise}>
              <span className="flex space-between aic">
                <h2>Create Exercise</h2>
                <button
                  onClick={resetExerciseProps}
                  className="ghost-button"
                  aria-label="Cancel"
                  type="button"
                >
                  Cancel
                </button>
              </span>
              <input
                type="text"
                placeholder="Name:"
                value={name}
                onChange={handleNameChange}
                aria-label="Input Name"
                required
              />
              <DropDownUsingName
                value={muscleGroup}
                handleChange={handleMuscleGroupChange}
                listOfValues={muscleGroups}
                title={"Muscle Group"}
              />
              <DropDownUsingName
                value={kind}
                handleChange={handleChangeOfKind}
                listOfValues={kindsOfExercises}
                title={"Exercise Type"}
              />
              <button
                type="submit"
                className="primary-button"
                aria-label="Submit"
              >
                Submit
              </button>
            </form>
          </div>
        </>
      ) : (
        <>
          <button
            className="secondary-button"
            onClick={handleCreateNewExerciseClick}
            aria-label="Create New Exercise"
          >
            Create New Exercise
          </button>
        </>
      )}
    </>
  );
};

export default CreateExercise;
