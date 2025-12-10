import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaShoppingCart, FaCode } from "react-icons/fa";
import { GiLostLimb } from "react-icons/gi";
import { MdInfo } from "react-icons/md";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("You have been logged out successfully!");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar fixed-top shadow-sm">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand fw-bold fs-3" to="/">
          Peer<span className="brand-highlight">Bridge</span>
        </Link>

        {/* Mobile toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <FaHome className="me-1" /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sell">
                <FaShoppingCart className="me-1" /> Buy & Sell
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/hackathon">
                <FaCode className="me-1" /> Hackathon
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/lostandfound">
                <GiLostLimb className="me-1" /> Lost & Found
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                <MdInfo className="me-1" /> About
              </Link>
            </li>
          </ul>

  {isLoggedIn ? (
            <div className="d-flex align-items-center profile-wrapper">
              <Link to="/profile">
              <img 
        src="data:image/png;base64,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" 
        alt="Profile"
        style={{
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          objectFit: "cover",
          border: "2px solid #007bff",
          cursor: "pointer"
        }}
         className="profile-photo"
      />
              </Link>
              
              
            </div>
          ) : (

           <p></p>
          )}
&nbsp; &nbsp; &nbsp; 

          {/* Auth buttons */}
          {!isLoggedIn ? (
            <div className="d-flex align-items-center">
              <Link to="/login">
                <button className="btn btn-primary me-2 login-btn"
                style={{
              background: "linear-gradient(135deg, #0d3140, #1b3c65)",
              color: "white",
              borderRadius: "12px",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.4)",
            }}>
                  Log In
                </button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-primary signup-btn" 
                style={{
              background: "linear-gradient(135deg, #0d3140, #1b3c65)",
              color: "white",
              borderRadius: "12px",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.4)",
            }}>
                  Sign Up
                </button>
              </Link>
              
            </div>
          ) : (

            <button
              className="btn btn-danger logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}


        
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
