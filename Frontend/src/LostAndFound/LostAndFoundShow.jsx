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
      className="container d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        padding: "30px",
        // background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
      }}
    >
      <div
        className="d-flex align-items-center gap-4 flex-wrap"
        style={{
          width: "100%",
          maxWidth: "900px",
        }}
      >
        {/* LEFT SIDE IMAGE */}
        <div
          style={{
            flex: 1,
            minWidth: "280px",
            textAlign: "center",
          }}
        >
          <img
            src={item.image}
            alt={item.itemName}
            style={{
              width: "100%",
              maxHeight: "350px",
              objectFit: "cover",
              borderRadius: "15px",
              // boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
            }}
          />
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div
          style={{
            flex: 1,
            minWidth: "280px",
            marginLeft: "100px"
          }}
        >
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

          <h2 className="fw-bold mb-2" style={{ color: "#0d47a1" }}>
            {item.itemName}
          </h2>

          <h5 className="text-muted mb-2"> {item.location}</h5>

          <p className="text-secondary" style={{ lineHeight: "1.6" }}>
            {item.description}
          </p>

          <p className="description">Owned by: {item.owner.name}</p>


          <div
            style={{
              fontSize: "1rem",
              color: "#0d47a1",
              fontWeight: "600",
              marginTop: "15px",
            }}
          >
            Contact Number:{" "}
            <span className="text-dark fw-semibold">
              {item.contact || "Not Provided"}
            </span>
          </div>

          {/* BUTTONS */}
          <div className="d-flex flex-wrap gap-3 mt-4">
            <button
              onClick={() => navigate(-1)}
              className="btn px-4 fw-semibold"
              style={{
                background: "linear-gradient(135deg, #064171ff, #043865ff)",
                color: "white",
                borderRadius: "12px",
              }}
            >
              Back
            </button>

            {item.owner?._id === userId && (
                <>
                  <button
                    onClick={() => navigate(`/lostandfoundedit/${id}`)}
                    className="btn custom-btn edit-btn"
                  >
                    Edit
                  </button>

                  <button
                    onClick={handleDelete}
                    className="btn btn-danger delete-btn"
                  >
                    Delete
                  </button>
                </>
              
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LostAndFoundShow;
