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
            <div className="d-flex align-items-center">
              <Link to="/profile">
               <i className="fa-solid fa-circle-user" style={{fontSize:"30px"}}></i>
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
                <button className="btn btn-outline-primary me-2 login-btn">
                  Log In
                </button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-primary signup-btn">
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
