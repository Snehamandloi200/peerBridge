import React, { useEffect, useState } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

function HackathonShow() {
   const navigate = useNavigate();

  const { id } = useParams();
  const [hackathon, setHackathon] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/hackathon/${id}`)
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
       
          background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
        }}
      >
        <p style={{ fontSize: "1.3rem", color: "#555" }}>Loading hackathon details...</p>
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


  
  // const handleEdit = () => {
  //   navigate(`/hackathonedit/${id}`); 
  // };



  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
           width:"1550px",
        background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
        padding: "20px",

      }}
    >
      <div
        className="card text-center shadow-lg p-4"
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(8px)",
          transition: "transform 0.4s ease, box-shadow 0.4s ease",
          animation: "fadeIn 0.8s ease-in-out",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
        }}
      >
        <h2
          className="mb-3"
          style={{
            fontWeight: "700",
            color: "#34495e",
            textTransform: "capitalize",
          }}
        >
           {hackathon.project}
        </h2>

        <h5
          className="mb-3"
          style={{
            color: "#7f8c8d",
            fontWeight: "600",
          }}
        >
           Team: {hackathon.name}
        </h5>

        <span
          className="badge mb-4"
          style={{
            background: "linear-gradient(90deg, #27ae60, #2ecc71)",
            fontSize: "0.9rem",
            padding: "10px 20px",
            borderRadius: "20px",
            color: "white",
            letterSpacing: "0.5px",
          }}
        >
          Members Needed: {hackathon.neededmembers}
        </span>

        <p
          style={{
            color: "#555",
            lineHeight: "1.6",
            fontSize: "1rem",
            marginBottom: "20px",
          }}
        >
          {hackathon.description}
        </p>

<p
          style={{
            color: "#555",
            lineHeight: "1.6",
            fontSize: "1rem",
            marginBottom: "20px",
          }}
        >
          owned by: {hackathon.creator}
        
        </p>


        <div
          className="card-footer border-0"
          style={{
            backgroundColor: "transparent",
            fontSize: "0.95rem",
            fontWeight: "500",
            color: "#2c3e50",
          }}
        >
         <span style={{ color: "#16a085" }}>Contact Number: {hackathon.contact}</span> <i>Available Soon</i>
       <div>
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
             Back
          </button>

                   {hackathon.owner?._id === userId && (
  <>
    <button
      onClick={() => navigate(`/hackathonedit/${id}`)}
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

      <style>
        {`
          @keyframes fadeIn {
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

export default HackathonShow;
