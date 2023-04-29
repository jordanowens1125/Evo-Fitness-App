import React, { useState } from "react";

const Account = () => {
  const [info, setInfo] = useState({
    Name: "Jakx",
    Age: 23,
    Gender: "",
    Height: {
      Feet: 5,
      Inches: 8,
    },
    CurrentWeight: 0,
  });

  const [editMode, setEditMode] = useState(false);

  const handleSubmit = () => {
    setEditMode(false);
  };
  return (
    <>
      <div className="page">
        {editMode ? (
          <>
            <section className="modal">
              <div className="modal-content">
                <input type="text" value={info.Name} />
                <input type="number" value={info.Age} />
                <input type="number" value={info.Height.Feet} />
                <input type="number" value={info.Height.Inches} />
                <input type="number" value={info.CurrentWeight} />
                <span className="flex space-between">
                  <button onClick={() => setEditMode(false)}>Cancel</button>
                  <button onClick={handleSubmit}>Submit</button>
                </span>
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="padding-lg flex flex-column gap-lg jcc margin-lg">
              <h1>Name: {info.Name}</h1>
              <p>Age: {info.Age}</p>
              <p>
                Height:{info.Height.Feet} Feet - {info.Height.Inches} Inches{" "}
              </p>
              <p>Weight: {info.CurrentWeight}</p>
              <button onClick={() => setEditMode(true)}>Edit</button>
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default Account;
