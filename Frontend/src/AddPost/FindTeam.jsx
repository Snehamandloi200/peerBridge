import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FindTeam() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    neededmembers: "",
    project: "",
    skills: "",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "http://localhost:8080/addhackathon",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    console.log("Form response:", response.data);
    alert("Hackathon team added successfully!");
    navigate("/hackathon"); 
  } catch (error) {
    console.error("Error submitting hackathon:", error);
    if (error.response && error.response.status === 401) {
      alert("You must login first to add a team!");
      navigate("/login");
    } else {
      alert("Something went wrong while submitting the form.");
    }
  }
};


  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #a2c2e2, #dbeafe, #e0f7fa, #d1e7ff)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 10s ease infinite",
        padding: "40px 0",
      }}
    >
      <style>
        {`
          @keyframes gradientBG {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
          @keyframes fadeInUp {
            from {opacity: 0; transform: translateY(30px);}
            to {opacity: 1; transform: translateY(0);}
          }
          .fadeInUp {
            animation: fadeInUp 0.7s ease-out;
          }
          input:focus, textarea:focus {
            border-color: #007bff !important;
            box-shadow: 0 0 10px rgba(0,123,255,0.3) !important;
          }
        `}
      </style>

      <div
        className="card fadeInUp border-0"
        style={{
          width: "100%",
          maxWidth: "700px",
          borderRadius: "20px",
          padding: "40px",
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.25)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
        }}
      >
        <h3
          className="text-center fw-bold mb-4"
          style={{
            color: "#0d6efd",
            letterSpacing: "0.5px",
            fontWeight: "700",
          }}
        >
           Find Teammates for Hackathon
        </h3>

        <form className="row g-3" onSubmit={handleSubmit}>
          {/* Hackathon Name */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Hackathon Name</label>
            <input
              type="text"
              className="form-control shadow-sm"
              name="project"
              value={formData.project}
              onChange={handleChange}
              required
              placeholder="e.g. Smart India Hackathon"
              style={{
                borderRadius: "10px",
                border: "1px solid #ced4da",
              }}
            />
          </div>

          {/* Team Name */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Team Name</label>
            <input
              type="text"
              className="form-control shadow-sm"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. CodeWarriors"
              style={{
                borderRadius: "10px",
                border: "1px solid #ced4da",
              }}
            />
          </div>

          {/* Date */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Date</label>
            <input
              type="date"
              className="form-control shadow-sm"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              style={{
                borderRadius: "10px",
                border: "1px solid #ced4da",
              }}
            />
          </div>

          {/* Members Needed */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Members Needed</label>
            <input
              type="number"
              className="form-control shadow-sm"
              min="1"
              name="neededmembers"
              value={formData.neededmembers}
              onChange={handleChange}
              required
              style={{
                borderRadius: "10px",
                border: "1px solid #ced4da",
              }}
            />
          </div>

          {/* Skills */}
          <div className="col-12">
            <label className="form-label fw-semibold">Required Skills</label>
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="React, Python, UI Design..."
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
              style={{
                borderRadius: "10px",
                border: "1px solid #ced4da",
              }}
            />
          </div>

          {/* Description */}
          <div className="col-12">
            <label className="form-label fw-semibold">Project Description</label>
            <textarea
              className="form-control shadow-sm"
              rows="3"
              placeholder="Brief about your project idea..."
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{
                borderRadius: "10px",
                border: "1px solid #ced4da",
              }}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="col-12 mt-3">
            <button
              type="submit"
              className="btn w-100"
              style={{
                background: "linear-gradient(135deg, #0d6efd, #007bff)",
                color: "white",
                borderRadius: "10px",
                fontSize: "1.1rem",
                padding: "12px",
                boxShadow: "0 5px 15px rgba(13,110,253,0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.target.style.boxShadow =
                  "0 8px 20px rgba(13,110,253,0.5)")
              }
              onMouseOut={(e) =>
                (e.target.style.boxShadow =
                  "0 5px 15px rgba(13,110,253,0.3)")
              }
            >
              🔍 Find Teammates
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FindTeam;
