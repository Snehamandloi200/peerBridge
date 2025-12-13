import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://peerbridge-au78.onrender.com/login", formData);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        alert("Login Successful!");
        navigate("/sell");
      } else {
        alert("Login failed: No token received");
      }
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-wrapper d-flex justify-content-center align-items-center">
      
      <div 
        className="card login-card shadow-lg p-4"
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "20px",
          animation: "slideUp 0.8s ease, fadeIn 1s ease",
        }}
      >
        <h2 className="text-center mb-3 fw-bold" style={{ color: "#bc480aff" }}>
          Welcome Back 
        </h2>
        <p className="text-center text-muted mb-4" style={{ fontSize: "0.9rem", color: "#ffffffff" }}>
          Login to continue your journey
        </p>

        <form onSubmit={handleSubmit}>
        
          <div className="mb-3">
            <label className="fw-semibold text-secondary">Email Address</label>
            <input
              type="email"
              className="form-control form-control-lg shadow-sm"
              name="email"
              placeholder="Enter your email"
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
            <label className="fw-semibold text-secondary">Password</label>
            <input
              type="password"
              className="form-control form-control-lg shadow-sm"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                borderRadius: "12px",
              }}
            />
          </div>

         
          <button
            type="submit"
            className="btn w-100 fw-semibold btn-lg mt-2"
            style={{
              background: "linear-gradient(135deg, #0d3140, #1b3c65)",
              color: "white",
              borderRadius: "12px",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.4)",
            }}
          >
            Login
          </button>
        </form>

       
        <p className="text-center mt-3 text-muted" style={{ fontSize: "0.9rem" }}>
          Don’t have an account?
          <span
            onClick={() => navigate("/signup")}
            style={{
              color: "#e4521dff",
              fontWeight: "600",
              cursor: "pointer",
              marginLeft: "5px",
            }}
          >
            Register Now
          </span>
        </p>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideUp {
            from { transform: translateY(40px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

export default Login;
