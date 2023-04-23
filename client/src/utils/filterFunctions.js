export const returnDaysWithExercise = (data, exerciseObject) => {
    const exerciseDays = []
    for (let i = 0; i < data.length; i++){
        for (let j = 0; j < data[i].exercises.length; j++){
            const name = data[i].exercises[j].exercise.exercise.name
            if (name === exerciseObject.exercise.name) {
                exerciseDays.push({
                  date: data[i].date,
                  sets: data[i].exercises[j].sets
                });
            }
        }
    }
    return exerciseDays
}