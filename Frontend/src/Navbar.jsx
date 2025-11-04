import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    alert("You have been logged out successfully!");
    navigate("/");
  };

  return (
    <div className="container mb-5">
      <nav
        className="navbar navbar-expand-lg bg-info fixed-top bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            PeerBridge
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/sell">
                  Buy & Sell
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/hackathon">
                  Hackathon
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/lostandfound">
                  Lost & Found
                </Link>
              </li>
               <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/about">
                  About
                </Link>
              </li>
            </ul>

            
            {!isLoggedIn ? (
              <>
                <Link className="nav-link active" to="/login">
                  <button className="btn btn-outline-success" type="button">
                    Log in
                  </button>
                </Link>

                <Link className="nav-link active" to="/signup">
                  <button className="btn btn-outline-success ms-2" type="button">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <button
                className="btn btn-outline-danger ms-2"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
