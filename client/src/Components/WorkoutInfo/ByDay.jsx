import { useState, useContext } from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  convertMMDDYYYYtoDateFormat,
  convertYYYYMMDDtoDate,
  getDatesForRange,
  getFutureDate,
  getPriorDate,
} from "../../utils/dateFunctions";
import DateRangeDropDown from "../ByDay/DateRangeDropDown";
import { DataContext } from "../../Context/Context";
import { generateRandomColor } from "../../data/colors";
import DropDownUsingName from "../Shared/DropDownUsingName";
import DateComponent from "../Shared/Date";

const getDisplayValue = (exercises, exercise, value) => {
  const name = exercise.name;
  let count = 0;
  for (let i = 0; i < exercises.length; i++) {
    if (name === exercises[i].name) {
      if (exercises[i].sets[value.name]) {
        const addedValueToCount = exercises[i].sets[value.name].reduce(
          (accums, current) => accums + parseInt(current),
          0
        );
        count = parseInt(count) + addedValueToCount;
      }
    }
  }
  return count;
};

const populateEmptyData = (newDates, details) => {
  const dates = [];
  for (let i = 0; i < newDates.length; i++) {
    let emptyData = {
      date: newDates[i],
      score: 0,
      exercises: [],
      weight: 0,
    };
    emptyData[details.name] = 0;
    dates.push(emptyData);
  }
  return dates;
};

const inputDataIntoEmptyList = (
  sortedData,
  emptyDataForRange,
  exercise,
  detail
) => {
  let count = 0;
  for (let i = 0; i < emptyDataForRange.length; i++) {
    if (count >= sortedData.length) {
      return emptyDataForRange;
    }
    if (count >= sortedData.length) {
      return emptyDataForRange;
    }
    if (sortedData[count].date === emptyDataForRange[i].date) {
      emptyDataForRange[i].score = sortedData[count].score;
      emptyDataForRange[i].exercises = sortedData[count].exercises;
      emptyDataForRange[i][detail.name] = getDisplayValue(
        sortedData[count].exercises,
        exercise,
        detail
      );
      count++;
    }
  }
  return emptyDataForRange;
};

const filterDataByRange = (data, dateRange) => {
  const filteredArr = [];
  const start = convertMMDDYYYYtoDateFormat(dateRange[0]);
  const end = convertMMDDYYYYtoDateFormat(dateRange[dateRange.length - 1]);

  for (let i = 0; i < data.length; i++) {
    const dateBeingCompared = convertMMDDYYYYtoDateFormat(data[i].date);
    if (
      end.getTime() >= dateBeingCompared.getTime() &&
      start.getTime() <= dateBeingCompared.getTime()
    ) {
      filteredArr.push(data[i]);
    }
  }
  return filteredArr;
};

const ByDay = ({ exerciseIndex, setExerciseIndex }) => {
  const [date, setDate] = useState(new Date());
  const [daysPrior, setDaysPrior] = useState(7);
  const [priorDate, setPriorDate] = useState(
    new Date(new Date().setDate(date.getDate() - daysPrior))
  );
  const context = useContext(DataContext);
  const data = context.data;
  const exercises = context.exerciseList;
  const exerciseObject = exercises[exerciseIndex];
  const [randomColor, setRandomColor] = useState(generateRandomColor());
  const detailReference = Object.keys(exerciseObject["details"])[0];
  const [detail, setDetail] = useState(exerciseObject.details[detailReference]);
  const [dateRange, setDateRange] = useState(getDatesForRange(priorDate, date));

  const emptyData = populateEmptyData(dateRange, detail);
  const filteredDataForRange = filterDataByRange(data, dateRange);

  const filledData = inputDataIntoEmptyList(
    filteredDataForRange,
    emptyData,
    exerciseObject,
    detail
  );

  const setDateToToday = () => {
    const newDate = new Date();
    setDateInfo(newDate);
  };

  const jumpToDate = (e) => {
    const newDate = convertYYYYMMDDtoDate(e.currentTarget.value);
    setDateInfo(newDate);
  };

  const testLeft = () => {
    setDateInfo(priorDate);
  };
  const testRight = () => {
    const futureDate = getFutureDate(date, daysPrior);
    setDateInfo(futureDate);
  };

  const setDateInfo = (newDate) => {
    setDate(newDate);
    const newPriorDate = getPriorDate(newDate, daysPrior);
    setPriorDate(newPriorDate);
    setDateRange(getDatesForRange(newPriorDate, newDate));
  };

  const handleExerciseChange = (e) => {
    setRandomColor(generateRandomColor());
    const newObject = exercises[e.currentTarget.value];
    const firstDetail = Object.keys(newObject.details)[0];
    setExerciseIndex(e.currentTarget.value);
    setDetail(newObject.details[firstDetail]);
  };

  const handleRangeChange = (e) => {
    const newPriorDate = getPriorDate(date, e.currentTarget.value);
    setDaysPrior(e.currentTarget.value);
    setPriorDate(newPriorDate);
    setDateRange(getDatesForRange(newPriorDate, date));
  };

  const handleDetailsChange = (e) => {
    const value = e.currentTarget.value;
    setDetail(exerciseObject.details[value]);
  };

  const DetailsDropDown = ({ detail }) => {
    return (
      <select
        name="details"
        id="details"
        onChange={(e) => handleDetailsChange(e)}
        value={detail.name}
      >
        {Object.keys(exerciseObject.details).map((detail, index) => (
          <option value={detail} key={index} data-id={index}>
            {detail}
          </option>
        ))}
      </select>
    );
  };

  return (
    <>
      <div className="flex-column aic jcc wrap">
        <DateComponent
          decreaseby1={testLeft}
          increaseby1={testRight}
          input={date}
          jumpToDate={jumpToDate}
          setDateToday={setDateToToday}
        />
        <span className="aic flex full-width space-around">
          <DropDownUsingName
            value={exerciseIndex}
            handleChange={handleExerciseChange}
            listOfValues={exercises}
          />
          <DetailsDropDown detail={detail} />
          <DateRangeDropDown
            daysPrior={daysPrior}
            handleRangeChange={handleRangeChange}
          />
        </span>
      </div>
      <div className="full-width full-height grow flex aic">
        <ResponsiveContainer width={"100%"} height={400}>
          <AreaChart
            data={filledData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={randomColor || "#8884d8"}
                  stopOpacity={0.5}
                />
                <stop
                  offset="90%"
                  stopColor={randomColor || "#8884d8"}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Legend verticalAlign="top" height={36} />
            <XAxis dataKey="date" tickLine={false} />
            <YAxis tickLine={false} />

            <Tooltip />
            <Area
              type="monotone"
              dataKey={detail.name}
              stroke={randomColor || "#8884d8"}
              fillOpacity={1}
              fill="url(#colorUv)"
              dot={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default ByDay;
