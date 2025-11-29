import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    enroll: "",
    year: "",
    semester: "",
    address: "",
    profileLink: "",
  });

  // ------------- FETCH PROFILE FROM BACKEND ----------------
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:8080/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setData(res.data);
       
      } catch (err) {
        console.error("Error loading profile:", err);
        alert("Failed to load profile. Please login again.");
      }
    };

    fetchProfile();
  }, []);

  // ------------- HANDLE FORM CHANGE ----------------
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // ------------- UPDATE PROFILE IN BACKEND ----------------
  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        "http://localhost:8080/profileedit",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile Updated Successfully!");
       navigate("/profile");
    } catch (err) {
      console.error("Update Error:", err.response?.data || err.message);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "700px" }}>
      <div
        className="card shadow-lg p-4 border-0 mt-5"
        style={{ borderRadius: "20px" }}
      >
        <h2 className="fw-bold text-center mb-4" style={{ color: "#1565c0" }}>
          ✏️ Edit Profile
        </h2>

        <form onSubmit={updateProfile} className="row">

          {/* Full Name */}
          <div className="col-md-12">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={data.username}
              onChange={handleChange}
              style={{ borderRadius: "12px" }}
            />
          </div>

          {/* Email */}
          <div className="col-md-12">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={data.email}
              onChange={handleChange}
              style={{ borderRadius: "12px" }}
            />
          </div>

          {/* Enrollment */}
          <div className="col-md-12">
            <label className="form-label fw-semibold">Enrollment</label>
            <input
              type="text"
              className="form-control"
              name="enroll"
              value={data.enroll}
              onChange={handleChange}
              style={{ borderRadius: "12px" }}
            />
          </div>

          {/* Year */}
          <div className="col-md-12">
            <label className="form-label fw-semibold">Year</label>
            <select
              className="form-select"
              name="year"
              value={data.year}
              onChange={handleChange}
              style={{ borderRadius: "12px" }}
            >
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>Final Year</option>
            </select>
          </div>

          {/* Semester */}
          <div className="col-md-12">
            <label className="form-label fw-semibold">Semester</label>
            <input
              type="text"
              className="form-control"
              name="semester"
              value={data.semester}
              onChange={handleChange}
              style={{ borderRadius: "12px" }}
            />
          </div>

          {/* Address */}
          <div className="col-md-12">
            <label className="form-label fw-semibold">Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={data.address}
              onChange={handleChange}
              style={{ borderRadius: "12px" }}
            />
          </div>

          {/* LinkedIn */}
          <div className="col-md-12">
            <label className="form-label fw-semibold">LinkedIn Profile</label>
            <input
              type="url"
              className="form-control"
              name="profileLink"
              value={data.profileLink}
              onChange={handleChange}
              style={{ borderRadius: "12px" }}
            />
          </div>

          {/* Button */}
          <div className="col-12">
            <button
              type="submit"
              className="btn w-100 fw-semibold"
              style={{
                background: "linear-gradient(135deg, #42a5f5, #64b5f6)",
                color: "white",
                borderRadius: "12px",
                boxShadow: "0 6px 20px rgba(66,165,245,0.4)",
              }}
            >
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
