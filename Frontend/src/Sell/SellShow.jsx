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
      .get(`https://peerbridge-au78.onrender.com/sell/${id}`)
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
        await axios.delete(`https://peerbridge-au78.onrender.com/sell/${id}`, {
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
  <div className="sellshow-main container py-5 d-flex justify-content-center">

    <div className="sellshow-wrapper d-flex gap-4">

      {/* LEFT SIDE IMAGE */}
      <div className="sellshow-left">
        <img src={sell.image} alt={sell.title} className="sellshow-left-img" />
      </div>

      {/* RIGHT SIDE CONTENT */}
      <div className="sellshow-right">
        <h2 className="sellshow-title">{sell.title}</h2>
        <p className="sellshow-description">{sell.description}</p>

        <p><strong>Owned by:</strong> {sell.owner.name}</p>

        <p className="sellshow-contact">
          <strong>Contact:</strong> {sell.contact || "Not Available"}
        </p>

        <p className="sellshow-price">
          <strong>Price:</strong> ₹ {sell.price}
        </p>

        <div className="d-flex gap-3 mt-3">
          <button onClick={() => navigate("/sell")} className="btn-back">
            Back
          </button>

          {sell.owner?._id === userId && (
            <>
              <button
                onClick={() => navigate(`/selledit/${id}`)}
                className="btn-edit"
              >
                Edit
              </button>

              <button onClick={handleDelete} className="btn btn-danger">
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
