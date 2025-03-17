import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center bg-primary text-white text-center">

      {/* Card Container */}
      <div className="bg-white text-dark p-5 rounded shadow-lg w-50">

        <h1 className="fw-bold display-4 text-primary">🚀 Welcome!</h1>
        <p className="lead">Experience real-time damage detection with AI-powered insights.</p>

        {/* Buttons */}
        <div className="d-flex justify-content-center gap-3 mt-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="btn btn-lg btn-primary px-4"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => window.close()}
            className="btn btn-lg btn-danger px-4"
          >
            Quit
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="position-absolute bottom-0 w-100 text-white py-3">
        <p className="mb-0">© {new Date().getFullYear()} Damage Detection System. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
