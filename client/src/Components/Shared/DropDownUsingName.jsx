import React from "react";

const DropDownUsingName = ({ value, handleChange, listOfValues, title }) => {
  return (
    <>
      {title ? <label htmlFor={title}> {title}:</label> : <></>}

      <select
        name={value.name}
        id={title}
        onChange={handleChange}
        value={value}
      >
        {listOfValues.map((value, index) => (
          <option value={index} key={listOfValues[index].name}>
            {" "}
            {listOfValues[index].name}
          </option>
        ))}
      </select>
    </>
  );
};

export default DropDownUsingName;
