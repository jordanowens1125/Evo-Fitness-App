import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
// import WorkoutHeatMap from './pages/WorkoutHeatMap'
// import ExerciseChart from "./pages/ExerciseChart";
import dummyData from "./data/dummyData";
import ByDay from "./pages/ByDay";
import DailyWorkoutLog from "./pages/DailyWorkoutLog";
import Calendar from "./pages/Calendar";
import Layout from "./pages/Layout";
import { DataContext } from "./Context/Context";
import AllWorkouts from "./pages/AllWorkouts";

function App() {
  const [data, setData] = useState(dummyData.byDay);
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
      <DataContext.Provider value={{ data, setData }}>
        <ByDay />
        <DailyWorkoutLog />
        {/* <Calendar /> */}
        {/* <AllWorkouts/> */}
      </DataContext.Provider>
    </div>
  );
}

export default App;
