const groupByReturnObject = function (xs, key) {
  return xs.reduce(function (sortedArray, currentItem) {
    (sortedArray[currentItem[key]] = sortedArray[currentItem[key]] || []).push(
      currentItem
    );
    return sortedArray;
  }, {});
};

export const groupExercisesByName = (data) => {
  const test = groupByReturnObject(data, "name");
  const tesyKeys = [];
  const groupedArray = [];
  for (const key in test) {
    tesyKeys.push(key);
  }

  for (let i = 0; i < tesyKeys.length; i++) {
    groupedArray.push({
      name: test[tesyKeys[i]][0].name,
      kind: test[tesyKeys[i]][0].kind,
      units: test[tesyKeys[i]][0].units,
      details: test[tesyKeys[i]].map((idk) => {
        return {
          date: idk.date,
          month: idk.month,
          year: idk.year,
          sets: idk.sets,
        };
      }),
    });
  }
  return groupedArray;
};
