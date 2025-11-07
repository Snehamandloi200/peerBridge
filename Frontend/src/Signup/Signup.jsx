import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:8080/signup", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      alert(" Signup Successful!");
      navigate("/sell");
    } else {
      alert("Signup failed.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center mt-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f2fd, #fce4ec, #fff3e0)",
        animation: "fadeIn 1s ease-in-out",
        padding: "20px",
      }}
    >
      <div
        className="card border-0 shadow-lg p-4 mt-5"
        style={{
          width: "100%",
          maxWidth: "700px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(12px)",
          transition: "transform 0.4s ease, box-shadow 0.4s ease",
          animation: "slideUp 0.8s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)";
        }}
      >
        <h3
          className="text-center mb-4"
          style={{
            fontWeight: "700",
            color: "#1565c0",
            letterSpacing: "1px",
          }}
        >
          📝 Create Your Account
        </h3>

        <form className="row g-3" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="col-md-6">
            <label className="form-label fw-semibold text-secondary">Full Name</label>
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="Enter your full name"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              style={{ borderRadius: "10px", padding: "10px" }}
            />
          </div>

          {/* Enrollment */}
          <div className="col-md-6">
            <label className="form-label fw-semibold text-secondary">Enrollment Number</label>
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="0805CSXXXXX"
              name="enroll"
              value={formData.enroll}
              onChange={handleChange}
              required
              minLength={12}
              maxLength={12}
              style={{ borderRadius: "10px", padding: "10px" }}
            />
          </div>

          {/* Email */}
          <div className="col-md-6">
            <label className="form-label fw-semibold text-secondary">Email</label>
            <input
              type="email"
              className="form-control shadow-sm"
              placeholder="example@gmail.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ borderRadius: "10px", padding: "10px" }}
            />
          </div>

          {/* Password */}
          <div className="col-md-6">
            <label className="form-label fw-semibold text-secondary">Password</label>
            <input
              type="password"
              className="form-control shadow-sm"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              minLength={6}
              required
              style={{ borderRadius: "10px", padding: "10px" }}
            />
          </div>

          {/* LinkedIn */}
          <div className="col-12">
            <label className="form-label fw-semibold text-secondary">LinkedIn Profile</label>
            <input
              type="url"
              className="form-control shadow-sm"
              name="profileLink"
              placeholder="https://www.linkedin.com/in/yourname"
              value={formData.profileLink}
              onChange={handleChange}
              style={{ borderRadius: "10px", padding: "10px" }}
            />
          </div>

          {/* Residence */}
          <div className="col-12 mt-2">
            <label className="form-label fw-semibold text-secondary">Residence Type</label>
            <div className="d-flex gap-4">
              <div className="form-check">
                <input className="form-check-input" type="radio" name="residence" id="day" />
                <label className="form-check-label" htmlFor="day">
                  Day Scholar
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="residence" id="hostel" />
                <label className="form-check-label" htmlFor="hostel">
                  Hosteller
                </label>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="col-12">
            <label className="form-label fw-semibold text-secondary">Address</label>
            <input
              type="text"
              className="form-control shadow-sm"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              style={{ borderRadius: "10px", padding: "10px" }}
            />
          </div>

          {/* College Name */}
          <div className="col-12">
            <label className="form-label fw-semibold text-secondary">College Name</label>
            <input
              className="form-control shadow-sm"
              type="text"
              value="Jawaharlal Institute of Technology, Borawan"
              readOnly
              disabled
              style={{ borderRadius: "10px", padding: "10px", backgroundColor: "#f5f5f5" }}
            />
          </div>

          {/* City */}
          <div className="col-md-6">
            <label className="form-label fw-semibold text-secondary">City</label>
            <input type="text" className="form-control shadow-sm" id="inputCity" style={{ borderRadius: "10px", padding: "10px" }} />
          </div>

          {/* Year */}
          <div className="col-md-4">
            <label className="form-label fw-semibold text-secondary">Year</label>
            <select
              className="form-select shadow-sm"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              style={{ borderRadius: "10px", padding: "10px" }}
            >
              <option value="">Select year</option>
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>Final Year</option>
            </select>
          </div>

          {/* Semester */}
          <div className="col-md-2">
            <label className="form-label fw-semibold text-secondary">Semester</label>
            <input
              type="text"
              className="form-control shadow-sm"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              style={{ borderRadius: "10px", padding: "10px" }}
            />
          </div>

          {/* Terms */}
          <div className="col-12 mt-2">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="gridCheck" />
              <label className="form-check-label" htmlFor="gridCheck">
                Agree to terms and conditions
              </label>
            </div>
          </div>

          {/* Button */}
          <div className="col-12">
            <button
              type="submit"
              className="btn w-100 fw-semibold mt-3"
              style={{
                background: "linear-gradient(135deg, #42a5f5, #64b5f6)",
                color: "white",
                borderRadius: "12px",
                fontSize: "1.1rem",
                padding: "12px",
                boxShadow: "0 8px 25px rgba(21,101,192,0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.boxShadow = "0 10px 35px rgba(21,101,192,0.5)";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.target.style.boxShadow = "0 8px 25px rgba(21,101,192,0.3)";
                e.target.style.transform = "scale(1)";
              }}
            >
               Sign Up
            </button>
          </div>
        </form>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideUp {
            from {
              transform: translateY(30px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Signup;
