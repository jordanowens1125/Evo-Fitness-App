import { useContext, useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { DataContext } from "../Context/Context";
import { convertDateToMMDDYYYYFormat } from "../utils/dateFunctions";
import Input from "../Components/Shared/Input";

const templateDay = {
  date: "",
  officialDate: "",
  Weight: 0,
};

const Account = () => {
  const { user } = useAuthContext();

  const context = useContext(DataContext);
  const data = context.weightlog;
  let weight = data[data.length - 1].Weight;
  const [tempData, setTempData] = useState({
    name: user?.user?.name || "Evo",
    Weight: weight,
    weightLog: data,
  });
  const [info, setInfo] = useState({
    name: user.user.name || "Jakx",
    // age: 23,
    // gender: "",
    // feet: 5,
    // inches: 8,
    Weight: weight,
    weightLog: data,
  });

  const [editMode, setEditMode] = useState(false);
  // const [theme, setTheme] = useState("dark-mode");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = [...data];
    const day = new Date();
    const convertedDate = convertDateToMMDDYYYYFormat(day);
    if (newData.length === 0) {
      newData.push(templateDay);
      const lastItemIndex = newData.length - 1;
      newData[lastItemIndex].Weight = tempData["Weight"];
      newData[lastItemIndex].date = convertedDate;
      newData[lastItemIndex].officialDate = day;
    } else {
      if (newData[newData.length - 1].date === convertedDate) {
        newData[newData.length - 1].Weight = tempData["Weight"];
      } else {
        newData.push(templateDay);
        const lastItemIndex = newData.length - 1;
        newData[lastItemIndex].Weight = tempData["Weight"];
        newData[lastItemIndex].date = convertedDate;
        newData[lastItemIndex].officialDate = day;
      }
    }
    tempData.weightLog = newData;
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users/updateinfo`,
      {
        method: "PUT",
        body: JSON.stringify(tempData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (!response.ok) {
      console.log("Error");
      console.log(response);
      //setError
    }
    if (response.ok) {
      setEditMode(false);
      const copy = { ...info };
      copy["name"] = tempData["name"];
      copy["Weight"] = tempData["Weight"];
      copy["weightLog"] = newData;
      setInfo(copy);
      const newUser = { ...user };
      newUser.user.name = tempData["name"];
      localStorage.setItem("user", JSON.stringify(newUser));
    }
  };

  const handleChange = (e) => {
    const name = e.currentTarget.id;
    const value = e.currentTarget.value;
    const copy = { ...tempData };
    copy[name] = value;
    setTempData(copy);
  };

  const handleClose = () => {
    setEditMode(false);
  };
  return (
    <>
      <div className="page flex">
        {editMode ? (
          <>
            <section className="modal">
              <form
                className="modal-content flex-column text-align"
                onSubmit={handleSubmit}
              >
                <span className="flex space-between gap-lg">
                  <h2>Update Profile:</h2>
                  <button
                    onClick={handleClose}
                    className="ghost-button"
                    aria-label="Cancel"
                  >
                    Cancel
                  </button>
                </span>
                <Input
                  type="text"
                  value={tempData.name}
                  id="name"
                  label={"Name"}
                  onChange={handleChange}
                />
                {/* <label htmlFor="Age">Age: </label>
                <input
                  type="number"
                  value={info.age}
                  id="age"
                  placeholder="Age:"
                  onChange={handleChange}
                  aria-label="Age"
                />
                <label htmlFor="Feet">Feet: </label>
                <input
                  type="number"
                  value={info.feet}
                  id="feet"
                  onChange={handleChange}
                  aria-label="Feet"
                />
                <label htmlFor="Inches">Inches: </label>
                <input
                  type="number"
                  value={info.inches}
                  id="inches"
                  onChange={handleChange}
                  aria-label="Inches"
                /> */}
                <Input
                  type="number"
                  value={tempData.Weight}
                  id="Weight"
                  onChange={handleChange}
                  label={"Weight (lbs) "}
                  max={500}
                />
                <button
                  className="primary-button"
                  type="submit"
                  aria-label="Submit"
                >
                  Submit
                </button>
              </form>
            </section>
          </>
        ) : (
          <>
            <section className="padding-lg  flex-column gap-lg jcc margin-lg full-width aic text-align">
              <h1>Name: {info.name}</h1>
              {/* <p>Age: {info.age}</p> */}
              {/* <p>
                Height:{info.feet} Feet - {info.inches} Inches{" "}
              </p> */}
              <p>Weight: {info.Weight} Pounds (lbs)</p>
              {/* <label className="switch">
                <input type="checkbox" aria-label="Change Color Theme" />
                <span className="slider round" onClick={changeTheme}></span>
              </label> */}
              <button
                onClick={() => setEditMode(true)}
                className="primary-button"
                aria-label="Edit Account"
              >
                Edit
              </button>
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default Account;
