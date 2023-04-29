import DisplaySetsEdit from "../Shared/DisplaySetsEdit";
import DisplaySets from "../Shared/DisplaySets";

const SetsDisplayForLog = ({
  exercise,
  SetIndex,
  exerciseIndex,
  editMode,
  removeSetFromExercise,
  setUpdatedExercise,
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
          <DisplaySetsEdit
            newExercise={exercise}
            exerciseIndex={exerciseIndex}
            SetIndex={SetIndex}
            removeSetFromExercise={removeSetFromExercise}
            handleSetChange={handleInputChange}
          />
        </>
      ) : (
        <>
          <DisplaySets exercise={exercise} />
        </>
      )}
    </>
  );
};

export default SetsDisplayForLog;
