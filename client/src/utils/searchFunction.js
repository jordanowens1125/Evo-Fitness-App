//return index for where this exercise info should be added
export function findIndex(data, date) {
  date.setHours(0, 0, 0, 0);
  let mid = 0;
  let l = 0;
  let r = data.length-1;
  while (l <= r) {
    mid = Math.ceil((l + r) / 2);
    const dataPoint = new Date(data[mid].officialDate);
    dataPoint.setHours(0, 0, 0, 0);
    if (dataPoint === date) {
      return mid;
    } else if (dataPoint > date) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  let dataPoint = new Date(data[mid].officialDate);
    dataPoint.setHours(0, 0, 0, 0);
  if (mid >= data.length) {
    return data.length
  }
  else if (dataPoint >= date) {
    return mid
  }
  else {
    return mid + 1
  };
}
