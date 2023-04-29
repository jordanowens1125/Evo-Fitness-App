import React from "react";

const DisplaySets = ({ exercise, displayName, handleSetChange, SetIndex }) => {
  const details = Object.keys(exercise.details);
  const length = exercise.sets[details[0]].length;
  const indexArray = [];
  for (let i = 0; i < length; i++) {
    indexArray.push(i);
  }
  return (
    <>
      {displayName ? (
        <>
          <i>{exercise.name}:</i>
        </>
      ) : (
        <></>
      )}
      <div className="flex gap-md margin-md">
        {indexArray.map((index) => {
          return (
            <div key={index} className="card bg-border gap-md flex-column">
              <b>Set: {index + 1}</b>
              {details.map((detail) => {
                return (
                  <div key={index + detail} >
                    <div className="flex space-between">
                      <span>
                        {detail} {exercise.details[detail].units}:{" "}
                      </span>
                      <input
                        key={detail}
                        type="number"
                        name={`Exercise${exercise.name}Set${SetIndex}${detail}`}
                        id={`Log-Exercise${exercise.name}-Set${SetIndex}-${detail}`}
                        value={exercise.sets[detail][SetIndex]}
                        placeholder={detail}
                        onChange={handleSetChange}
                        className="width-sm"
                      />
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
