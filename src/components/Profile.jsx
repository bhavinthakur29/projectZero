import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { setDoc, doc, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const db = getFirestore();
  const [name, setName] = useState(auth.currentUser.displayName || "");
  const [role, setRole] = useState("Student");
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSaveProfile = async () => {
    try {
      await setDoc(doc(db, "users", user.uid), {
        name,
        email: user.email,
        role,
      });
      navigate("/dashboard"); // Redirect to dashboard after saving profile
    } catch (error) {
      console.error("Error saving user profile:", error);
    }
  };

  return (
    <div>
      <h1>Create Profile</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="Student">Student</option>
        <option value="Tutor">Tutor</option>
        <option value="Parent">Parent</option>
        <option value="Admin">Admin</option>
      </select>
      <button onClick={handleSaveProfile}>Save Profile</button>
    </div>
  );
};

export default Profile;
