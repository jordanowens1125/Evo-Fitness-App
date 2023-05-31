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
      <div className="flex-column aic margin-bottom-lg padding-top-md">
        {setDateToday ? (
          <>
            {isToday ? (
              <>
                <button
                  disabled
                  className="secondary-button disabled"
                  aria-label="Disabled"
                >
                  Today
                </button>
              </>
            ) : (
              <>
                {" "}
                <button
                  onClick={setDateToday}
                  className="secondary-button"
                  aria-label="Jump Back To Today"
                >
                  Today
                </button>
              </>
            )}
          </>
        ) : (
          <></>
        )}
        <div className="flex space-around aic">
          <button
            onClick={decreaseby1}
            className="no-border rotate-180"
            aria-label="Go Back"
          >
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
              aria-label="Date"
            ></input>
          </span>
          {isToday ? (
            <>
              <button className="no-border disabled" aria-label="Disabled">
                <RightArrow value={value} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={increaseby1}
                className="no-border"
                aria-label="Go Forward"
              >
                <RightArrow value={value} />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DateComponent;
