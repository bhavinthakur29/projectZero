import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "../hooks/useAuthState.js";

const Navbar = () => {
  const { user, role } = useAuthState();
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
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
              <button onClick={handleLogout} className="btn btn-outline-light">
                Logout
              </button>
            </>
          ) : (
            <Link to="/" className="navbar-brand text-white">
              TutorApp
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
