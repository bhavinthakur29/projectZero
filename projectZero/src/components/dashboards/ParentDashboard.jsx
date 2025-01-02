import React from "react";

const ParentDashboard = () => {
  return (
    <div className="container py-4">
      <h1 className="display-4 mb-4">Parent Dashboard</h1>
      <p className="lead">
        Welcome, Parent! Here you can view your child’s tutoring sessions and
        progress.
      </p>
      <div className="mb-4">
        <button className="btn btn-primary mr-2">View Child’s Sessions</button>
        <button className="btn btn-secondary">View Progress Reports</button>
      </div>
    </div>
  );
};

export default ParentDashboard;
