import React, { useState, useContext } from "react";
import { kindsOfExercises } from "../../data/exerciseCategories";
import { muscleGroups } from "../../data/bodySegments";
import DropDownUsingName from "../Shared/DropDownUsingName";
import { DataContext } from "../../context/Context";

const newExerciseObject = {
  name: "",
  kind: kindsOfExercises[0],
  muscleGroup: muscleGroups[0],
  details: kindsOfExercises[0].details,
  defaultSets: kindsOfExercises[0].defaultSets,
  segment: muscleGroups[0].segment,
};

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
    setMuscleGroup(newExerciseObject.kind);
    setKind(newExerciseObject.kind);
    cancel();
  };

  const cancel = () => {
    setActive(false)
  }

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

  const createNewExercise = () => {
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
    copy.push(newExercise);
    setExerciseList(copy);
    resetExerciseProps();
    cancel();
  };

  return (
    <>
      {active ? (
        <>
          <div className="modal">
            <div className="modal-content">
              <span className="flex space-between aic">
                <h2>Create Exercise</h2>
                <button onClick={resetExerciseProps}>Cancel</button>
              </span>
              <input
                type="text"
                placeholder="Name:"
                value={name}
                onChange={handleNameChange}
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
              <button onClick={createNewExercise}>Submit</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <button
            className="secondary-button"
            onClick={handleCreateNewExerciseClick}
          >
            Create New Exercise
          </button>
        </>
      )}
    </>
  );
};

export default CreateExercise;
