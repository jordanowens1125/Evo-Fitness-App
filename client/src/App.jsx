import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import WorkoutHeatMap from './pages/WorkoutHeatMap'
// import ExerciseChart from "./pages/ExerciseChart";
import dummyData from "./data/dummyData";
import DailyWorkoutLog from "./pages/DailyWorkoutLog";
import Layout from "./pages/Layout";
import { DataContext } from "./context/Context";
import { storedRoutines } from "./data/routines";
import Macros from "./pages/Macros";
import WeightTracker from "./pages/WeightTracker";
import Exercises from "./pages/Exercises";
import WorkoutInfo from "./pages/WorkoutInfo";
import Account from "./pages/Account";
import { exercises } from "./data/bodySegments";

function App() {
  const [data, setData] = useState(dummyData.byDay);
  const [routines, setRoutines] = useState(storedRoutines);
  const [exerciseList, setExerciseList] = useState(exercises)
  return (
    <div className="dark-mode" id='App'>
      <BrowserRouter>
        <DataContext.Provider value={{ data, setData, routines, setRoutines, exerciseList, setExerciseList }}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<DailyWorkoutLog />} />
              <Route path="/weight" element={<WeightTracker />} />
              <Route path="/workoutInfo" element={<WorkoutInfo />} />
              <Route path="/account" element={<Account />} />
            </Route>
            {/* <Exercises/> */}
            {/* <Macros /> */}
          </Routes>
        </DataContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
