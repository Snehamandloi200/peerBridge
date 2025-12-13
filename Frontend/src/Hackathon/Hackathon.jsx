import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Sell/Sell.css";
import { Link, useNavigate } from "react-router-dom";

function Hackathon() {
  const navigate = useNavigate();
  const [allHackathons, setAllHackathons] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://peerbridge-au78.onrender.com/allhackathons", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setAllHackathons(res.data))
      .catch((err) => {
        console.error("Error fetching hackathons:", err);
        if (err.response && err.response.status === 401) {
          alert("Please login first!");
          navigate("/login");
        }
      });
  }, []);

  return (
    <div
      className="container-fluid py-5"
      style={{
        background: "linear-gradient(to right, #f8fbff, #eef2f3)",
        minHeight: "100vh",
      }}
    >
      {/* Heading */}
      <h2
        className="text-center mb-4 mt-5"
        style={{
          fontWeight: "700",
          color: "#0e4882ff",
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}
      >
        Ongoing Hackathons
      </h2>

      {/* Add Post Button (Responsive) */}
      <div className="container">
        <div className="d-flex justify-content-end justify-content-md-end justify-content-sm-center mb-4">
          <Link to="/addpost">
            <button className="btn btn-secondary btn-md shadow-lg pulse" style={{ backgroundColor: "#015b6cff",
      color: "white",
      border: "none",
        // bigger text
      padding: "18px 45px",
      height: "50px",
      width:"140px",
      fontSize:"1.2rem",
      // bigger button
      borderRadius: "18px",    // smoother edges
      fontWeight: "600", }}>
              + Add New Post
            </button>
          </Link>
        </div>
      </div>

      {/* Main Cards Container */}
      <div className="container">
        <div className="row g-4 justify-content-center">
          {allHackathons.map((items, index) => (
            <div
              className="col-lg-4 col-md-6 col-sm-10 d-flex justify-content-center"
              key={index}
              style={{ animation: `fadeInUp 0.6s ease ${index * 0.1}s both` }}
            >
              <Link
                to={`/hackathon/${items._id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  width: "100%",
                }}
              >
                <div
                  className="card shadow-lg border-0 text-center h-100"
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.9)",
                    transition:
                      "transform 0.4s ease, box-shadow 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow =
                      "0 15px 35px rgba(0,0,0,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 5px 15px rgba(0,0,0,0.1)";
                  }}
                >
                  <div
                    className="card-body"
                    style={{ padding: "25px", color: "#2c3e50" }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="card-title text-start mb-0 fw-bold">
                        {items.project}
                      </h5>
                      <span
                        className="badge"
                        style={{
                          backgroundColor: "#27ae60",
                          fontSize: "0.8rem",
                          padding: "8px 10px",
                        }}
                      >
                        Members Needed: {items.neededmembers}
                      </span>
                    </div>

                    <h6 className="card-subtitle mb-3 text-muted">
                      Team: {items.name}
                    </h6>

                    <p
                      className="card-text"
                      style={{
                        fontSize: "0.95rem",
                        lineHeight: "1.6",
                        color: "#555",
                      }}
                    >
                      {items.description}
                    </p>
                  </div>

                  <div
                    className="card-footer bg-light"
                    style={{
                      borderTop: "none",
                      fontWeight: "500",
                      fontSize: "0.9rem",
                    }}
                  >
                    Click to view more ➜
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Hackathon;
