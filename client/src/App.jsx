import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import DailyWorkoutLog from "./pages/DailyWorkoutLog";
import Layout from "./pages/Layout";
import { DataContext } from "./Context/Context";
// import Macros from "./pages/Macros";
import WeightTracker from "./pages/WeightTracker";
import QuickLinks from "./pages/QuickLinks";
import WorkoutInfo from "./pages/WorkoutInfo";
import Account from "./pages/Account";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import useAuthContext from "./hooks/useAuthContext";
import RequireAuth from "./Components/RequireAuth";
import dummyData from "./data/dummyData";
import { exercises } from "./data/bodySegments";
import { storedRoutines } from "./data/routines";
import weight from "./data/weightData";

function App() {
  const [data, setData] = useState(dummyData.byDay);
  const [routines, setRoutines] = useState(storedRoutines);
  const [exerciseList, setExerciseList] = useState(exercises);
  const [weightlog, setWeightLog] = useState(weight);
  const { user } = useAuthContext();
  return (
    <main className="dark-mode" id="App">
      <BrowserRouter>
        <DataContext.Provider
          value={{
            data,
            setData,
            routines,
            setRoutines,
            exerciseList,
            setExerciseList,
            weightlog,
            setWeightLog,
          }}
        >
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route element={<RequireAuth />}>
                <Route
                  index
                  element={
                    <DailyWorkoutLog />
                  }
                />
                <Route
                  path="weight"
                  element={ <WeightTracker />}
                />
                <Route
                  path="workoutInfo"
                  element={ <WorkoutInfo />}
                />
                <Route
                  exact
                  path="account"
                  element={ <Account />}
                />
                <Route
                  path="quickLinks"
                  element={ <QuickLinks />}
                />
                {/* <Exercises/> */}
                {/* <Macros /> */}
              </Route>
            </Route>
            {/* </Route> */}
            <Route
              path="/signin"
              element={!user ? <Signin /> : <Navigate to="/" />}
            ></Route>
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            ></Route>
          </Routes>
        </DataContext.Provider>
      </BrowserRouter>
    </main>
  );
}

export default App;
