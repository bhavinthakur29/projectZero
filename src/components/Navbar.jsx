import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "../hooks/useAuthState.js";

const Navbar = () => {
  const { user, role } = useAuthState();
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    setIsLoading(true); // Show loading overlay
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Add 1-second delay
      await signOut(auth);
      navigate("/"); // Redirect to home
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false); // Hide loading overlay
    }
  };

  return (
    <>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "1.5rem",
          }}
        >
          Logging out...
        </div>
      )}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <div className="container">
          <div className="d-flex justify-content-between w-100">
            {user ? (
              <>
                <Link
                  to={`/${role}-dashboard`}
                  className="navbar-brand text-white"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-light"
                  disabled={isLoading} // Disable button while loading
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/" className="navbar-brand text-white">
                ProjectZero
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
