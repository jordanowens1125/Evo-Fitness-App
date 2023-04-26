
const SetsDisplayForLog = ({
  exercise,
  SetIndex,
  exerciseIndex,
  editMode,
  removeSetFromExercise,
  setUpdatedExercise,
  details,
}) => {
  const handleInputChange = (e) => {
    const splitID = e.currentTarget.id.split("-");
    const updatedExercise = { ...exercise };
    //the detail is stored as the last item after the split
    updatedExercise.sets[splitID[3]][SetIndex] = +e.currentTarget.value;
    setUpdatedExercise(updatedExercise);
  };
  return (
    <>
      {editMode ? (
        <>
          {details.map((detail) => {
            return (
              <span key={`${detail}-input`}>
                {detail}:{" "}
                <input
                  key={detail}
                  type="number"
                  name={`Exercise${exercise.name}Set${SetIndex}${detail}`}
                  id={`Log-Exercise${exercise.name}-Set${SetIndex}-${detail}`}
                  value={exercise.sets[detail][SetIndex]}
                  placeholder={detail}
                  onChange={handleInputChange}
                  className="width-xs "
                />{" "}
                {exercise.details[detail].units} x{" "}
              </span>
            );
          })}
          {exercise.units}
          <button
            onClick={() => removeSetFromExercise(exerciseIndex, SetIndex)}
          >
            X
          </button>
        </>
      ) : (
        <>
          {details.map((detail) => {
            return (
              <span key={`${detail}-input`}>
                {detail}: {exercise.sets[detail][SetIndex]}{" "}
                {exercise.details[detail].units} x{" "}
              </span>
            );
          })}
        </>
      )}
    </>
  );
};

export default SetsDisplayForLog;
