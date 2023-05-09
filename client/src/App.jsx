import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import dummyData from "./data/dummyData";
import DailyWorkoutLog from "./pages/DailyWorkoutLog";
import Layout from "./pages/Layout";
import { DataContext } from "./context/Context";
import { storedRoutines } from "./data/routines";
import Macros from "./pages/Macros";
import WeightTracker from "./pages/WeightTracker";
import QuickLinks from "./pages/QuickLinks";
import WorkoutInfo from "./pages/WorkoutInfo";
import Account from "./pages/Account";
import { exercises } from "./data/bodySegments";
import Signin from "./pages/Signin";
import { getExercises } from "./api/exercises";

function App() {
  const [data, setData] = useState(dummyData.byDay);
  const [routines, setRoutines] = useState(storedRoutines);
  const [exerciseList, setExerciseList] = useState(exercises);

  useEffect(() => {
     async function fetchData() {
       const exercises = await getExercises();
       setExerciseList(exercises)
     }
     fetchData();
  },[])

  return (
    <div className="dark-mode" id="App">
      <BrowserRouter>
        <DataContext.Provider
          value={{
            data,
            setData,
            routines,
            setRoutines,
            exerciseList,
            setExerciseList,
          }}
        >
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<DailyWorkoutLog />} />
              <Route path="/weight" element={<WeightTracker />} />
              <Route path="/workoutInfo" element={<WorkoutInfo />} />
              <Route path="/account" element={<Account />} />
              <Route path="/quickLinks" element={<QuickLinks />} />
              {/* <Exercises/> */}
              {/* <Macros /> */}
            </Route>
            <Route path="/signin" element={<Signin />}></Route>
          </Routes>
        </DataContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
