// StudentDashboard.jsx
import React from "react";

const StudentDashboard = () => {
  return (
    <div className="container my-5">
      <h1 className="mb-4">Student Dashboard</h1>
      <p className="lead">
        Welcome, Student! Here you can book sessions, track your progress, and
        view your completed assignments.
      </p>
      <div className="d-flex flex-column gap-3">
        <button className="btn btn-primary btn-lg">Book a Session</button>
        <button className="btn btn-secondary btn-lg">View Progress</button>
        <button className="btn btn-info btn-lg">View Assignments</button>
      </div>
    </div>
  );
};

export default StudentDashboard;
