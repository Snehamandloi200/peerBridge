import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const response = await axios.post("http://localhost:8080/login", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        alert(" Login Successful!");
        navigate("/sell");
      } else {
        alert("Login failed: No token received");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        alert(`Login failed: ${error.response.data.message || "Server error"}`);
      } else if (error.request) {
        alert("No response from server. Check if backend is running.");
      } else {
        alert("Error: " + error.message);
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f2fd, #fce4ec, #fff3e0)", // softer hero-like gradient
        animation: "fadeIn 1s ease-in-out",
      }}
    >
      <div
        className="card border-0 shadow-lg p-4"
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
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
           Welcome Back!
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-secondary">
              Email Address
            </label>
            <input
              type="email"
              className="form-control shadow-sm"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                borderRadius: "12px",
                border: "1px solid #cfd8dc",
                padding: "12px",
                transition: "box-shadow 0.3s ease",
              }}
              onFocus={(e) =>
                (e.target.style.boxShadow = "0 0 10px rgba(33,150,243,0.4)")
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-secondary">
              Password
            </label>
            <input
              type="password"
              className="form-control shadow-sm"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                borderRadius: "12px",
                border: "1px solid #cfd8dc",
                padding: "12px",
              }}
              onFocus={(e) =>
                (e.target.style.boxShadow = "0 0 10px rgba(255,193,7,0.4)")
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </div>

          {/* Login Button */}
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
             Login
          </button>
        </form>

        <p className="text-center mt-3 text-muted" style={{ fontSize: "0.9rem" }}>
          Don’t have an account?{" "}
          <span
            style={{
              color: "#1976d2",
              fontWeight: "600",
              cursor: "pointer",
            }}
            onClick={() => navigate("/signup")}
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

export default Login;
