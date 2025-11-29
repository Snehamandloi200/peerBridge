import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LostAndFound() {
  const navigate = useNavigate();

  // Form Inputs
  const [formData, setFormData] = useState({
    status: "",
    itemName: "",
    description: "",
    location: "",
    contact: "",
    creator: "",
    image: null,
  });

  // Fade Animation
  const [visible, setVisible] = useState(false);

  // Prevent double submit
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; 

    setIsSubmitting(true);

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));

    try {
      const response = await axios.post(
        "http://localhost:8080/addlostandfound",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Lost & Found Item Submitted Successfully!");
      navigate("/lostandfound");
    } catch (error) {
      console.error("Error posting item:", error);
      alert("Something went wrong while submitting!");
    } finally {
      setIsSubmitting(false); // Enable button again
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fce4ec, #e3f2fd)",
        padding: "30px",
      }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{
          width: "100%",
          maxWidth: "600px",
          borderRadius: "20px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "0.8s ease",
        }}
      >
        <h3 className="text-center mb-4" style={{ color: "#d81b60" }}>
          Lost & Found Report
        </h3>

        <form className="row " onSubmit={handleSubmit}>
          {/* Status */}
          <div className="col-md-12">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option>Lost</option>
              <option>Found</option>
            </select>
          </div>

          {/* Item Name */}
          <div className="col-md-12">
            <label className="form-label">Item Name</label>
            <input
              type="text"
              className="form-control"
              name="itemName"
              placeholder="Wallet, Bag, ID Card..."
              value={formData.itemName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Location */}
          <div className="col-12">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              name="location"
              placeholder="Where it was lost/found"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="3"
              name="description"
              placeholder="Write details..."
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

           <div className="col-12">
            <label className="form-label fw-semibold">Owner</label>
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="Enter owner`s name"
              name="creator"
              value={formData.creator}
              onChange={handleChange}
            />
          </div>

           <h5 className="fw-bold text-primary mt-3">📞 Contact Details</h5>

          <div className="col-md-12">
            <label className="form-label fw-semibold text-secondary">
              Contact Number
            </label>
            <input
              type="tel"
              className="form-control rounded-3 shadow-sm"
              placeholder="Enter your WhatsApp or mobile number"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              style={{
                border: "1px solid #f48fb1",
              }}
            />
          </div>


          {/* File Upload */}
          <div className="col-12">
            <label className="form-label">Upload Photo (Optional)</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              name="image"
              onChange={handleFileChange}
            />
          </div>

          {/* Button */}
          <div className="col-12 mt-3">
            <button
              type="submit"
              className="btn btn-danger w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LostAndFound;
