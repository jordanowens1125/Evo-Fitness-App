import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import dummyData from "./data/dummyData";
import DailyWorkoutLog from "./pages/DailyWorkoutLog";
import Layout from "./pages/Layout";
import { DataContext } from "./context/Context";
import { storedRoutines } from "./data/routines";
// import Macros from "./pages/Macros";
import WeightTracker from "./pages/WeightTracker";
import QuickLinks from "./pages/QuickLinks";
import WorkoutInfo from "./pages/WorkoutInfo";
import Account from "./pages/Account";
import { exercises } from "./data/bodySegments";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
// import { getExercises } from "./api/exercises";
// import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import useAuthContext from "./hooks/useAuthContext";

function App() {
  const [data, setData] = useState(dummyData.byDay);
  const [routines, setRoutines] = useState(storedRoutines);
  const [exerciseList, setExerciseList] = useState(exercises);
  const { user } = useAuthContext()
  
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
                element={
                  user ? (
                    <WorkoutInfo />
                  ) : (
                    <Navigate to="/signin" />
                  )
                }
              />
              <Route
                exact
                path="/account"
                element={user ? <Account /> : <Navigate to="/signin" />}
              />
              <Route
                path="/quickLinks"
                element={
                  user ? (
                    <QuickLinks />
                  ) : (
                    <Navigate to="/signin" />
                  )
                }
              />

              {/* <Route path="/weight" element={<WeightTracker />} />
              <Route path="/workoutInfo" element={<WorkoutInfo />} />
              <Route path="/account" element={<Account />} />
              <Route path="/quickLinks" element={<QuickLinks />} /> */}
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
