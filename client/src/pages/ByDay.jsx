import React, { useState, useContext, useEffect } from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";
import { kindsOfExercises } from "../data/exerciseCategories";
import {
  compareDatesInDateFormat,
  convertMMDDYYYYtoDateFormat,
  convertYYYYMMDDtoDate,
  getDatesForRange,
  getFutureDate,
  getPriorDate,
} from "../utils/dateFunctions";
import DateRangeDropDown from "../Components/ByDay/DateRangeDropDown";
import ExerciseDropDown from "../Components/ByDay/ExerciseDropDown";
import { DataContext } from "../context/Context";
import { generateRandomColor } from "../data/colors";

const getDisplayValue = (exercises, exercise, value) => {
  let count = 0;
  for (let i = 0; i < exercises.length; i++) {
    if (exercise === exercises[i].name) {
      if (exercises[i].sets[value]) {
        const addedValueToCount = exercises[i].sets[value].reduce(
          (accums, current) => accums + current,
          0
        );
        count = count + addedValueToCount;
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
    };
    emptyData[details] = 0;
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
      emptyDataForRange[i][detail] = getDisplayValue(
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

const ByDay = () => {
  const [date, setDate] = useState(new Date());
  const [daysPrior, setDaysPrior] = useState(7);
  const [priorDate, setPriorDate] = useState(
    new Date(new Date().setDate(date.getDate() - daysPrior))
  );
  const [exercise, setExercise] = useState(
    kindsOfExercises["Weights/Reps"]["exercises"][0]
  );
  const [randomColor, setRandomColor] = useState(generateRandomColor());
  const [kind, setKind] = useState("Weights/Reps");
  const [details, setDetails] = useState(kindsOfExercises[kind]["details"][0]);
  const [dateRange, setDateRange] = useState(getDatesForRange(priorDate, date));
  const context = useContext(DataContext);
  const data = context.data;
  const emptyData = populateEmptyData(dateRange, details);
  const filteredDataForRange = filterDataByRange(data, dateRange);
  const filledData = inputDataIntoEmptyList(
    filteredDataForRange,
    emptyData,
    exercise,
    details
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

  const handleKindChange = (e) => {
    setKind(e.currentTarget.value);
    setExercise(kindsOfExercises[e.currentTarget.value]["exercises"][0]);
    setDetails(kindsOfExercises[e.currentTarget.value]["details"][0]);
    setRandomColor(generateRandomColor());
  };

  const handleExerciseChange = (e) => {
    setRandomColor(generateRandomColor());
    setExercise(e.currentTarget.value);
  };

  const handleRangeChange = (e) => {
    const newPriorDate = getPriorDate(date, e.currentTarget.value);
    setDaysPrior(e.currentTarget.value);
    setPriorDate(newPriorDate);
    setDateRange(getDatesForRange(newPriorDate, date));
  };

  const KindOfExerciseDropDown = ({ kind }) => {
    const keys = Object.keys(kindsOfExercises);
    return (
      <select
        name="exercise"
        id="exercise"
        onChange={handleKindChange}
        value={kind}
      >
        {keys.map((kind) => (
          <option value={kind} key={kind}>
            {" "}
            {kind}
          </option>
        ))}
      </select>
    );
  };

  const DetailsDropDown = ({ details, setDetails }) => {
    return (
      <select
        name="details"
        id="details"
        onChange={(e) => setDetails(e.currentTarget.value)}
        value={details}
      >
        {kindsOfExercises[kind]["details"].map((details) => (
          <option value={details} key={details}>
            {" "}
            {details}
          </option>
        ))}
      </select>
    );
  };
  return (
    <>
      <DateRangeDropDown
        daysPrior={daysPrior}
        handleRangeChange={handleRangeChange}
      />
      <label htmlFor="Date">Date:</label>
      <input
        type="date"
        id="start"
        name="Date"
        value={date.toISOString().slice(0, 10)}
        min="2022-04-01"
        max="2040-12-31"
        onChange={jumpToDate}
      ></input>

      {compareDatesInDateFormat(date, new Date()) ? (
        <></>
      ) : (
        <>
          <button onClick={setDateToToday}>Today</button>
        </>
      )}
      <button onClick={testLeft}>Left</button>
      <button onClick={testRight}>Right</button>
      <AreaChart
        width={800}
        height={300}
        data={filledData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={randomColor || "#8884d8"}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={randomColor || "#8884d8"}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 6" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey={details}
          stroke={randomColor || "#8884d8"}
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
      <ExerciseDropDown
        exercise={exercise}
        handleExerciseChange={handleExerciseChange}
        kind={kind}
      />
      <KindOfExerciseDropDown kind={kind} />
      <DetailsDropDown details={details} setDetails={setDetails} />
    </>
  );
};

export default ByDay;
