//utils
import {
  getDatesForRange,
  getDateOfOneMonthLater,
  getDateOfOneMonthPrior,
  getDateOneYearLater,
  getDateOneYearPrior,
  getDateSixMonthsLater,
  getDateSixMonthsPrior,
  getFutureDate,
    getPriorDate,
    convertDateToMMDDYYYYFormat,
    convertMMDDYYYYtoDateFormat, convertYYYYMMDDtoDate,
  convertMMDDYYYYtoYYYYMMDD,
} from "../utils/dateFunctions";

const date = new Date(2023, 3, 23)

test('Gets correct future date for a month', () => {
    const result = new Date(2023, 4, 23)
    expect(getDateOfOneMonthLater(date)).toStrictEqual(result)
})