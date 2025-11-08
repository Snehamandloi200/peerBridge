import React, { useState, useEffect } from "react";
import axios from "axios";
import {useParams, useNavigate } from "react-router-dom";

function LostAndFoundEdit() {
  const navigate = useNavigate();
  
  
  const [fadeIn, setFadeIn] = useState(false);

  const { id } = useParams();
  

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  const [hackathon, setHackathon] = useState(null);
const [formData, setFormData] = useState({
  name: "",
  neededmembers: "",
  skills: "",
  description: "",
  project:""
});

useEffect(() => {
  axios
    .get(`http://localhost:8080/hackathon/${id}`)
    .then((res) => setHackathon(res.data))
    .catch((err) => console.log(err));
}, [id]);


useEffect(() => {
  if (hackathon) {
    setFormData({
      name: hackathon.name || "",
     neededmembers: hackathon.neededmembers || "",
      description: hackathon.description || "",
      skills: hackathon.skills || "",
      project: hackathon.project || null,
    });
  }
}, [hackathon]);

if (!hackathon) {
  return (
    <div className="text-center mt-5 fs-4 fw-semibold text-muted">
      Loading item details...
    </div>
  );
}


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

;

  const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();
  data.append("name", formData.name);
  data.append("neededmembers", formData.neededmembers);
  data.append("skills", formData.skills);
  data.append("description", formData.description);
   data.append("project", formData.project);
  

 try {
  await axios.put(`http://localhost:8080/hackathonedit/${id}`, formData, {
    headers: { "Content-Type": "application/json" },
  });
  alert("Hackathon updated successfully!");
  navigate(`/hackathon/${id}`);
} catch (error) {
  console.error("Error updating item:", error);
  alert("Failed to update hackathon. Please try again.");
}

};




  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(120deg, #e3f2fd 0%, #f1f8e9 50%, #fff3e0 100%)",
        padding: "60px 20px",
        overflow: "hidden",
      }}
    >
      <div
        className={`card border-0 shadow-lg ${fadeIn ? "fade-in" : ""}`}
        style={{
          width: "100%",
          maxWidth: "720px",
          borderRadius: "25px",
          padding: "40px 45px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
          transform: fadeIn ? "translateY(0)" : "translateY(40px)",
          opacity: fadeIn ? 1 : 0,
          transition: "all 0.8s ease",
        }}
      >
        <h2
          className="text-center fw-bold mb-4"
          style={{
            color: "#1565c0",
            fontSize: "2rem",
            letterSpacing: "0.8px",
            animation: "fadeSlide 1s ease-in-out",
          }}
        >
            Update Hackathon
        </h2>
  
        <form className="row g-4" onSubmit={handleSubmit}>
        
          {[
            { label: " Project Name", name: "name", type: "text", placeholder: "Enter team name" },
         
          ].map((field, i) => (
            <div
              key={i}
              className="col-md-6 form-animate"
              style={{
                animation: `slideInUp 0.5s ease ${i * 0.2}s both`,
              }}
            >
              <label className="form-label fw-semibold text-secondary">{field.label}</label>
              <input
                type={field.type}
                className="form-control shadow-sm"
                placeholder={hackathon.name}
                name="Project Name"
                value={formData.status}
                onChange={handleChange}
                required
                style={{
                  borderRadius: "12px",
                  border: "1px solid #cfd8dc",
                  padding: "12px",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => (e.target.style.boxShadow = "0 0 12px rgba(33,150,243,0.4)")}
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
            </div>
          ))}



         
          <div
            className="col-md-6 form-animate"
            style={{ animation: "slideInUp 0.5s ease 0.6s both" }}
          >
            <label className="form-label fw-semibold text-secondary">Hackathon Name</label>
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder={hackathon.project}
              name="project"
              value={formData.project}
              onChange={handleChange}
              required
              style={{
                borderRadius: "12px",
                border: "1px solid #cfd8dc",
                padding: "12px",
              }}
            />
          </div>
           <div
            className="col-md-6 form-animate"
            style={{ animation: "slideInUp 0.5s ease 0.6s both" }}
          >
            <label className="form-label fw-semibold text-secondary">Skills</label>
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder={hackathon.skills}
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
              style={{
                borderRadius: "12px",
                border: "1px solid #cfd8dc",
                padding: "12px",
              }}
            />
          </div>

 <div
            className="col-md-6 form-animate"
            style={{ animation: "slideInUp 0.5s ease 0.6s both" }}
          >
            <label className="form-label fw-semibold text-secondary">Needed Members</label>
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder={hackathon.neededmembers}
              name="neededmembers"
              value={formData.neededmembers}
              onChange={handleChange}
              required
              style={{
                borderRadius: "12px",
                border: "1px solid #cfd8dc",
                padding: "12px",
              }}
            />
          </div>

         
          <div
            className="col-12 form-animate"
            style={{ animation: "slideInUp 0.5s ease 0.8s both" }}
          >
            <label className="form-label fw-semibold text-secondary">Description</label>
            <textarea
              className="form-control shadow-sm"
              rows="3"
              placeholder={hackathon.description}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              style={{
                borderRadius: "12px",
                border: "1px solid #cfd8dc",
                padding: "12px",
              }}
            ></textarea>
          </div>


          
          <div
            className="col-12 mt-3 text-center form-animate"
            style={{ animation: "fadeSlide 1s ease 1.2s both" }}
          >
            <button
              type="submit"
              className="btn fw-semibold"
              style={{
                background: "linear-gradient(135deg, #42a5f5, #1e88e5)",
                color: "white",
                borderRadius: "12px",
                fontSize: "1.1rem",
                padding: "12px 30px",
                boxShadow: "0 8px 25px rgba(21,101,192,0.4)",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.boxShadow = "0 10px 35px rgba(21,101,192,0.6)";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.target.style.boxShadow = "0 8px 25px rgba(21,101,192,0.4)";
                e.target.style.transform = "scale(1)";
              }}
            >
               update 
            </button>
          </div>
        </form>
      </div>

      
    </div>
  );
}

export default LostAndFoundEdit;
