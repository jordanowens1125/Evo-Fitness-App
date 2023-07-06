import React, { useContext, useState } from "react";
import { DataContext } from "../../Context/Context";
import { muscleGroups } from "../../data/muscleGroups";

const MuscleGroup = () => {
  const context = useContext(DataContext);
  const data = context.data;
  const [muscleGroup, setMuscleGroup] = useState(muscleGroups[0]);
  const handleChange = (e) => {
    setMuscleGroup(e.currentTarget.value);
  };

  const MuscleGroupsDropDown = () => {
    return (
      <select
        name="muscleGroup"
        id="muscleGroup"
        onChange={handleChange}
        value={muscleGroup.name}
      >
        {muscleGroups.map((muscleGroup) => (
          <option value={muscleGroup} key={muscleGroup.name}>
            {" "}
            {muscleGroup.name}
          </option>
        ))}
      </select>
    );
  };

  return (
    <>
      <div className="margin-lg">
        <MuscleGroupsDropDown />
        <div>MuscleGroup</div>
      </div>
    </>
  );
};

export default MuscleGroup;
