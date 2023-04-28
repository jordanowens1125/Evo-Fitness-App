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

const CreateExercise = ({ cancel }) => {
  const context = useContext(DataContext);
  const exercises = context.exerciseList;
  const setExerciseList = context.setExerciseList;
  const [muscleGroup, setMuscleGroup] = useState(0);
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

  const createNewExercise = () => {
      const copy = [...exercises];
      const muscleG = muscleGroups[muscleGroup]
      const exerciseType = kindsOfExercises[kind]
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
    </>
  );
};

export default CreateExercise;
