import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const CreateProfile = () => {
  const { role } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: location.state?.email || "",
    name: location.state?.name || "",
    phone: "",
    address: "",
    ...(role === "student" && { gradeLevel: "", school: "" }),
    ...(role === "tutor" && { qualifications: "", subjects: "" }),
    ...(role === "parent" && { childrenNames: "" }),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;

    try {
      // Create profile in 'users' collection
      await setDoc(doc(db, "users", user.uid), {
        role,
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        createdAt: new Date(),
      });

      // Create role-specific profile (tutor, student, or parent)
      await setDoc(doc(db, `${role}s`, user.uid), {
        ...formData,
        createdAt: new Date(),
      });

      navigate(`/${role}-dashboard`);
    } catch (error) {
      console.error("Profile creation error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container p-4">
      <h2 className="h3 mb-4">Complete Your {role} Profile</h2>

      <div className="mb-4">
        <input
          type="email"
          value={formData.email}
          disabled
          className="form-control"
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Name"
          className="form-control"
          required
        />
      </div>

      <div className="mb-4">
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="Phone"
          className="form-control"
          required
        />
      </div>

      <div className="mb-4">
        <textarea
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          placeholder="Address"
          className="form-control"
          required
        />
      </div>

      {role === "student" && (
        <>
          <div className="mb-4">
            <input
              type="text"
              value={formData.gradeLevel}
              onChange={(e) =>
                setFormData({ ...formData, gradeLevel: e.target.value })
              }
              placeholder="Grade Level"
              className="form-control"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={formData.school}
              onChange={(e) =>
                setFormData({ ...formData, school: e.target.value })
              }
              placeholder="School"
              className="form-control"
              required
            />
          </div>
        </>
      )}

      {role === "tutor" && (
        <>
          <div className="mb-4">
            <textarea
              value={formData.qualifications}
              onChange={(e) =>
                setFormData({ ...formData, qualifications: e.target.value })
              }
              placeholder="Qualifications"
              className="form-control"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={formData.subjects}
              onChange={(e) =>
                setFormData({ ...formData, subjects: e.target.value })
              }
              placeholder="Subjects (comma separated)"
              className="form-control"
              required
            />
          </div>
        </>
      )}

      {role === "parent" && (
        <div className="mb-4">
          <textarea
            value={formData.childrenNames}
            onChange={(e) =>
              setFormData({ ...formData, childrenNames: e.target.value })
            }
            placeholder="Children's Names (one per line)"
            className="form-control"
            required
          />
        </div>
      )}

      <button type="submit" className="btn btn-primary w-100">
        Create Profile
      </button>
    </form>
  );
};

export default CreateProfile;
