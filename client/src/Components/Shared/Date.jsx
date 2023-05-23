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
  const isToday =
    input.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10);
  return (
    <>
      <div className="flex-column aic margin-bottom-lg">
        <div className="flex space-around aic">
          <button onClick={decreaseby1} className="no-border rotate-180">
            <LeftArrow value={value} />
          </button>
          <span className="flex-column aic">
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
          {isToday ? (
            <>
              <button className="no-border disabled">
                <RightArrow value={value} />
              </button>
            </>
          ) : (
            <>
              <button onClick={increaseby1} className="no-border">
                <RightArrow value={value} />
              </button>
            </>
          )}
        </div>
        {setDateToday ? (
          <>
            {isToday ? (
              <>
                <button disabled>Today</button>
              </>
            ) : (
              <>
                {" "}
                <button onClick={setDateToday}>Today</button>
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default DateComponent;
