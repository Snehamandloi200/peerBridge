import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

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

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    }
  }, []);

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

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const token = localStorage.getItem("token");

        await axios.delete(`http://localhost:8080/lostandfound/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Item deleted successfully!");
        navigate("/lostandfound");
      } catch (err) {
        console.error(err);
        alert("Failed to delete the item. Please try again.");
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "20px",
        background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
      }}
    >
      <div
        className="card shadow-lg border-0 p-4 mt-5"
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          animation: "fadeInUp 0.8s ease",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
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
              width: "100%",
              maxHeight: "250px",
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

        {/* Details Section */}
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

          <h3 className="fw-bold mb-2" style={{ color: "#0d47a1" }}>
            {item.itemName}
          </h3>

          <h5 className="text-muted mb-2">📍 {item.location}</h5>

          <p
            className="text-secondary px-3"
            style={{ fontSize: "1rem", lineHeight: "1.6" }}
          >
            {item.description}
          </p>

          <p style={{ color: "#555", lineHeight: "1.6" }}>
            Owned By: {item.creator}
          </p>

          <div
            className="card-footer border-0 bg-transparent mt-3"
            style={{
              fontSize: "1rem",
              color: "#1565c0",
              fontWeight: "600",
            }}
          >
            Contact Number:{" "}
            <span className="text-dark fw-semibold">
              {item.contact || "Not Provided"}
            </span>
          </div>

          {/* Buttons Section */}
          <div
            className="mt-4 d-flex flex-wrap justify-content-center gap-3"
            style={{ width: "100%" }}
          >
            <button
              onClick={() => navigate(-1)}
              className="btn px-4 fw-semibold"
              style={{
                background: "linear-gradient(135deg, #42a5f5, #1e88e5)",
                color: "white",
                borderRadius: "12px",
                fontSize: "1rem",
              }}
            >
              Back
            </button>

            {item.owner === userId && (
              <>
                <button
                  onClick={() => navigate(`/lostandfoundedit/${id}`)}
                  className="btn px-4 fw-semibold"
                  style={{
                    background: "linear-gradient(135deg, #ffb74d, #f57c00)",
                    color: "white",
                    borderRadius: "12px",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={handleDelete}
                  className="btn px-4 fw-semibold"
                  style={{
                    background: "linear-gradient(135deg, #e57373, #d32f2f)",
                    color: "white",
                    borderRadius: "12px",
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* CSS Animations + Media Queries */}
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }

          /* RESPONSIVE DESIGN */
          @media (max-width: 768px) {
            .card {
              padding: 20px !important;
            }
            img {
              max-height: 250px !important;
            }
            h3 { font-size: 1.4rem !important; }
            h5 { font-size: 1rem !important; }
            p { font-size: 0.95rem !important; }
          }

          @media (max-width: 480px) {
            .btn {
              width: 100% !important;
            }
            h3 { font-size: 1.2rem !important; }
            img {
              max-height: 200px !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default LostAndFoundShow;
