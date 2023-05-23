import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import DailyWorkoutLog from "./Pages/DailyWorkoutLog";
import Layout from "./Pages/Layout";
import { DataContext } from "./Context/Context";
// import Macros from "./pages/Macros";
import WeightTracker from "./Pages/WeightTracker";
import QuickLinks from "./Pages/QuickLinks";
import WorkoutInfo from "./Pages/WorkoutInfo";
import Account from "./Pages/Account";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import useAuthContext from "./Hooks/useAuthContext";
import dummyData from "./Data/dummyData"
import { exercises } from "./Data/bodySegments";
import { storedRoutines } from "./Data/routines";

function App() {
  const [data, setData] = useState(dummyData.byDay);
  const [routines, setRoutines] = useState(storedRoutines);
  const [exerciseList, setExerciseList] = useState(exercises);
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
          }}
        >
          <Routes>
            {/* <Route element={<ProtectedRoute user={currentUser} />}> */}
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={user ? <DailyWorkoutLog /> : <Navigate to="/signin" />}
              />
              <Route
                path="weight"
                element={user ? <WeightTracker /> : <Navigate to="/signin" />}
              />
              <Route
                path="workoutInfo"
                element={user ? <WorkoutInfo /> : <Navigate to="/signin" />}
              />
              <Route
                exact
                path="/account"
                element={user ? <Account /> : <Navigate to="/signin" />}
              />
              <Route
                path="/quickLinks"
                element={user ? <QuickLinks /> : <Navigate to="/signin" />}
              />
              {/* <Exercises/> */}
              {/* <Macros /> */}
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
