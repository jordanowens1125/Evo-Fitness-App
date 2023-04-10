export const returnDaysWithExercise = (data, exerciseName) => {
    const exerciseDays = []
    for (let i = 0; i < data.length; i++){
        for (let j = 0; j < data[i].exercises.length; j++){
            if (data[i].exercises[j].name === exerciseName) {
                exerciseDays.push({
                  date: data[i].date,
                  sets: data[i].exercises[j].sets,
                    units: data[i].exercises[j].units,
                  kind: data[i].exercises[j].kind
                });
            }
        }
    }
    return exerciseDays
}