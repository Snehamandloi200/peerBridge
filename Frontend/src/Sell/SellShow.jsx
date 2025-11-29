import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SellShow.css";

function SellShow() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sell, setSell] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/sell/${id}`)
      .then((res) => setSell(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    }
  }, []);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:8080/sell/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Item deleted successfully!");
        navigate("/sell");
      } catch (err) {
        console.error(err);
        alert("Failed to delete the item. Please try again.");
      }
    }
  };

  if (!sell) {
    return (
      <div className="text-center mt-5 fs-4 fw-semibold text-muted">
        Loading details...
      </div>
    );
  }

  return (
    <div className="sellshow-section container-fluid py-5 d-flex justify-content-center align-items-center">
      <div className="sellshow-card shadow-lg">
        <img src={sell.image} alt={sell.title} className="sellshow-image" />

        <div className="sellshow-body">
          <h2 className="sellshow-title">{sell.title}</h2>
          <p className="sellshow-description">{sell.description}</p>

          <p>
          owned by: {sell.creator}
        
        </p>

          <p className="sellshow-contact">
            <strong>Contact:</strong> <span>{sell.contact || "Not Available"}</span>
          </p>

          <div className="price-section">
            <span className="price-label">Price:</span>
            <div className="">₹ {sell.price}</div>
          </div>

          <div className="sellshow-buttons">
            <button onClick={() => navigate("/sell")} className="sellshow-btn btn-back">
              Back
            </button>
            {sell.owner === userId && (
              <>
                <button
                  onClick={() => navigate(`/selledit/${id}`)}
                  className="sellshow-btn btn-edit"
                >
                  Edit
                </button>
                <button onClick={handleDelete} className="sellshow-btn btn-delete">
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

export default SellShow;
