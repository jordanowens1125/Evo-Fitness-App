import { findIndex } from "../Utils/searchFunction";
const dates = [
  { officialDate: new Date(2023, 2, 1) },
  { officialDate: new Date(2023, 3, 1) },
  { officialDate: new Date(2023, 3, 23) },
  { officialDate: new Date(2023, 5, 1) },
  { officialDate: new Date(2023, 5, 23) },
];

const dates2 = [
  { officialDate: new Date(2023, 4, 29) },
  { officialDate: new Date(2023, 4, 30) },
];

test("Found where index is", () => {
  expect(findIndex(dates, new Date(2023, 4, 23))).toBe(3);
  expect(findIndex(dates, new Date(2023, 0, 23))).toBe(0);
  expect(findIndex(dates, new Date(2022, 5, 23))).toBe(0);
  expect(findIndex(dates, new Date(2023, 5, 23))).toBe(4);
  expect(findIndex(dates, new Date(2020, 5, 23))).toBe(0);
  expect(findIndex(dates, new Date(2023, 2, 23))).toBe(1); 
  expect(findIndex(dates, new Date(2023, 3, 13))).toBe(2);
  expect(findIndex(dates, new Date(2023, 4, 23))).toBe(3);
  expect(findIndex(dates, new Date(2023, 5, 1))).toBe(3);
  expect(findIndex(dates, new Date(2020, 0, 23))).toBe(0);
});

test("Found where index is #2", () => {
  expect(findIndex(dates2, new Date(2023, 4, 1), 0, dates2.length)).toBe(0);
});