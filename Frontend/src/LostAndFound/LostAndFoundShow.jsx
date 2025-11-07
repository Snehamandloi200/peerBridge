import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function LostAndFoundShow() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/lostandfound/${id}`)
      .then((res) => setItem(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!item) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "100vh",
          background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
        }}
      >
        <h3 className="text-primary fw-bold">⏳ Loading details...</h3>
      </div>
    );
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f3f9ff, #cfe2ff)",
        padding: "40px",
      }}
    >
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: "100%",
          maxWidth: "600px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          animation: "fadeInUp 0.8s ease",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
          height:'800px',
          marginTop:"100px"
        }}
      >
        {/* Image Section */}
        <div
          style={{
            overflow: "hidden",
            borderRadius: "15px",
            marginBottom: "20px",
          }}
        >
          <img
            src={item.image}
            alt={item.itemName}
            className="img-fluid"
            style={{
              height: "350px",
              width: "100%",
              objectFit: "cover",
              borderRadius: "15px",
              transition: "transform 0.5s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          />
        </div>

        {/* Card Content */}
        <div className="text-center">
          <span
            className={`badge ${
              item.status.toLowerCase() === "lost" ? "bg-danger" : "bg-success"
            } mb-3`}
            style={{
              fontSize: "0.9rem",
              padding: "0.6em 1.2em",
              borderRadius: "10px",
            }}
          >
            {item.status}
          </span>

          <h3
            className="fw-bold mb-2"
            style={{
              color: "#0d47a1",
              letterSpacing: "0.5px",
            }}
          >
            {item.itemName}
          </h3>

          <h5 className="text-muted mb-2">📍 {item.location}</h5>

          <p
            className="text-secondary px-3"
            style={{
              fontSize: "1rem",
              lineHeight: "1.6",
              marginBottom: "15px",
            }}
          >
            {item.description}
          </p>

          <div
            className="card-footer border-0 bg-transparent mt-3"
            style={{
              fontSize: "1rem",
              color: "#1565c0",
              fontWeight: "600",
            }}
          >
            📞 Contact Number:{" "}
            <span className="text-dark fw-semibold">
              {item.contactNumber || "Not Provided"}
            </span>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="btn mt-4 px-4 fw-semibold"
            style={{
              background: "linear-gradient(135deg, #42a5f5, #1e88e5)",
              color: "white",
              borderRadius: "12px",
              fontSize: "1rem",
              boxShadow: "0 6px 20px rgba(33, 150, 243, 0.3)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 10px 25px rgba(33, 150, 243, 0.5)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 6px 20px rgba(33, 150, 243, 0.3)";
            }}
          >
            ⬅ Back
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
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

export default LostAndFoundShow;
