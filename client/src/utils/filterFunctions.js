export const returnDaysWithExercise = (data, exerciseObject) => {
  const exerciseDays = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].exercises.length; j++) {
      const name = data[i].exercises[j].name;
      if (name === exerciseObject.name) {
        exerciseDays.push({
          date: data[i].date,
          sets: data[i].exercises[j].sets,
          details: exerciseObject.details,
        });
      }
    }
  }
  return exerciseDays;
};
