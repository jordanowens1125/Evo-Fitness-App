const DisplaySets = ({
  exercise,
  displayName,
  handleSetChange,
  removeExercise,
  removeSet,
}) => {
  const details = Object.keys(exercise.details);
  const length = exercise.sets[details[0]].length;
  const indexArray = [];
  for (let i = 0; i < length; i++) {
    indexArray.push(i);
  }

  const numberInputOnWheelPreventChange = (e) => {
  // Prevent the input value change
  e.target.blur()

  // Prevent the page/container scrolling
  e.stopPropagation()

  // Refocus immediately, on the next tick (after the current function is done)
  setTimeout(() => {
    e.target.focus()
  }, 0)
}
  return (
    <>
      {displayName ? (
        <>
          <span className="flex space-between aic">
            <i className="primary ">{exercise.name}:</i>
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
                <button onClick={() => removeSet(index, exercise.name)}>
                  X
                </button>
              </span>

              {details.map((detail) => {
                return (
                  <div key={index + detail}>
                    <div className="flex space-between gap-md">
                      <span>
                        {detail} {exercise.details[detail].units}:{" "}
                      </span>
                      <input
                        key={detail}
                        type="number"
                        name={`Exercise${exercise.name}Set${index}${detail}`}
                        id={`${exercise.name}-Set${index}-${detail}`}
                        value={exercise.sets[detail][index]}
                        placeholder={detail}
                        onChange={(e) => handleSetChange(e, index, detail)}
                        onWheel={numberInputOnWheelPreventChange}
                        className="width-xs"
                        min={exercise.details[detail].min || 0}
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
