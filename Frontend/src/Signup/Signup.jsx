import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signup.css"; // <-- NEW CSS FILE

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    enroll: "",
    email: "",
    password: "",
    profileLink: "",
     address: "",    
    year: "",
    semester: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/signup",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        alert("Signup Successful!");
        navigate("/sell");
      }
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Signup failed. Check console.");
    }
  };

  return (
    <div className="signup-wrapper d-flex justify-content-center align-items-start">
      <div
        className="card signup-card shadow-lg p-4"
        style={{
          width: "100%",
          maxWidth: "520px",
          borderRadius: "20px",

          animation: "slideUp 0.8s ease, fadeIn 1s ease",
        }}
      >
        <h2 className="text-center mb-3 fw-bold" style={{ color: "#1565c0" }}>
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your full name"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              style={{
                borderRadius: "12px",
              }}
            />
          </div>

          {/* Enrollment */}
          <div className="mb-3">
            <label className="form-label">Enrollment Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="0805CSXXXXX"
              name="enroll"
              value={formData.enroll}
              onChange={handleChange}
              minLength={12}
              maxLength={12}
              required
              style={{
                borderRadius: "12px",
              }}
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="example@gmail.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                borderRadius: "12px",
              }}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              minLength={6}
              required
              style={{
                borderRadius: "12px",
              }}
            />
          </div>

          {/* LinkedIn */}
          <div className="mb-3">
            <label className="form-label">LinkedIn Profile</label>
            <input
              type="url"
              className="form-control"
              placeholder="https://linkedin.com/in/yourname"
              name="profileLink"
              value={formData.profileLink}
              onChange={handleChange}
              style={{
                borderRadius: "12px",
              }}
            />
          </div>

          {/* Address */}
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              style={{
                borderRadius: "12px",
              }}
            />
          </div>

          {/* College Name */}
          <div className="mb-3">
            <label className="form-label">College Name</label>
            <input
              type="text"
              className="form-control bg-light"
              value="Jawaharlal Institute of Technology, Borawan"
              readOnly
              style={{
                borderRadius: "12px",
              }}
            />
          </div>

       

          {/* Year */}
          <div className="mb-3">
            <label className="form-label">Year</label>
            <select
              className="form-select"
              name="year"
              value={formData.year}
              onChange={handleChange}
              style={{
                borderRadius: "12px",
              }}
              required
            >
              <option value="">Select year</option>
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>Final Year</option>
            </select>
          </div>

          {/* Semester */}
          <div className="mb-3">
            <label className="form-label">Sem</label>
            <input
              type="text"
              className="form-control"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              style={{
                borderRadius: "12px",
              }}
            />
          </div>

          {/* Terms */}
          <div className="mb-3">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" required />
              <label className="form-check-label">
                I agree to terms and conditions
              </label>
            </div>
          </div>

          {/* Button */}
          <div className="col-12">
            <button
              type="submit"
              className="btn w-100 fw-semibold btn-lg mt-2"
              style={{
                background: "linear-gradient(135deg, #42a5f5, #64b5f6)",
                color: "white",
                borderRadius: "12px",
                boxShadow: "0 6px 20px rgba(66,165,245,0.4)",
              }}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
