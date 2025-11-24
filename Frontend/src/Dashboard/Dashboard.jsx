import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      
      {/* ---------------- Sidebar ---------------- */}
      <div
        className="bg-dark text-white p-4"
        style={{ width: "250px", minHeight: "100vh" }}
      >
        <h3 className="mb-4">Pear Bridge</h3>

        <ul className="nav flex-column">
          <li className="nav-item mb-3">
            <Link to="/dashboard" className="nav-link text-white">
              📊 Dashboard
            </Link>
          </li>

          <li className="nav-item mb-3">
            <Link to="/profile" className="nav-link text-white">
              👤 Profile
            </Link>
          </li>

          <li className="nav-item mb-3">
            <Link to="/addpost" className="nav-link text-white">
              ➕ Add New Post
            </Link>
          </li>
        </ul>
      </div>

      {/* ---------------- Main Content ---------------- */}
      <div className="flex-grow-1">
        
        {/* --------- Top Navbar --------- */}
        <nav className="navbar navbar-light bg-light px-4 shadow-sm">
          <span className="navbar-brand mb-0 h4">Dashboard</span>
          <div>
            <Link to="/profile" className="btn btn-outline-primary me-2">
              Profile
            </Link>
            <button className="btn btn-danger">Logout</button>
          </div>
        </nav>

        {/* --------- Page Content --------- */}
        <div className="container mt-4">
          <h2>Welcome to Your Dashboard 👋</h2>
          <p className="text-muted">
            Here you can manage all your posts and account settings.
          </p>

          {/* Example stats */}
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h4>Total Posts</h4>
                <p className="display-6">12</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h4>Messages</h4>
                <p className="display-6">5</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h4>Followers</h4>
                <p className="display-6">32</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
