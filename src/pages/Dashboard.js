import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedNgoId, setExpandedNgoId] = useState(null);

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

  if (loading)
    return <div className="container py-5 text-center">Loading...</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">NGO Admin Dashboard</h2>
      <div className="table-responsive">
        <table className="table table-hover table-bordered align-middle">
          <thead className="table-dark text-center">
            <tr>
              <th>Organization</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Proofs</th>
              <th>Actions</th>
              <th>More</th>
            </tr>
          </thead>
          <tbody>
            {ngos.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  No NGOs Found
                </td>
              </tr>
            ) : (
              ngos.map((ngo) => (
                <React.Fragment key={ngo._id}>
                  <tr>
                    <td>{ngo.organizationName}</td>
                    <td>{ngo.fullName}</td>
                    <td>{ngo.email}</td>
                    <td>{ngo.contactNumber}</td>
                    <td className="text-center">
                      <span
                        className={`badge px-3 py-2 ${
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
                      <div className="d-flex flex-wrap gap-2 justify-content-center">
                        {["addressProof", "idProof", "selfiePhoto", "ngoProfile"].map((type) =>
                          ngo[type] ? (
                            <div className="text-center" key={type}>
                              <a
                                href={`https://kotabackend-1.onrender.com/uploads/${ngo[type]}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img
                                  src={`https://kotabackend-1.onrender.com/uploads/${ngo[type]}`}
                                  alt={type}
                                  className="img-thumbnail"
                                  style={{ maxHeight: "80px", width: "80px", objectFit: "cover" }}
                                />
                                <div className="small mt-1">
                                  {type.replace(/([A-Z])/g, " $1")}
                                </div>
                              </a>
                            </div>
                          ) : null
                        )}
                      </div>
                    </td>
                    <td className="text-center">
                      {ngo.status === "Pending" ? (
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            className="btn btn-success btn-sm"
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
                        </div>
                      ) : (
                        <em className="text-muted">No Actions</em>
                      )}
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() =>
                          setExpandedNgoId(expandedNgoId === ngo._id ? null : ngo._id)
                        }
                      >
                        {expandedNgoId === ngo._id ? "Hide" : "More"}
                      </button>
                    </td>
                  </tr>

                  {/* Expanded Row */}
                  {expandedNgoId === ngo._id && (
                    <tr>
                      <td colSpan="8">
                        <div className="p-3 bg-light rounded">
                          <h5>Full NGO Details</h5>
                          <div className="row">
                            {Object.entries(ngo).map(([key, value]) => {
                              if (
                                typeof value === "string" &&
                                !["addressProof", "idProof", "selfiePhoto", "ngoProfile", "_id", "__v"].includes(key)
                              ) {
                                return (
                                  <div className="col-md-4 mb-2" key={key}>
                                    <strong>{key.replace(/([A-Z])/g, " $1")}:</strong> {value}
                                  </div>
                                );
                              }
                              return null;
                            })}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
