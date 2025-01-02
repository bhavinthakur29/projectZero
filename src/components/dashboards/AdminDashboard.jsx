import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null); // For storing the selected user for modal
  const [showModal, setShowModal] = useState(false); // Controls modal visibility

  useEffect(() => {
    const fetchData = async () => {
      const userSnapshots = await getDocs(collection(db, "users"));
      const userData = userSnapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userData);

      const stats = {
        totalStudents: userData.filter((u) => u.role === "student").length,
        totalTutors: userData.filter((u) => u.role === "tutor").length,
        totalParents: userData.filter((u) => u.role === "parent").length,
      };
      setStats(stats);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (userId, role) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteDoc(doc(db, "users", userId));
      await deleteDoc(doc(db, `${role}s`, userId)); // Delete from the specific role collection
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const handleUserClick = async (user) => {
    try {
      const roleCollection = `${user.role}s`; // Get the collection name based on the role
      const userDocRef = doc(db, roleCollection, user.id);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setSelectedUser(userDoc.data());
      } else {
        console.warn(
          `No profile found in collection ${roleCollection} for user ID ${user.id}`
        );
        setSelectedUser({
          name: user.name,
          email: user.email,
          role: user.role,
          subjects: "Not provided",
          qualifications: "Not provided",
        });
      }
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      alert("Failed to fetch user profile. Please try again.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container py-4">
      <h1 className="display-4 mb-4">Admin Dashboard</h1>

      {/* Stats Section */}
      <div className="row mb-4">
        <div className="col-md-4 mb-4 mb-md-0">
          <div className="card bg-primary text-white p-4 rounded">
            <h5>Total Students</h5>
            <p className="display-5">{stats.totalStudents}</p>
          </div>
        </div>
        <div className="col-md-4 mb-4 mb-md-0">
          <div className="card bg-success text-white p-4 rounded">
            <h5>Total Tutors</h5>
            <p className="display-5">{stats.totalTutors}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-warning text-white p-4 rounded">
            <h5>Total Parents</h5>
            <p className="display-5">{stats.totalParents}</p>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td
                  className="p-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleUserClick(user)}
                >
                  {user.name}
                </td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleDeleteUser(user.id, user.role)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div
          className={`modal fade ${showModal ? "show" : ""}`}
          tabIndex="-1"
          aria-hidden={!showModal}
          style={{ display: showModal ? "block" : "none" }} // Ensure modal shows correctly
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedUser.name}'s Profile</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div>
                  <h4>Profile Information</h4>
                  <p>
                    <strong>Name:</strong> {selectedUser.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedUser.email}
                  </p>
                  <p>
                    <strong>Role:</strong>{" "}
                    {selectedUser.role || "Not specified"}
                  </p>
                  <p>
                    <strong>Subjects:</strong>{" "}
                    {selectedUser.subjects || "Not provided"}
                  </p>
                  <p>
                    <strong>Qualifications:</strong>{" "}
                    {selectedUser.qualifications || "Not provided"}
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
