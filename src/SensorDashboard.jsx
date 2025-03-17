import React, { useState, useEffect } from "react";
import { database } from "./firebase";
import { ref, onValue } from "firebase/database";
import Modal from "react-modal";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

Modal.setAppElement("#root");

export default function SensorDashboard() {
  const [sensorData, setSensorData] = useState({});
  const [temperatureData, setTemperatureData] = useState([]);
  const [pressureData, setPressureData] = useState([]);
  const [damageLevel, setDamageLevel] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const sensorRef = ref(database, "/sensors");
    const damageRef = ref(database, "/damage/classification");

    onValue(sensorRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setSensorData({
          temperature: data.temperature,
          pressure: data.pressure,
          distance: data.distance,
          altitude: data.altitude,
          totalAcceleration: data.totalAcceleration,
        });

        setTemperatureData((prev) => [...prev.slice(-10), { time: new Date().toLocaleTimeString(), value: data.temperature }]);
        setPressureData((prev) => [...prev.slice(-10), { time: new Date().toLocaleTimeString(), value: data.pressure }]);
      }
    });

    onValue(damageRef, (snapshot) => {
      if (snapshot.exists()) {
        const damage = snapshot.val();
        setDamageLevel(damage);
        if (damage === "Moderate" || damage === "Severe") {
          setModalIsOpen(true);
        }
      }
    });
  }, []);

  const getAlertColor = () => {
    if (damageLevel === "Severe") return "bg-danger text-white";
    if (damageLevel === "Moderate") return "bg-warning text-dark";
    return "bg-success text-white";
  };

  return (
    <div className="container py-5">
      <h1 className="text-center text-primary mb-4">🔥 OmniSense Beacon Prototype Dashboard</h1>

      {/* Sensor Data Box */}
      <div className="row g-4">
        {Object.entries(sensorData).map(([key, value]) => (
          <div key={key} className="col-md-4">
            <div className="card shadow text-center p-4">
              <h5 className="text-secondary">{key.toUpperCase()}</h5>
              <h2 className="text-primary fw-bold">{value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="row g-4 mt-4">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h5 className="text-center text-primary">Temperature Over Time</h5>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#ff7300" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h5 className="text-center text-primary">Pressure Over Time</h5>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={pressureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Full-screen Alert Modal */}
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="modal d-block">
        <div className={`modal-content p-5 text-center ${getAlertColor()} rounded-3`}>
          <h2 className="fw-bold display-4">⚠️ DAMAGE ALERT!</h2>
          <p className="fs-3 mt-3">Damage Level: <span className="fw-bold">{damageLevel}</span></p>
          <button className="btn btn-light mt-4 px-4 py-2 fw-bold" onClick={() => setModalIsOpen(false)}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}
