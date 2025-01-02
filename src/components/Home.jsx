import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    navigate(`/login/${role}`); // Navigate to the login page for the respective role
  };

  return (
    <div className="container text-center mt-5">
      <h2 className="mb-4">Welcome to the Home Page</h2>
      <div className="row justify-content-center">
        {/* Card-like button for Student Login */}
        <div className="col-md-3 mb-4">
          <button
            onClick={() => handleLogin("student")}
            className="btn btn-outline-primary w-100 p-4 shadow-sm border border-primary rounded-3 d-flex flex-column align-items-center"
          >
            <h5 className="card-title mb-3">Student Login</h5>
            <p className="card-text">
              Log in to access your student dashboard and assignments.
            </p>
          </button>
        </div>

        {/* Card-like button for Parent Login */}
        <div className="col-md-3 mb-4">
          <button
            onClick={() => handleLogin("parent")}
            className="btn btn-outline-success w-100 p-4 shadow-sm border border-success rounded-3 d-flex flex-column align-items-center"
          >
            <h5 className="card-title mb-3">Parent Login</h5>
            <p className="card-text">
              Log in to track your child's progress and activities.
            </p>
          </button>
        </div>

        {/* Card-like button for Tutor Login */}
        <div className="col-md-3 mb-4">
          <button
            onClick={() => handleLogin("tutor")}
            className="btn btn-outline-warning w-100 p-4 shadow-sm border border-warning rounded-3 d-flex flex-column align-items-center"
          >
            <h5 className="card-title mb-3">Tutor Login</h5>
            <p className="card-text">
              Log in to manage your courses, schedule, and students.
            </p>
          </button>
        </div>

        {/* Card-like button for Admin Login */}
        <div className="col-md-3 mb-4">
          <button
            onClick={() => handleLogin("admin")}
            className="btn btn-outline-danger w-100 p-4 shadow-sm border border-danger rounded-3 d-flex flex-column align-items-center"
          >
            <h5 className="card-title mb-3">Admin Login</h5>
            <p className="card-text">
              Log in to manage users, data, and overall platform settings.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
