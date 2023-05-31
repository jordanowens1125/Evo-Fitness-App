import { useContext, useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { DataContext } from "../Context/Context";

const Account = () => {
  const { user } = useAuthContext();
  const context = useContext(DataContext);
  const data = context.weightlog;
  let weight = data[data.length - 1].Weight;
  const [info, setInfo] = useState({
    name: "Jakx",
    age: 23,
    gender: "",
    feet: 5,
    inches: 8,
    Weight: weight,
  });

  const [editMode, setEditMode] = useState(false);
  const [theme, setTheme] = useState("dark-mode");
  const handleSubmit = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users/updateinfo`,
      {
        method: "PUT",
        body: JSON.stringify(info),
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
    }
  };

  const changeTheme = () => {
    const element = document.getElementById("App");
    if (theme === "dark-mode") {
      element?.classList.remove("dark-mode");
      setTheme("light-mode");
      element?.classList.add("light-mode");
    } else {
      element?.classList.remove("light-mode");
      setTheme("dark-mode");
      element?.classList.add("dark-mode");
    }
  };

  const handleChange = (e) => {
    const name = e.currentTarget.id;
    const value = e.currentTarget.value;
    const copy = { ...info };
    copy[name] = value;
    setInfo(copy);
  };
  return (
    <>
      <div className="page flex">
        {editMode ? (
          <>
            <section className="modal">
              <div className="modal-content flex-column">
                <span className="flex space-between gap-lg">
                  <h2>Update Profile:</h2>
                  <button onClick={() => setEditMode(false)} className="ghost-button">Cancel</button>
                </span>
                <label htmlFor="Name">Name: </label>
                <input
                  type="text"
                  value={info.name}
                  id="name"
                  placeholder="Name:"
                  onChange={handleChange}
                />
                <label htmlFor="Age">Age: </label>
                <input
                  type="number"
                  value={info.age}
                  id="age"
                  placeholder="Age:"
                  onChange={handleChange}
                />
                <label htmlFor="Feet">Feet: </label>
                <input
                  type="number"
                  value={info.feet}
                  id="feet"
                  placeholder="Feet:"
                  onChange={handleChange}
                />
                <label htmlFor="Inches">Inches: </label>
                <input
                  type="number"
                  value={info.inches}
                  id="inches"
                  placeholder="Inches:"
                  onChange={handleChange}
                />
                <label htmlFor="Weight">Weight: Pounds(lbs) </label>
                <input
                  type="number"
                  value={info.Weight}
                  id="weight"
                  placeholder="Weight:"
                  onChange={handleChange}
                />
                <button onClick={handleSubmit} className="primary-button">
                  Submit
                </button>
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="padding-lg flex flex-column gap-lg jcc margin-lg full-width aic">
              <h1>Name: {info.name}</h1>
              <p>Age: {info.age}</p>
              <p>
                Height:{info.feet} Feet - {info.inches} Inches{" "}
              </p>
              <p>Weight: {info.Weight} Pounds (lbs)</p>
              {/* <label className="switch">
                <input type="checkbox" aria-label="Change Color Theme" />
                <span className="slider round" onClick={changeTheme}></span>
              </label> */}
              <button onClick={() => setEditMode(true)} className="primary-button">Edit</button>
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default Account;
