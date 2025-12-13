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
    linkedin: "",
    // creator: "",
    date: "",
  });

  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; 
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://peerbridge-au78.onrender.com/addhackathon",
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
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        // background:
        //   "linear-gradient(135deg, #a2c2e2, #dbeafe, #e0f7fa, #d1e7ff)",
        // backgroundSize: "400% 400%",
        animation: "gradientBG 10s ease infinite",
        padding: "40px 0",
      }}
    >
      <div
    
    style={{
      width: "100%",
      maxWidth: "600px",
      padding: "25px",
      borderRadius: "18px",
      background: "white",
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
          // boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <h3
          className="text-center fw-bold "
          style={{
            color: "#0e4882ff",
            letterSpacing: "0.5px",
            fontWeight: "700",
          }}
        >
          Find Teammates for Hackathon
        </h3>

        <form className="row" onSubmit={handleSubmit}>
          <div className="col-md-12 mt-5">
            <label className="form-label fw-semibold">Hackathon Name</label>
            <input
              type="text"
              className="form-control shadow-sm"
              name="project"
              value={formData.project}
              onChange={handleChange}
              required
              placeholder="e.g. Smart India Hackathon"
            />
          </div>

          <div className="col-md-12 mt-2">
            <label className="form-label fw-semibold">Team Name</label>
            <input
              type="text"
              className="form-control shadow-sm"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. CodeWarriors"
            />
          </div>

          <div className="col-md-12 mt-2">
            <label className="form-label fw-semibold">Date</label>
            <input
              type="date"
              className="form-control shadow-sm"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-12 mt-2">
            <label className="form-label fw-semibold">Members Needed</label>
            <input
              type="number"
              className="form-control shadow-sm"
              min="1"
              name="neededmembers"
              value={formData.neededmembers}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12 mt-2">
            <label className="form-label fw-semibold">Required Skills</label>
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="React, Python, UI Design..."
              name="skills"
              value={formData.skills}
              onChange={handleChange}
            />
          </div>

           {/* <div className="col-12 mt-2">
            <label className="form-label fw-semibold">Owner</label>
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="Enter owner`s name"
              name="creator"
              value={formData.creator}
              onChange={handleChange}
            />
          </div> */}

          <div className="col-12 mt-2">
            <label className="form-label fw-semibold">LinkedIn Profile URL</label>
            <input
              type="url"
              className="form-control shadow-sm"
              placeholder="https://www.linkedin.com/in/yourprofile"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              required
              pattern="https?://(www\.)?linkedin\.com/.*"
              style={{ borderRadius: "10px", border: "1px solid #ced4da" }}
            />
          </div>

          <div className="col-12 mt-2">
            <label className="form-label fw-semibold">Project Description</label>
            <textarea
              className="form-control shadow-sm"
              rows="3"
              placeholder="Brief about your project idea..."
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="col-12 mt-4">
            <button
              type="submit"
              className="btn w-100"
              disabled={loading} // 🔥 Disable button
              style={{
                background: loading
                  ? "gray"
                  : "#0e4882ff",
                color: "white",
                borderRadius: "10px",
                padding: "12px",
              }}
            >
              {loading ? "Submitting..." : "🔍 Find Teammates"}
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default FindTeam;
