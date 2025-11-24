import React, { useState } from "react";

const ProfileEdit = () => {
  const [data, setData] = useState({
    username: "Sneha Mandloi",
    email: "sneha@example.com",
    enroll: "0805CS221234",
    year: "3rd Year",
    semester: "6th",
    address: "Borawan, MP",
    profileLink: "https://linkedin.com/in/sneha",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const updateProfile = (e) => {
    e.preventDefault();
    alert("Profile Updated Successfully!");
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

        <form onSubmit={updateProfile} className="row ">

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
