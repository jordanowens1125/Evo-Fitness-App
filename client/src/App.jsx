import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
// import WorkoutHeatMap from './pages/WorkoutHeatMap'
// import ExerciseChart from "./pages/ExerciseChart";
import dummyData from "./data/dummyData";
import ByDay from "./pages/ByDay";
import DailyWorkoutLog from "./pages/DailyWorkoutLog";
import Layout from "./pages/Layout";
import { DataContext } from "./context/Context";
import AllWorkouts from "./pages/AllWorkouts";
import ExerciseLog from "./pages/ExerciseLog";
import CreateWorkout from "./pages/CreateWorkout";
import { storedRoutines } from "./data/routines";
import { PieChart, Pie } from "recharts";
import Macros from "./pages/Macros";
import WeightTracker from "./pages/WeightTracker";
import Exercises from "./pages/Exercises";

function App() {
  const [data, setData] = useState(dummyData.byDay);
  const [routines, setRoutines] = useState(storedRoutines);
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Layout/>,
  //     children: [
  //       {
  //         path: "team",
  //         element: <DailyWorkoutLog data={data} setData={setData} />,
  //       },
  //       {
  //         path: "byDay",
  //         element: <ByDay data={data} setData={setData} />,
  //       },
  //     ],
  //   },
  // ]);
  return (
    <div className="App">
      {/* <RouterProvider router={router} /> */}
      <DataContext.Provider value={{ data, setData, routines, setRoutines }}>
        {/* <ByDay /> */}
        
        <DailyWorkoutLog />
        {/* <CreateWorkout /> */}
        {/* <ExerciseLog /> */}
        {/* <WeightTracker/> */}
        {/* <AllWorkouts /> */}
        
        {/* <Exercises/> */}

        {/* <Macros /> */}
      </DataContext.Provider>
    </div>
  );
}

export default App;
