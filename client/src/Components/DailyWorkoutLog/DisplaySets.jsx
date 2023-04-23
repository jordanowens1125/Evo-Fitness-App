import React, { useState } from "react";

const DisplaySets = ({ newExercise, index, handleSetChange }) => {
  const details = Object.keys(newExercise.details)
  const [item, setItem] = useState({
    Repetition: 0,
    Weight: 0,
    Distance: 0,
    Time: 0,
  });

  const handleInputChange = (e) => {
    const splitID = e.currentTarget.id.split("-");
    const updatedItem = { ...item };
    //the detail is stored as the last item after the split
    updatedItem[splitID[2]] = e.currentTarget.value;
    setItem(updatedItem);
    handleSetChange(index, e.currentTarget.value, splitID[2]);
  };

  return (
    <>
      {details.map((detail) => {
        return (
          <span key={`${detail}-input`}>
            {detail}
            <input
              key={detail}
              type="number"
              name={`Exercise${newExercise.name}Set${index}${detail}`}
              id={`Exercise${newExercise.name}-Set${index}-${detail}`}
              value={item[detail]}
              onChange={handleInputChange}
            />
            
            {newExercise.details[detail].units}
          </span>
        );
      })}
      {newExercise.units}
    </>
  );
};

export default DisplaySets;
