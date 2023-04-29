import React, { useState } from "react";

const DisplaySetsEdit = ({
  newExercise,
  handleSetChange,
  displayName,
  removeSetFromExercise,
  SetIndex,
  exerciseIndex
}) => {
  const details = Object.keys(newExercise.details);
  const [item, setItem] = useState({
    Repetition: 0,
    Weight: 0,
    Distance: 0,
    Time: 0,
  });

  return (
    <>
      <div className="padding-md">
        {displayName ? (
          <>
            <i>{newExercise.name}:</i>
          </>
        ) : (
          <></>
        )}
        <div className="flex gap-md margin-md">
          <div key={SetIndex} className="card bg-border">
            <span className="full-width flex space-between">
              <b>Set: {SetIndex + 1}</b>
              <button onClick={()=> removeSetFromExercise(exerciseIndex, SetIndex)}>
                X
              </button>
            </span>
            
            {details.map((detail) => {
              return (
                <div key={SetIndex + detail}>
                  <div className="flex space-between">
                    <span key={`${detail}-input`} className="flex aic space-between full-width">
                      <span className="margin-bottom-md">
                        {detail} {newExercise.details[detail].units} :
                      </span>
                      <input
                        key={detail}
                        type="number"
                        name={`Exercise${newExercise.name}Set${SetIndex}${detail}`}
                        id={`Log-Exercise${newExercise.name}-Set${SetIndex}-${detail}`}
                        value={newExercise.sets[detail][SetIndex]}
                        placeholder={detail}
                        onChange={handleSetChange}
                        className="width-xs "
                      />{" "}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplaySetsEdit;
