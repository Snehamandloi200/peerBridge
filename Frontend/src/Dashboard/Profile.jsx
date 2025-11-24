import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
 

  return (
    <div className="container py-5" style={{ maxWidth: "900px" }}>
      <div
        className="card shadow-lg border-0 p-4 mt-5"
        style={{ borderRadius: "20px" }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold" style={{ color: "#0d47a1" }}>My Profile</h2>

          <Link to="/profile/edit" className="btn btn-primary">
            ✏️ Edit Profile
          </Link>
        </div>

        {/* Profile Info */}
        <div className="row g-4 mt-2">

          <div className="col-md-4 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
              alt="profile"
              width="140"
              className="rounded-circle shadow-sm mb-3"
            />
            <h4 className="fw-bold">{user.username}</h4>
            <p className="text-muted">{user.email}</p>
          </div>

          <div className="col-md-8">
            <div className="p-3 bg-light rounded" style={{ borderRadius: "10px" }}>
              <h5 className="fw-semibold mb-3">Personal Details</h5>

              <p><strong>Enrollment:</strong> {user.enroll}</p>
              <p><strong>Year:</strong> {user.year}</p>
              <p><strong>Semester:</strong> {user.semester}</p>
              <p><strong>Address:</strong> {user.address}</p>

              <p>
                <strong>LinkedIn:</strong>{" "}
                <a href={user.profileLink} target="_blank" rel="noopener noreferrer">
                  Visit Profile
                </a>
              </p>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
