//return index for where this exercise info should be added
export function findIndex(data, date) {
  console.log(data);
  let mid = 0;
  const dateTime = date;
  let l = 0;
  let r = data.length - 1;
  while (l <= r) {
    mid = Math.ceil((l + r) / 2);
    console.log(mid);
    const dataPoint = data[mid].officialDate;
    if (dataPoint === dateTime) {
      return mid;
    } else if (dataPoint > dateTime) {
      r = mid - 1;
    } else {
      console.log(dataPoint +' greater than ' +dateTime);
      l = mid + 1;
    }
  }
  if (mid >= data.length) return data.length;
  else if (data[mid].officialDate > date) return mid;
  else return mid + 1;
}
