import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaShoppingCart, FaCode } from "react-icons/fa";
import { GiLostLimb } from "react-icons/gi";
import { MdInfo } from "react-icons/md";
import "./Navbar.css";

/* -------- TOKEN VALIDATION FUNCTION -------- */
const isTokenValid = () => {
  const token = localStorage.getItem("token");
  const expiry = localStorage.getItem("tokenExpiry");

  if (!token || !expiry) return false;

  if (Date.now() > Number(expiry)) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    return false;
  }

  return true;
};

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid());

  /* -------- AUTO CHECK TOKEN EXPIRY -------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoggedIn(isTokenValid());
    }, 1000); // check every second

    return () => clearInterval(interval);
  }, []);

  /* -------- LOGOUT -------- */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    alert("You have been logged out successfully!");
    setIsLoggedIn(false);
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
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
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

          {/* -------- AUTH SECTION -------- */}
          {isLoggedIn ? (
            <div className="d-flex align-items-center gap-3">
              <Link to="/profile">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAA..."
                  alt="Profile"
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    border: "2px solid #007bff",
                    cursor: "pointer",
                  }}
                />
              </Link>

              <button
                className="btn btn-danger logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-2">
              <Link to="/login">
                <button className="btn btn-primary login-btn">
                  Log In
                </button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-primary signup-btn">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
