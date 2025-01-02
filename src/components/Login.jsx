import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "../firebaseConfig";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();
  const { role } = useParams();

  const handleGoogleLogin = async () => {
    setLoading(true); // Set loading to true when login starts

    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        // If user exists with a different role, sign out and redirect
        if (userData.role !== role) {
          await signOut(auth);
          setError(
            `This Google account is already registered as a ${userData.role}.`
          );
          setTimeout(() => {
            navigate(`/login/${userData.role}`);
          }, 2000);
          return;
        }

        // Store the role in localStorage (or sessionStorage)
        localStorage.setItem("role", userData.role);

        // Correct role, proceed to dashboard
        navigate(`/${role}-dashboard`);
      } else {
        // New user, proceed to profile creation
        navigate(`/create-profile/${role}`, {
          state: {
            email: user.email,
            name: user.displayName,
            photoURL: user.photoURL,
          },
        });
      }
    } catch (error) {
      setError(error.message);
      console.error("Error logging in with Google:", error);
      await signOut(auth);
    } finally {
      setLoading(false); // Set loading to false once login process finishes
    }
  };

  return (
    <div className="container my-5 p-4 text-center">
      <h2 className="mb-4">Login as {role}</h2>
      <div className="row justify-content-center">
        <div className="col-md-6 mb-4">
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline-success w-100 p-4 shadow-sm border-success rounded-3 d-flex flex-column align-items-center text-center"
            disabled={loading} // Disable the button while loading
            style={{ border: "1px solid #ddd" }}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Logging in...
              </>
            ) : (
              <>
                <i
                  className="fab fa-google mb-3"
                  style={{ fontSize: "2rem" }}
                ></i>
                <h5 className="card-title mb-3">Continue with Google</h5>
                <p className="card-text">
                  Log in using your Google account to access your {role}{" "}
                  dashboard.
                </p>
              </>
            )}
          </button>
        </div>
      </div>
      {error && <p className="text-danger mt-4">{error}</p>}
    </div>
  );
};

export default Login;
