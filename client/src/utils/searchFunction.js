//return index for where this exercise info should be added
export function findIndex(data, date, l, r) {
    let mid = 0;
    const dateTime = date
  while (l < r) {
    
    mid = Math.ceil(l + (r - l) / 2);
    
      const dataPoint = data[mid].officialDate
    if (dataPoint === dateTime) {
      return -1;
    } else if (dataPoint > dateTime) {
      
      r = mid - 1;
      findIndex(data, date, l, r);
    } else {
      l = mid + 1;
      findIndex(data, date, l, r);
    }
  }
  if (mid >= data.length) return data.length;
  else if (data[mid].officialDate > date) return mid;
  else return mid + 1;
}
