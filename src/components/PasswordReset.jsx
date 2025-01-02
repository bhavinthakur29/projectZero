// PasswordReset.jsx
import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const auth = getAuth();

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent!");
    } catch (error) {
      setMessage("Error resetting password: " + error.message);
    }
  };

  return (
    <div>
      <h1>Password Reset</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button onClick={handlePasswordReset}>Send Reset Email</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordReset;
