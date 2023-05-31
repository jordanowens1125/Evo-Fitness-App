import React, { useContext, useState } from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DataContext } from "../Context/Context";
import { generateRandomColor } from "../data/colors";
import {
  convertDateToMMDDYYYYFormat,
  convertMMDDYYYYtoDateFormat,
  convertYYYYMMDDtoDate,
  getDatesForRange,
  getFutureDate,
  getPriorDate,
} from "../utils/dateFunctions";
import DateRangeDropDown from "../Components/ByDay/DateRangeDropDown";
import DateComponent from "../Components/Shared/Date";
import useAuthContext from "../hooks/useAuthContext";

const templateDay = {
  date: "",
  officialDate: "",
  Weight: 0,
};

const populateEmptyData = (newDates) => {
  const dates = [];
  for (let i = 0; i < newDates.length; i++) {
    let emptyData = {
      date: newDates[i],
      Weight: 0,
    };
    emptyData["Weight"] = 0;
    dates.push(emptyData);
  }
  return dates;
};

const inputDataIntoEmptyList = (sortedData, emptyDataForRange) => {
  let count = 0;
  let latestWeight = 0;
  let done = false;
  for (let i = 0; i < emptyDataForRange.length; i++) {
    emptyDataForRange[i].Weight = latestWeight;
    if (count >= sortedData.length) {
      done = true;
    }
    if (!done) {
      if (sortedData[count].date === emptyDataForRange[i].date) {
        latestWeight = sortedData[count].Weight || latestWeight;
        emptyDataForRange[i] = sortedData[count];
        if (!emptyDataForRange[i].Weight) {
          emptyDataForRange[i].Weight = latestWeight;
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

const getCurrentWeight = (data) => {
  if (data.length > 0) {
    if (data[data.length - 1].Weight) {
      return data[data.length - 1].Weight;
    }
  }
  return 0;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip secondary-bg">
        <i>{label} :</i>
        <b className="label primary">{` ${payload[0].value} lbs`}</b>
      </div>
    );
  }
  return null;
};

const WeightTracker = () => {
  const context = useContext(DataContext);
  const data = context.weightlog;
  const { user } = useAuthContext();
  const [randomColor, setRandomColor] = useState(generateRandomColor());
  const [weightToday, setWeightToday] = useState(getCurrentWeight(data));
  const [tempWeight, setTempWeight] = useState(weightToday);
  const [logMode, setLogMode] = useState(false);
  const [date, setDate] = useState(new Date());
  const [daysPrior, setDaysPrior] = useState(7);
  const [priorDate, setPriorDate] = useState(
    new Date(new Date().setDate(date.getDate() - daysPrior))
  );

  const [dateRange, setDateRange] = useState(getDatesForRange(priorDate, date));

  const emptyData = populateEmptyData(dateRange, "Weight");

  const filteredDataForRange = filterDataByRange(data, dateRange);
  const filledData = inputDataIntoEmptyList(filteredDataForRange, emptyData);

  const handleClose = () => {
    setLogMode(false);
  };

  const handleLogWeightForDay = (e) => {
    setTempWeight(e.currentTarget.value);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = [...data];
    const day = new Date();
    const convertedDate = convertDateToMMDDYYYYFormat(day);
    if (newData.length === 0) {
      newData.push(templateDay);
      const lastItemIndex = newData.length - 1;
      newData[lastItemIndex].Weight = tempWeight;
      newData[lastItemIndex].date = convertedDate;
      newData[lastItemIndex].officialDate = day;
    } else {
      if (newData[newData.length - 1].date === convertedDate) {
        newData[newData.length - 1].Weight = tempWeight;
      } else {
        newData.push(templateDay);
        const lastItemIndex = newData.length - 1;
        newData[lastItemIndex].Weight = tempWeight;
        newData[lastItemIndex].date = convertedDate;
        newData[lastItemIndex].officialDate = day;
      }
    }

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users/updateweight`,
      {
        method: "PUT",
        body: JSON.stringify(newData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (!response.ok) {
      console.log("Error");
      //setError
    }
    if (response.ok) {
      context.setWeightLog(newData);
    }
    setWeightToday(tempWeight);
    setLogMode(false);
  };

  return (
    <>
      {logMode && (
        <>
          <div className="modal">
            <form className="modal-content aic jcc" onSubmit={handleSubmit}>
              <h2 className="border-bottom-primary padding-md">
                Log Weight for Today
              </h2>
              <input
                type="number"
                placeholder="Weight"
                value={tempWeight}
                onChange={handleLogWeightForDay}
                min={0}
                max={800}
                aria-label="Weight"
              />
              <button
                className="modal-cancel ghost-button"
                onClick={handleClose}
                aria-label="Cancel"
              >
                Cancel
              </button>
              <button
                className="primary-button"
                type="submit"
                aria-label="Submit"
              >
                Submit
              </button>
            </form>
          </div>
        </>
      )}

      <div className="page flex-column aic gap-md">
        <DateComponent
          input={date}
          decreaseby1={testLeft}
          increaseby1={testRight}
          jumpToDate={jumpToDate}
          setDateToday={setDateToToday}
        />
        <span className="flex aic gap-md">
          <p>Current Weight:</p>
          <b className="primary heading-md">{weightToday} lbs</b>
          <button
            onClick={() => setLogMode(true)}
            className="secondary-button"
            aria-label="Log Weight"
          >
            Log Weight
          </button>
        </span>
        <DateRangeDropDown
          daysPrior={daysPrior}
          handleRangeChange={handleRangeChange}
        />
        <div className="full-width full-height grow flex aic jcc body-color">
          <ResponsiveContainer height={400} width={"100%"}>
            <AreaChart
              data={filledData}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
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
              <Tooltip
                cursor={{ fill: "transparent" }}
                content={<CustomTooltip />}
              />
              <Area
                type="monotone"
                dataKey={"Weight"}
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
