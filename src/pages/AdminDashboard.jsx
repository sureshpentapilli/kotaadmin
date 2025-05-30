import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Badge,
  Button,
  Spinner,
  Table,
  OverlayTrigger,
  Tooltip,
  Collapse,
} from "react-bootstrap";
import {
  FaCheck,
  FaTimes,
  FaFileAlt,
  FaIdCard,
  FaUser,
  FaBuilding,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedRows, setExpandedRows] = useState({});

  const fetchNgos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://kotabackend-1.onrender.com/api/ngo/all"
      );
      setNgos(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch NGOs:", err);
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const button = document.getElementById(`status-btn-${id}`);
      if (button) {
        button.disabled = true;
        button.innerHTML =
          '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';
      }

      await axios.put(
        `https://kotabackend-1.onrender.com/api/ngo/status/${id}`,
        { status }
      );

      const row = document.getElementById(`ngo-row-${id}`);
      if (row) {
        row.classList.add("row-updated");
        setTimeout(() => {
          fetchNgos();
        }, 500);
      } else {
        fetchNgos();
      }
    } catch (err) {
      console.error("Status update failed:", err);
      const button = document.getElementById(`status-btn-${id}`);
      if (button) {
        button.disabled = false;
        button.innerHTML = status === "Accepted" ? "Approve" : "Reject";
      }
    }
  };

  const toggleRowExpansion = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredNgos =
    filterStatus === "all"
      ? ngos
      : ngos.filter((ngo) => ngo.status === filterStatus);

  useEffect(() => {
    fetchNgos();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Accepted":
        return <Badge bg="success">Accepted</Badge>;
      case "Rejected":
        return <Badge bg="danger">Rejected</Badge>;
      case "Pending":
      default:
        return (
          <Badge bg="warning" text="dark">
            Pending
          </Badge>
        );
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>NGO Management Dashboard</h2>
        <div className="status-filter">
          <Button
            variant={filterStatus === "all" ? "primary" : "outline-primary"}
            onClick={() => setFilterStatus("all")}
            className="filter-btn"
          >
            All
          </Button>
          <Button
            variant={filterStatus === "Pending" ? "warning" : "outline-warning"}
            onClick={() => setFilterStatus("Pending")}
            className="filter-btn"
          >
            Pending
          </Button>
          <Button
            variant={
              filterStatus === "Accepted" ? "success" : "outline-success"
            }
            onClick={() => setFilterStatus("Accepted")}
            className="filter-btn"
          >
            Approved
          </Button>
          <Button
            variant={filterStatus === "Rejected" ? "danger" : "outline-danger"}
            onClick={() => setFilterStatus("Rejected")}
            className="filter-btn"
          >
            Rejected
          </Button>
        </div>
      </div>

      <Card className="dashboard-card">
        <Card.Body>
          {loading ? (
            <div className="text-center p-4">
              <Spinner animation="border\" role="status\" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <p className="mt-2">Loading NGO data...</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table className="ngo-table" hover>
                <thead>
                  <tr>
                    <th style={{ width: "40px" }}></th>
                    <th>Organization</th>
                    <th>Full Name</th>
                    <th>Contact</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Verification</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNgos.length === 0 ? (
                    <tr>
                      <td colSpan="8\" className="text-center py-4">
                        No NGOs found with the selected status.
                      </td>
                    </tr>
                  ) : (
                    filteredNgos.map((ngo) => (
                      <React.Fragment key={ngo._id}>
                        <tr id={`ngo-row-${ngo._id}`} className="ngo-row">
                          <td>
                            <Button
                              variant="link"
                              onClick={() => toggleRowExpansion(ngo._id)}
                              className="expand-button p-0"
                            >
                              {expandedRows[ngo._id] ? (
                                <FaChevronUp />
                              ) : (
                                <FaChevronDown />
                              )}
                            </Button>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ngo-icon">
                                <FaBuilding />
                              </div>
                              <div className="ms-2">
                                <div className="ngo-name">
                                  {ngo.organizationName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>{ngo.fullName}</td>
                          <td>
                            <div>{ngo.email}</div>
                            <div className="text-secondary">
                              {ngo.contactNumber}
                            </div>
                          </td>
                          <td>
                            <div>{ngo.state || "N/A"}</div>
                            <div className="text-secondary">
                              {ngo.parlimentConstituency || "N/A"}
                            </div>
                          </td>
                          <td>{getStatusBadge(ngo.status)}</td>
                          <td>
                            <div className="proof-links">
                              {ngo.addressProof && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={<Tooltip>Address Proof</Tooltip>}
                                >
                                  <a
                                    href={`https://kotabackend-1.onrender.com/uploads/${ngo.addressProof}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="proof-link"
                                  >
                                    <FaFileAlt />
                                  </a>
                                </OverlayTrigger>
                              )}

                              {ngo.idProof && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={<Tooltip>ID Proof</Tooltip>}
                                >
                                  <a
                                    href={`https://kotabackend-1.onrender.com/uploads/${ngo.idProof}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="proof-link"
                                  >
                                    <FaIdCard />
                                  </a>
                                </OverlayTrigger>
                              )}

                              {ngo.selfiePhoto && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={<Tooltip>Selfie Photo</Tooltip>}
                                >
                                  <a
                                    href={`https://kotabackend-1.onrender.com/uploads/${ngo.selfiePhoto}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="proof-link"
                                  >
                                    <FaUser />
                                  </a>
                                </OverlayTrigger>
                              )}

                              {ngo.ngoProfile && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={<Tooltip>NGO Profile</Tooltip>}
                                >
                                  <a
                                    href={`https://kotabackend-1.onrender.com/uploads/${ngo.ngoProfile}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="proof-link"
                                  >
                                    <FaBuilding />
                                  </a>
                                </OverlayTrigger>
                              )}
                            </div>
                          </td>
                          <td>
                            {ngo.status === "Pending" ? (
                              <div className="action-buttons">
                                <Button
                                  id={`status-btn-${ngo._id}`}
                                  variant="success"
                                  size="sm"
                                  className="me-2 action-btn"
                                  onClick={() =>
                                    updateStatus(ngo._id, "Accepted")
                                  }
                                >
                                  <FaCheck className="me-1" /> Approve
                                </Button>
                                <Button
                                  variant="danger"
                                  size="sm"
                                  className="action-btn"
                                  onClick={() =>
                                    updateStatus(ngo._id, "Rejected")
                                  }
                                >
                                  <FaTimes className="me-1" /> Reject
                                </Button>
                              </div>
                            ) : (
                              <span className="text-muted">No Actions</span>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="8" className="p-0">
                            <Collapse in={expandedRows[ngo._id]}>
                              <div className="expanded-details">
                                <div className="p-4">
                                  <h5 className="mb-3">
                                    Additional Information
                                  </h5>
                                  <div className="row">
                                    <div className="col-md-6">
                                      <div className="mb-3">
                                        <strong>Organization Details</strong>
                                        <p className="mb-1">
                                          Name: {ngo.organizationName}
                                        </p>
                                        <p className="mb-1">
                                          Type: {ngo.organizationType || "N/A"}
                                        </p>
                                        <p className="mb-1">
                                          Registration Number:{" "}
                                          {ngo.registrationNumber || "N/A"}
                                        </p>
                                        <p className="mb-1">
                                          webId: {ngo.webId || "N/A"}
                                        </p>
                                        <p className="mb-1">
                                          80G Number: {ngo.number80G || "N/A"}
                                        </p>
                                        <p className="mb-1">
                                          12A Number: {ngo.number12A || "N/A"}
                                        </p>
                                        <p className="mb-1">
                                          FCRA Number: {ngo.fcraNumber || "N/A"}
                                        </p>
                                        <p className="mb-1">
                                          Full Name: {ngo.fullName || "N/A"}
                                        </p>
                                        <p className="mb-1">
                                          Father's Name:{" "}
                                          {ngo.fatherName || "N/A"}
                                        </p>
                                        <p className="mb-1">
                                          Date of Birth: {ngo.dob || "N/A"}
                                        </p>
                                        <p className="mb-1">
                                          Gender: {ngo.gender || "N/A"}
                                        </p>
                                        <p className="mb-1">
                                          Marital Status:{" "}
                                          {ngo.maritalStatus || "N/A"}
                                        </p>
                                        <p className="mb-1">
                                          Religion: {ngo.religion || "N/A"}
                                        </p>
                                        <p className="mb-1">
                                          Languages Known:{" "}
                                          {ngo.languagesKnown || "N/A"}
                                        </p>
                                      </div>
                                      <div className="mb-3">
                                        <strong>Contact Information</strong>
                                        <p className="mb-1">
                                          Email: {ngo.email}
                                        </p>
                                        <p className="mb-1">
                                          Phone: {ngo.contactNumber}
                                        </p>
                                        <p className="mb-1">
                                          Alternative Phone:{" "}
                                          {ngo.whatsappNumber || "N/A"}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="mb-3">
                                        <strong>Address Details</strong>
                                        <p className="mb-1">
                                          State: {ngo.state || "N/A"}
                                        </p>
                                        {/* <p className="mb-1">District: {ngo.district || 'N/A'}</p> */}
                                        <p className="mb-1">
                                          Parliamentary Constituency:{" "}
                                          {ngo.parlimentConstituency || "N/A"}
                                        </p>
                                        {/* <p className="mb-1">Assembly Constituency: {ngo.assemblyConstituency || 'N/A'}</p> */}
                                      </div>
                                      <div className="mb-3">
                                        <strong>Additional Details</strong>
                                        <p className="mb-1">
                                          Registration Date:{" "}
                                          {new Date().toLocaleDateString()}
                                        </p>

                                        <p className="mb-1">
                                          Status: {ngo.status}
                                        </p>
                                        <p className="mb-1">
                                          Last Updated:{" "}
                                          {new Date(
                                            ngo.updatedAt
                                          ).toLocaleDateString()}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Collapse>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminDashboard;
