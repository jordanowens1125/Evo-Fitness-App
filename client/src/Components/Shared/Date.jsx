import React from "react";
import RightArrow from "../../assets/right-arrow";
import LeftArrow from "../../assets/left-arrow";
import { convertDatetoYYYYMMDDFormat } from "../../utils/dateFunctions";
const value = 60;

const DateComponent = ({
  decreaseby1,
  increaseby1,
  input,
  jumpToDate,
  setDateToday,
}) => {
  return (
    <div className="flex space-around aic">
      <button onClick={decreaseby1}>
        <LeftArrow value={60} />
      </button>
      <span>
        <label htmlFor="Date">Date: </label>
        <input
          type="date"
          id="start"
          name="Date"
          value={input.toISOString().slice(0, 10)}
          min="2023-04-01"
          max={convertDatetoYYYYMMDDFormat(new Date())}
          onChange={jumpToDate}
        ></input>
      </span>
      {setDateToday ? (
        <>
          <h1 onClick={setDateToday}>Today</h1>
        </>
      ) : (
        <></>
      )}
      <button onClick={increaseby1}>
        <RightArrow value={60} />
      </button>
    </div>
  );
};

export default DateComponent;
