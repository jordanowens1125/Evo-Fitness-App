import React from "react";

const DisplaySets = ({ exercise, displayName }) => {
    const details = Object.keys(exercise.details);
  const length = exercise.sets[details[0]].length;
  const indexArray = [];
  for (let i = 0; i < length; i++) {
    indexArray.push(i);
  }
  return (
    <>
      {
        displayName ? <><i>{exercise.name}:</i></>:<></>
      }
      <div className="flex gap-md margin-md">
        {indexArray.map((index) => {
          return (
            <div key={index} className="card bg-border">
              <b>Set: {index + 1}</b>
              {details.map((detail) => {
                return (
                  <div key={index + detail}>
                    <div className="flex space-between">
                      {detail} {exercise.details[detail].units}:{" "}
                      <b>{exercise.sets[detail][index]}</b>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DisplaySets;
