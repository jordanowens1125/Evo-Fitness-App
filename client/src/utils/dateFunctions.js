
//format returned is 'MM-DD-YYYY'
export const getDatesForRange = (start, end) => {
    for (
      var arr = [], dt = new Date(start);
      dt <= new Date(end);
      dt.setDate(dt.getDate() + 1)
    ) {
        const [year,month,day] = new Date(dt).toISOString().slice(0,10).split('-')
        arr.push(`${month}-${day}-${year}`);
  }
    return arr;
}

export const getDateOfOneMonthPrior = (date) => {
  const newDate = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate())
  if (newDate.getMonth() === date.getMonth()) {
    return new Date(date.getFullYear(), date.getMonth(), 0)
  }
  return newDate
}

export const getDateSixMonthsPrior = (date) => {
  const newDate = new Date(
    date.getFullYear(),
    date.getMonth() - 6,
    date.getDate()
  );
  return newDate
}

export const getDateOneYearPrior = (date) => {
  const newDate = new Date(
    date.getFullYear() - 1,
    date.getMonth(),
    date.getDate()
  );
  return newDate;
};

export const convertMMDDYYYYtoDateFormat = (dateInMMDDYYFormat) => {
  const [month, day, year] = dateInMMDDYYFormat.split("-");
  const dateFormatted = new Date(year, month - 1, day); //minus 1 because months are 0 indexed
  return dateFormatted;
};

export const convertDateToMMDDYYYYFormat = (date) => {
  const YYYYMMDD = date.toISOString().slice(0, 10)
  const [year, month, day] = YYYYMMDD.split('-')
  const result = `${month}-${day}-${year}`
  return result
}