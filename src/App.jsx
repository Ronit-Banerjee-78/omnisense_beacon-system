import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import SensorDashboard from "./sensorDashboard";
import HomePage from "./Homepage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<SensorDashboard />} />
      </Routes>
    </Router>
  );
}
