import React from 'react';
import './App.css';
// import WorkoutHeatMap from './pages/WorkoutHeatMap'
// import ExerciseChart from "./pages/ExerciseChart";
import ByDay from "./pages/ByDay"
import DailyWorkoutLog from './pages/DailyWorkoutLog';

function App() {
  return (
    <div className="App">
      {/* <ByDay /> */}
      <DailyWorkoutLog/>
    </div>
  );
}

export default App;
