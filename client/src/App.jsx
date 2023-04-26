import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
    <div className="App dark-mode">
      {/* <RouterProvider router={router} /> */}
      <DataContext.Provider value={{ data, setData, routines, setRoutines }}>
         
        {/* <WeightTracker/> */}
        <DailyWorkoutLog/>
        {/* <Exercises/> */}
        {/* <WorkoutInfo /> */}
        {/* <Macros /> */}
      </DataContext.Provider>
    </div>
  );
}

export default App;
