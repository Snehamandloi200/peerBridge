import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SellItem() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    location: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  // fade-in animation on mount
  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));

    try {
      const res = await axios.post("http://localhost:8080/addsell", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Item Added Successfully:", res.data);
      navigate("/sell");
    } catch (err) {
      console.error("Error posting item:", err);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(120deg, #e3f2fd 0%, #f1f8e9 50%, #fff3e0 100%)",
        padding: "60px 20px",
        overflow: "hidden",
      }}
    >
      <div
        className={`card border-0 shadow-lg ${fadeIn ? "fade-in" : ""}`}
        style={{
          width: "100%",
          maxWidth: "720px",
          borderRadius: "25px",
          padding: "40px 45px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
          transform: fadeIn ? "translateY(0)" : "translateY(40px)",
          opacity: fadeIn ? 1 : 0,
          transition: "all 0.8s ease",
        }}
      >
        <h2
          className="text-center fw-bold mb-4"
          style={{
            color: "#1565c0",
            fontSize: "2rem",
            letterSpacing: "0.8px",
            animation: "fadeSlide 1s ease-in-out",
          }}
        >
          🛍️ Sell Your Item
        </h2>

        <form className="row g-4" onSubmit={handleSubmit}>
          {/* Title & Price */}
          {[
            { label: "Item Title", name: "title", type: "text", placeholder: "Enter item name" },
            { label: "Price (₹)", name: "price", type: "number", placeholder: "Enter price" },
          ].map((field, i) => (
            <div
              key={i}
              className="col-md-6 form-animate"
              style={{
                animation: `slideInUp 0.5s ease ${i * 0.2}s both`,
              }}
            >
              <label className="form-label fw-semibold text-secondary">{field.label}</label>
              <input
                type={field.type}
                className="form-control shadow-sm"
                placeholder={field.placeholder}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
                style={{
                  borderRadius: "12px",
                  border: "1px solid #cfd8dc",
                  padding: "12px",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => (e.target.style.boxShadow = "0 0 12px rgba(33,150,243,0.4)")}
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
            </div>
          ))}

          {/* Category */}
          <div
            className="col-md-6 form-animate"
            style={{ animation: "slideInUp 0.5s ease 0.4s both" }}
          >
            <label className="form-label fw-semibold text-secondary">Category</label>
            <select
              className="form-select shadow-sm"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              style={{
                borderRadius: "12px",
                border: "1px solid #cfd8dc",
                padding: "12px",
                transition: "all 0.3s ease",
              }}
            >
              <option value="">Select category</option>
              <option>Books</option>
              <option>Electronics</option>
              <option>Accessories</option>
              <option>Others</option>
            </select>
          </div>

          {/* Pickup Location */}
          <div
            className="col-md-6 form-animate"
            style={{ animation: "slideInUp 0.5s ease 0.6s both" }}
          >
            <label className="form-label fw-semibold text-secondary">Pickup Location</label>
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="E.g., Hostel Gate"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              style={{
                borderRadius: "12px",
                border: "1px solid #cfd8dc",
                padding: "12px",
              }}
            />
          </div>

          {/* Description */}
          <div
            className="col-12 form-animate"
            style={{ animation: "slideInUp 0.5s ease 0.8s both" }}
          >
            <label className="form-label fw-semibold text-secondary">Description</label>
            <textarea
              className="form-control shadow-sm"
              rows="3"
              placeholder="Write a short description..."
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              style={{
                borderRadius: "12px",
                border: "1px solid #cfd8dc",
                padding: "12px",
              }}
            ></textarea>
          </div>

          {/* Upload & Preview */}
          <div
            className="col-12 form-animate"
            style={{ animation: "slideInUp 0.5s ease 1s both" }}
          >
            <label className="form-label fw-semibold text-secondary">Upload Photo</label>
            <input
              type="file"
              className="form-control shadow-sm"
              accept="image/*"
              name="image"
              onChange={handleFileChange}
              required
              style={{
                borderRadius: "12px",
                border: "1px solid #cfd8dc",
                padding: "12px",
              }}
            />
            {preview && (
              <div className="text-center mt-3">
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    maxWidth: "200px",
                    borderRadius: "15px",
                    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div
            className="col-12 mt-3 text-center form-animate"
            style={{ animation: "fadeSlide 1s ease 1.2s both" }}
          >
            <button
              type="submit"
              className="btn fw-semibold"
              style={{
                background: "linear-gradient(135deg, #42a5f5, #1e88e5)",
                color: "white",
                borderRadius: "12px",
                fontSize: "1.1rem",
                padding: "12px 30px",
                boxShadow: "0 8px 25px rgba(21,101,192,0.4)",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.boxShadow = "0 10px 35px rgba(21,101,192,0.6)";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.target.style.boxShadow = "0 8px 25px rgba(21,101,192,0.4)";
                e.target.style.transform = "scale(1)";
              }}
            >
               Post Item
            </button>
          </div>
        </form>
      </div>

      
    </div>
  );
}

export default SellItem;
