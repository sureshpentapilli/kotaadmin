import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNgos = async () => {
    try {
      const res = await axios.get("https://kotabackend-1.onrender.com/api/ngo/all");
      setNgos(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch NGOs:", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`https://kotabackend-1.onrender.com/api/ngo/status/${id}`, { status });
      fetchNgos(); // Refresh after update
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  useEffect(() => {
    fetchNgos();
  }, []);

  if (loading) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>Admin NGO Dashboard</h2>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Organization</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Proofs</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ngos.map((ngo) => (
            <tr key={ngo._id}>
              <td>{ngo.organizationName}</td>
              <td>{ngo.fullName}</td>
              <td>{ngo.email}</td>
              <td>{ngo.contactNumber}</td>
              <td>
                <span
                  className={`badge ${
                    ngo.status === "Accepted"
                      ? "bg-success"
                      : ngo.status === "Rejected"
                      ? "bg-danger"
                      : "bg-warning text-dark"
                  }`}
                >
                  {ngo.status}
                </span>
              </td>
              <td>
                {ngo.addressProof && (
                  <a href={`https://kotabackend-1.onrender.com/uploads/${ngo.addressProof}`} target="_blank" rel="noreferrer">
                    Address
                  </a>
                )}
                {" | "}
                {ngo.idProof && (
                  <a href={`https://kotabackend-1.onrender.com/uploads/${ngo.idProof}`} target="_blank" rel="noreferrer">
                    ID
                  </a>
                )}
                {" | "}
                {ngo.selfiePhoto && (
                  <a href={`https://kotabackend-1.onrender.com/uploads/${ngo.selfiePhoto}`} target="_blank" rel="noreferrer">
                    Selfie
                  </a>
                )}
                {" | "}
                {ngo.ngoProfile && (
                  <a href={`https://kotabackend-1.onrender.com/uploads/${ngo.ngoProfile}`} target="_blank" rel="noreferrer">
                    Profile
                  </a>
                )}
              </td>
              <td>
                {ngo.status === "Pending" ? (
                  <>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => updateStatus(ngo._id, "Accepted")}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => updateStatus(ngo._id, "Rejected")}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <em>No Actions</em>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
