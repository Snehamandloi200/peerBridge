import React from "react";
import axios from "axios";
import { useState } from "react";
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

    console.log("Login response:", response.data);

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
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
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card p-4 shadow"
        style={{ width: "100%", maxWidth: "400px", marginTop: "60px" }}
      >
        <h3 className="text-center mb-4">Login</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="loginEmail" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
             name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
               required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="loginPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
             name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
               required
            />
          </div>

          

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
