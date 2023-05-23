import { daysPriorOptions } from "../data/timeData";
import dayjs from "dayjs";
//format returned is 'MM-DD-YYYY'
export const getDatesForRange = (start, end) => {
  for (
    var arr = [], dt = new Date(start);
    dt <= new Date(end);
    dt.setDate(dt.getDate() + 1)
  ) {
    const [year, month, day] = new Date(dt)
      .toISOString()
      .slice(0, 10)
      .split("-");
    arr.push(`${month}-${day}-${year}`);
  }
  return arr;
};

export const getFutureDate = (date, rangeValue) => {
  let futureDate = structuredClone(date);
  switch (rangeValue) {
    case daysPriorOptions[0]: //Week
      futureDate.setDate(futureDate.getDate() + 7);
      break;
    case daysPriorOptions[1]: //Month
      futureDate = getDateOfOneMonthLater(futureDate);
      break;
    case daysPriorOptions[2]: //6 Months
      futureDate = getDateSixMonthsLater(futureDate);
      break;
    case daysPriorOptions[3]: //Year
      futureDate = getDateOneYearLater(futureDate);
      break;
    default:
      futureDate.setDate(futureDate.getDate() + 7);
  }
  return futureDate;
};

export const getPriorDate = (date, rangeValue) => {
  let newPriorDate = structuredClone(date);
  switch (rangeValue) {
    case daysPriorOptions[0]: //Week
      newPriorDate.setDate(newPriorDate.getDate() - 7);
      break;
    case daysPriorOptions[1]: //Month
      newPriorDate = getDateOfOneMonthPrior(newPriorDate);
      break;
    case daysPriorOptions[2]: //6 Months
      newPriorDate = getDateSixMonthsPrior(newPriorDate);
      break;
    case daysPriorOptions[3]: //Year
      newPriorDate = getDateOneYearPrior(newPriorDate);
      break;
    default:
      newPriorDate.setDate(newPriorDate.getDate() - 7);
  }
  return newPriorDate;
};

export const getDateOfOneMonthPrior = (date) => {
  const newDate = new Date(
    date.getFullYear(),
    date.getMonth() - 1,
    date.getDate()
  );
  if (newDate.getMonth() === date.getMonth()) {
    return new Date(date.getFullYear(), date.getMonth(), 0);
  }
  return newDate;
};

export const getDateSixMonthsPrior = (date) => {
  const newDate = new Date(
    date.getFullYear(),
    date.getMonth() - 6,
    date.getDate()
  );
  return newDate;
};

export const getDateOneYearPrior = (date) => {
  const newDate = new Date(
    date.getFullYear() - 1,
    date.getMonth(),
    date.getDate()
  );
  return newDate;
};

export const getDateOfOneMonthLater = (date) => {
  const newDate = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );
  if (newDate.getMonth() === date.getMonth()) {
    return new Date(date.getFullYear(), date.getMonth(), 0);
  }
  return newDate;
};

export const getDateSixMonthsLater = (date) => {
  const newDate = new Date(
    date.getFullYear(),
    date.getMonth() + 6,
    date.getDate()
  );
  return newDate;
};

export const getDateOneYearLater = (date) => {
  const newDate = new Date(
    date.getFullYear() + 1,
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
  const YYYYMMDD = date.toISOString().slice(0, 10);
  const [year, month, day] = YYYYMMDD.split("-");
  const result = `${month}-${day}-${year}`;
  return result;
};

export const convertMMDDYYYYtoYYYYMMDD = (date) => {
  const [month, day, year] = date.split("-");
  return `${year}-${month}-${day}`;
};

export const convertYYYYMMDDtoDate = (date) => {
  const [year, month, day] = date.split("-");
  return new Date(year, month - 1, day);
};

export const convertDatetoYYYYMMDDFormat = (date) => {
  const YYYYMMDD = date.toISOString().slice(0, 10);
  const [year, month, day] = YYYYMMDD.split("-");
  const result = `${year}-${month}-${day}`;
  return result;
};

export const compareDatesInDateFormat = (date1, date2) => {
  return (
    dayjs(date1).format("DD/MM/YYYY") === dayjs(date2).format("DD/MM/YYYY")
  );
};

export const sortObjectsWithDatePropertyInMMDDYYYY = (items) => {
  const newItems = items.sort(function (a, b) {
    return (
      convertMMDDYYYYtoDateFormat(a.date) - convertMMDDYYYYtoDateFormat(b.date)
    );
  });
  return newItems;
};
