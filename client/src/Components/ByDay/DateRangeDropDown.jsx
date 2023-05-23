import React from "react";
import { daysPriorOptions } from "../../Data/timeData";

const DateRangeDropDown = ({ daysPrior, handleRangeChange }) => {
  return (
    <select
      name="exercise"
      id="exercise"
      onChange={handleRangeChange}
      value={daysPrior}
    >
      {daysPriorOptions.map((range) => (
        <option value={range} key={range}>
          {" "}
          {range}
        </option>
      ))}
    </select>
  );
};

export default DateRangeDropDown;
