import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";


function SellShow() {
  const navigate = useNavigate();
  
  const { id } = useParams();
  const [sell, setSell] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/sell/${id}`)
      .then((res) => setSell(res.data))
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


  
 const handleDelete = async () => {
  if (window.confirm("Are you sure you want to delete this item?")) {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:8080/sell/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
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
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
        padding: "40px 0",
      }}
    >
      <div
        className="card shadow-lg border-0"
        style={{
          width: "550px",
          borderRadius: "20px",
          overflow: "hidden",
          background: "#fff",
          height: "auto",
          marginTop: "100px",
          marginBottom: "100px",
        }}
      >
        <img
          src={sell.image}
          alt={sell.title}
          style={{
            width: "100%",
            height: "320px",
            objectFit: "cover",
            borderBottom: "1px solid #eee",
          }}
        />

        <div className="card-body text-center p-4">
          <h2 className="fw-bold mb-3" style={{ color: "#212529" }}>
            {sell.title}
          </h2>

          <p className="text-muted mb-3" style={{ fontSize: "1rem" }}>
            {sell.description}
          </p>

          <p className="fw-semibold text-dark mb-2">
             Contact Number:{" "}
            <span className="text-success">{sell.contact || "Not Available"}</span>
          </p>

          <div
            className="price-tag mt-4"
            style={{
              background: "linear-gradient(135deg, #28a745, #218838)",
              color: "white",
              padding: "10px 20px",
              borderRadius: "50px",
              display: "inline-block",
              fontWeight: "600",
              fontSize: "1.1rem",
            }}
          >
            ₹ {sell.price}
          </div>

          
          <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
            <button
              onClick={() => navigate("/sell")}
              className="btn px-4 fw-semibold"
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
               Back
            </button>

            {sell.owner === userId && (
  <>
    <button
      onClick={() => navigate(`/selledit/${id}`)}
      className="btn px-4 fw-semibold"
      style={{
        background: "linear-gradient(135deg, #ffb74d, #f57c00)",
        color: "white",
        borderRadius: "12px",
        fontSize: "1rem",
        boxShadow: "0 6px 20px rgba(255, 152, 0, 0.3)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
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
        fontSize: "1rem",
        boxShadow: "0 6px 20px rgba(244, 67, 54, 0.3)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
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

export default SellShow;
