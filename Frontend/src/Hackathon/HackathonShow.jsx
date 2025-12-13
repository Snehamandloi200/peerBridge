import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function HackathonShow() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [hackathon, setHackathon] = useState(null);

  useEffect(() => {
    axios
      .get(`https://peerbridge-au78.onrender.com/hackathon/${id}`)
      .then((res) => setHackathon(res.data))
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

  if (!hackathon) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
        }}
      >
        <p style={{ fontSize: "1.3rem", color: "#555" }}>
          Loading hackathon details...
        </p>
      </div>
    );
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const token = localStorage.getItem("token");

        await axios.delete(`http://localhost:8080/hackathon/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Item deleted successfully!");
        navigate("/hackathon");
      } catch (err) {
        console.error(err);
        alert("Failed to delete the item. Please try again.");
      }
    }
  };

  return (
   <div
  className="container-fluid d-flex justify-content-center align-items-center page-bg"
  style={{
    minHeight: "100vh",
    padding: "20px",
  }}
>

      <div className="card-wrapper">
        <div
          className="card text-center shadow-lg p-4 responsive-card"
          style={{
            borderRadius: "20px",
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(8px)",
            animation: "fadeIn 0.8s ease-in-out",
          }}
        >
          <h2 className="mb-3 title-text">{hackathon.project}</h2>

          <h5 className="mb-3 team-text">Team: {hackathon.name}</h5>

          <span className="badge members-badge mb-4">
            Members Needed: {hackathon.neededmembers}
          </span>

          <p className="description">{hackathon.description}</p>

          <p className="description">Owned by: {hackathon.owner.name}</p>

          <div >
            <span className="contact-text">
              Contact Number: {hackathon.contact}
            </span>

            <div className="button-group mt-3">
              <button
                onClick={() => navigate(-1)}
                className="btn custom-btn back-btn"
              >
                Back
              </button>

              {hackathon.owner?._id === userId && (
                <>
                  <button
                    onClick={() => navigate(`/hackathonedit/${id}`)}
                    className="btn custom-btn edit-btn"
                  >
                    Edit
                  </button>

                  <button
                    onClick={handleDelete}
                    className="btn custom-btn delete-btn"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive CSS */}
     <style>
  {`
    .card-wrapper {
      width: 100%;
      max-width: 650px;
    }

    /* Card hidden, background removed */
    .responsive-card {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      padding: 0 !important;
    }

    /* Page background same as card */
    .page-bg {
      background: linear-gradient(135deg, #fdfbfb, #ebedee) !important;
    }

    .title-text {
      font-weight: 700;
      font-size: 1.9rem;
      color: #34495e;
      text-align: center;
    }

    .team-text {
      color: #7f8c8d;
      font-weight: 600;
      text-align: center;
    }

    .members-badge {
      background: linear-gradient(90deg, #27ae60, #2ecc71);
      font-size: 0.9rem;
      padding: 10px 20px;
      border-radius: 20px;
      color: white;
      display: block;
      margin: 15px auto;
      text-align: center;
      width: fit-content;
    }

    .description {
      color: #555;
      line-height: 1.6;
      font-size: 1rem;
      margin-bottom: 15px;
      text-align: center;
    }

    .contact-text {
      color: #16a085;
      font-size: 1rem;
      text-align: center;
    }

    .button-group {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-top: 20px;
    }

    .custom-btn {
      padding: 10px 24px;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 600;
      color: white;
      min-width: 110px;
    }

    .back-btn {
      background: linear-gradient(135deg, #42a5f5, #1e88e5);
    }

    .edit-btn {
      background: linear-gradient(135deg, #ffb74d, #f57c00);
    }

    .delete-btn {
      background: linear-gradient(135deg, #e57373, #d32f2f);
    }

    @media (max-width: 768px) {
      .title-text {
        font-size: 1.6rem;
      }

      .custom-btn {
        width: 100%;
      }
    }
  `}
</style>

    </div>
  );
}

export default HackathonShow;
