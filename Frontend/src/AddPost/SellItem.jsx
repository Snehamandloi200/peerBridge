import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SellItem.css";

function SellItem() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    location: "",
    contact: "",
     gmail: "",
     creator: "", 
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  // NEW: Prevent multiple clicks
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    if (isSubmitting) return; 

    setIsSubmitting(true);

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));

    try {
      await axios.post("http://localhost:8080/addsell", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Item Posted Successfully!");
      navigate("/sell");
    } catch (err) {
      console.error("Error posting item:", err);
      alert("Something went wrong!");
      setIsSubmitting(false); // Re-enable button on error
    }
  };

  return (
    <div className="sellitem-section d-flex justify-content-center align-items-center">
      <div className={`sellitem-card shadow-lg ${fadeIn ? "fade-in" : ""}`}>
        <h2 className="sellitem-title text-center mb-4">🛍️ Sell Your Item</h2>

        <form className="row g-3" onSubmit={handleSubmit}>
          
          {/* Title */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Item Title</label>
            <input
              type="text"
              className="form-control input-custom"
              placeholder="Enter item name"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Price */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Price (₹)</label>
            <input
              type="number"
              className="form-control input-custom"
              placeholder="Enter price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* Category */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Category</label>
            <select
              className="form-select input-custom"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              <option>Books</option>
              <option>Electronics</option>
              <option>Accessories</option>
              <option>Others</option>
            </select>
          </div>

          {/* Location */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Pickup Location</label>
            <input
              type="text"
              className="form-control input-custom"
              placeholder="Hostel Gate / Canteen"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="col-12">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control input-custom"
              rows="3"
              placeholder="Write a short description..."
              name="description"
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
              placeholder="React, Python, UI Design..."
              name="creator"
              value={formData.creator}
              onChange={handleChange}
            />
          </div>

          <h5 className="fw-bold text-primary mt-3">📞 Contact Details</h5>

          <div className="col-md-6">
            <label className="form-label fw-semibold text-secondary">
              Contact Number
            </label>
            <input
              type="tel"
              className="form-control shadow-sm"
              placeholder="Enter your WhatsApp or mobile number"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              style={{
                borderRadius: "12px",
                border: "1px solid #cfd8dc",
                padding: "12px",
              }}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold text-secondary">
              Gmail ID
            </label>
            <input
              type="email"
              className="form-control shadow-sm"
              placeholder="Enter your Gmail (e.g., you@gmail.com)"
              name="gmail"
              value={formData.gmail}
              onChange={handleChange}
              required
              style={{
                borderRadius: "12px",
                border: "1px solid #cfd8dc",
                padding: "12px",
              }}
            />
          </div>


          {/* Upload */}
          <div className="col-12">
            <label className="form-label fw-semibold">Upload Photo</label>
            <input
              type="file"
              className="form-control input-custom"
              accept="image/*"
              name="image"
              onChange={handleFileChange}
              required
            />
          </div>

          {/* Preview */}
          {preview && (
            <div className="col-12 text-center">
              <img src={preview} className="preview-img mt-3" alt="Preview" />
            </div>
          )}

          {/* Submit Button */}
          <div className="col-12 text-center mt-4">
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Posting..." : "Post Item"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default SellItem;
