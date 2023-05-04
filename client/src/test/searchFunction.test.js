import { findIndex } from "../utils/searchFunction";
const dates = [
  { officialDate: new Date(2023, 2, 1) },
  { officialDate: new Date(2023, 3, 1) },
  { officialDate: new Date(2023, 3, 23) },
  { officialDate: new Date(2023, 5, 1) },
];

test("Found where index is", () => {
  expect(findIndex(dates, new Date(2023, 4, 23), 0, dates.length)).toBe(3);
  expect(findIndex(dates, new Date(2023, 0, 23), 0, dates.length)).toBe(0);
  expect(findIndex(dates, new Date(2022, 5, 23), 0, dates.length)).toBe(0);
  expect(findIndex(dates, new Date(2023, 5, 23), 0, dates.length)).toBe(4);
  expect(findIndex(dates, new Date(2020, 5, 23), 0, dates.length)).toBe(0);
  expect(findIndex(dates, new Date(2023, 2, 23), 0, dates.length)).toBe(1);
  expect(findIndex(dates, new Date(2023, 3, 13), 0, dates.length)).toBe(2);
  expect(findIndex(dates, new Date(2023, 4, 23), 0, dates.length)).toBe(3);
});
