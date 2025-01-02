import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc, // Import getDoc
  doc,
  updateDoc,
} from "firebase/firestore";

const TutorDashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const tutorId = auth.currentUser.uid;

      // Fetch tutor profile using getDoc, not getDocs
      const tutorDocRef = doc(db, "tutors", tutorId);
      const tutorDoc = await getDoc(tutorDocRef); // Correctly using getDoc to fetch a single document
      if (tutorDoc.exists()) {
        setProfile(tutorDoc.data());
      } else {
        console.log("No profile found");
      }

      // Fetch tutor's sessions
      const sessionsQuery = query(
        collection(db, "sessions"),
        where("tutorId", "==", tutorId)
      );
      const sessionsSnapshot = await getDocs(sessionsQuery);
      const sessionsData = sessionsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSessions(sessionsData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const updateSessionStatus = async (sessionId, status) => {
    await updateDoc(doc(db, "sessions", sessionId), { status });
    setSessions(
      sessions.map((session) =>
        session.id === sessionId ? { ...session, status } : session
      )
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container py-4">
      <h1 className="display-4 mb-4">Tutor Dashboard</h1>

      {/* Profile Section */}
      <div className="bg-light p-4 rounded-lg shadow mb-6">
        <h2 className="h4 mb-4">My Profile</h2>
        <div className="row">
          <div className="col-md-6">
            <p>
              <strong>Name:</strong> {profile?.name}
            </p>
            <p>
              <strong>Email:</strong> {profile?.email}
            </p>
          </div>
          <div className="col-md-6">
            <p>
              <strong>Subjects:</strong> {profile?.subjects}
            </p>
            <p>
              <strong>Qualifications:</strong> {profile?.qualifications}
            </p>
          </div>
        </div>
      </div>

      {/* Sessions Section */}
      <div className="bg-light p-4 rounded-lg shadow">
        <h2 className="h4 mb-4">My Sessions</h2>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr className="table-light">
                <th>Student</th>
                <th>Date</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session.id}>
                  <td>{session.studentName}</td>
                  <td>
                    {new Date(session.date.toDate()).toLocaleDateString()}
                  </td>
                  <td>{session.subject}</td>
                  <td>{session.status}</td>
                  <td>
                    {session.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            updateSessionStatus(session.id, "accepted")
                          }
                          className="btn btn-success mr-2"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            updateSessionStatus(session.id, "rejected")
                          }
                          className="btn btn-danger"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;
