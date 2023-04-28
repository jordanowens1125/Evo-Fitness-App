import React, { useContext, useState } from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DataContext } from "../context/Context";
import { generateRandomColor } from "../data/colors";
import {
  compareDatesInDateFormat,
  convertDateToMMDDYYYYFormat,
  convertDatetoYYYYMMDDFormat,
  convertMMDDYYYYtoDateFormat,
  convertYYYYMMDDtoDate,
  getDatesForRange,
  getFutureDate,
  getPriorDate,
} from "../utils/dateFunctions";
import DateRangeDropDown from "../Components/ByDay/DateRangeDropDown";
import { getWeightChartHeight, getWindowHeight, getWindowWidth } from "../utils/getDimensions";

const templateDay = {
  date: "",
  score: 0,
  weight: 0,
  exercises: [],
};

const populateEmptyData = (newDates) => {
  const dates = [];
  for (let i = 0; i < newDates.length; i++) {
    let emptyData = {
      date: newDates[i],
      score: 0,
      exercises: [],
      weight: 0,
    };
    emptyData["weight"] = 0;
    dates.push(emptyData);
  }
  return dates;
};

const inputDataIntoEmptyList = (sortedData, emptyDataForRange) => {
  let count = 0;
  let latestWeight = 0;
  let done = false;
  for (let i = 0; i < emptyDataForRange.length; i++) {
    emptyDataForRange[i].weight = latestWeight;
    if (count >= sortedData.length) {
      done = true;
    }
    if (!done) {
      if (sortedData[count].date === emptyDataForRange[i].date) {
        latestWeight = sortedData[count].weight || latestWeight;
        emptyDataForRange[i] = sortedData[count];
        if (!emptyDataForRange[i].weight) {
          emptyDataForRange[i].weight = latestWeight;
        }
        count++;
      }
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

const WeightTracker = () => {
  const context = useContext(DataContext);
  const data = context.data;
  const [randomColor, setRandomColor] = useState(generateRandomColor());
  const [weightToday, setWeightToday] = useState(data[data.length - 1].weight);
  const [date, setDate] = useState(new Date());
  const [daysPrior, setDaysPrior] = useState(7);
  const [priorDate, setPriorDate] = useState(
    new Date(new Date().setDate(date.getDate() - daysPrior))
  );

  const [dateRange, setDateRange] = useState(getDatesForRange(priorDate, date));

  const emptyData = populateEmptyData(dateRange, "weight");

  const filteredDataForRange = filterDataByRange(data, dateRange);

  const filledData = inputDataIntoEmptyList(filteredDataForRange, emptyData);

  const handleLogWeightForDay = (e) => {
    setWeightToday(e.currentTarget.value);
    const newData = [...data];
    const day = new Date();
    const convertedDate = convertDateToMMDDYYYYFormat(day);
    //if this day does not exist
    if (convertedDate !== newData[newData.length - 1].date) {
      //make a new day object if there is not one already
      newData.push(templateDay);
    }
    const lastItemIndex = newData.length - 1;
    newData[lastItemIndex].weight = +e.currentTarget.value;
    newData[lastItemIndex].date = convertedDate;
    context.setData(newData);
  };

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

  const handleRangeChange = (e) => {
    const newPriorDate = getPriorDate(date, e.currentTarget.value);
    setDaysPrior(e.currentTarget.value);
    setPriorDate(newPriorDate);
    setDateRange(getDatesForRange(newPriorDate, date));
  };

  return (
    <>
      <div className="page flex flex-column  ">
        <div className="flex aic space-around wrap padding-md">
          <button onClick={testLeft}>Left</button>
          <DateRangeDropDown
            daysPrior={daysPrior}
            handleRangeChange={handleRangeChange}
          />
          <span className="flex gap-md aic">
            <label htmlFor="Date">Date:</label>
            <input
              type="date"
              id="start"
              name="Date"
              value={date.toISOString().slice(0, 10)}
              min="2022-04-01"
              max={convertDatetoYYYYMMDDFormat(new Date())}
              onChange={jumpToDate}
            ></input>

            {compareDatesInDateFormat(date, new Date()) ? (
              <></>
            ) : (
              <>
                <button onClick={setDateToToday}>Today</button>
              </>
            )}
          </span>
          <button onClick={testRight}>Right</button>
        </div>
        Current Weight:
        <input
          type="number"
          name="Weight"
          id="Weight"
          value={weightToday}
          onChange={handleLogWeightForDay}
          className="width-sm primary bg no-border heading-md"
        />
        lbs
        <div className="full-width full-height grow flex aic">
          <ResponsiveContainer height={400} width={"100%"}>
            <AreaChart
              data={filledData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              className=""
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
              {/* <CartesianGrid strokeDasharray=".5 3" /> */}
              <Tooltip />
              <Area
                type="monotone"
                dataKey={"weight"}
                stroke={randomColor || "#8884d8"}
                fillOpacity={1}
                fill="url(#colorUv)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default WeightTracker;
