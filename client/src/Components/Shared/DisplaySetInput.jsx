import React from "react";

const DisplaySets = ({
  exercise,
  displayName,
  handleSetChange,
  SetIndex,
  removeExercise,
  removeSet,
}) => {
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
          <span className="flex space-between aic">
            <i className="primary">{exercise.name}:</i>
            {removeExercise ? (
              <button onClick={removeExercise}>X</button>
            ) : (
              <></>
            )}
          </span>
        </>
      ) : (
        <></>
      )}
      <div className="flex gap-md margin-md">
        {indexArray.map((index) => {
          return (
            <div key={index} className="card bg-border gap-md secondary-bg">
              <span className="flex space-between">
                <b>Set: {index + 1}</b>
                <button onClick={()=> removeSet(exercise.name, index)}>X</button>
              </span>

              {details.map((detail) => {
                return (
                  <div key={index + detail}>
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
