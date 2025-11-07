import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Lost_Found() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    status: "",
    itemName: "",
    description: "",
    location: "",
    image: null,
  });

  // Fade-in animation when component mounts
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("status", formData.status);
    form.append("itemName", formData.itemName);
    form.append("description", formData.description);
    form.append("location", formData.location);
    form.append("image", formData.image);

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
      navigate("/lostandfound");
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error posting item:", error);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fce4ec, #e3f2fd)",
        padding: "30px",
        transition: "background 1s ease",
      }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{
          width: "100%",
          maxWidth: "600px",
          borderRadius: "20px",
          border: "none",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(8px)",
          transform: visible ? "translateY(0)" : "translateY(30px)",
          opacity: visible ? 1 : 0,
          transition: "all 0.8s ease",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.02)";
          e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
        }}
      >
        <h3
          className="text-center mb-4"
          style={{
            color: "#d81b60",
            fontWeight: "600",
            letterSpacing: "1px",
            animation: visible ? "fadeIn 1s ease" : "none",
          }}
        >
          Lost & Found Report
        </h3>

        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label fw-semibold text-secondary">
              Status
            </label>
            <select
              className="form-select rounded-3 shadow-sm"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              style={{
                border: "1px solid #f48fb1",
                transition: "box-shadow 0.3s ease",
              }}
              onFocus={(e) =>
                (e.target.style.boxShadow = "0 0 10px #f06292")
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            >
              <option value="">Select</option>
              <option>Lost</option>
              <option>Found</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold text-secondary">
              Item Name
            </label>
            <input
              type="text"
              className="form-control rounded-3 shadow-sm"
              placeholder="Wallet, ID Card, etc."
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              required
              style={{
                border: "1px solid #f48fb1",
                transition: "box-shadow 0.3s ease",
              }}
              onFocus={(e) =>
                (e.target.style.boxShadow = "0 0 10px #f06292")
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold text-secondary">
              Location
            </label>
            <input
              type="text"
              className="form-control rounded-3 shadow-sm"
              placeholder="Where it was lost/found"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              style={{
                border: "1px solid #f48fb1",
                transition: "box-shadow 0.3s ease",
              }}
              onFocus={(e) =>
                (e.target.style.boxShadow = "0 0 10px #64b5f6")
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold text-secondary">
              Description
            </label>
            <textarea
              className="form-control rounded-3 shadow-sm"
              rows="3"
              placeholder="Details about the item..."
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              style={{
                border: "1px solid #f48fb1",
                transition: "box-shadow 0.3s ease",
              }}
              onFocus={(e) =>
                (e.target.style.boxShadow = "0 0 10px #ba68c8")
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            ></textarea>
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold text-secondary">
              Photo (Optional)
            </label>
            <input
              type="file"
              className="form-control rounded-3 shadow-sm"
              accept="image/*"
              name="image"
              onChange={handleFileChange}
              style={{
                border: "1px solid #f48fb1",
                transition: "box-shadow 0.3s ease",
              }}
              onFocus={(e) =>
                (e.target.style.boxShadow = "0 0 10px #f06292")
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </div>

          <div className="col-12 mt-3">
            <button
              type="submit"
              className="btn w-100"
              style={{
                background:
                  "linear-gradient(90deg, #f06292, #ec407a, #d81b60)",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontWeight: "600",
                transition: "all 0.3s ease",
                boxShadow: "0 5px 15px rgba(216,27,96,0.3)",
              }}
              onMouseOver={(e) => {
                e.target.style.background =
                  "linear-gradient(90deg, #d81b60, #ec407a, #f06292)";
                e.target.style.boxShadow =
                  "0 8px 25px rgba(216,27,96,0.5)";
                e.target.style.transform = "scale(1.03)";
              }}
              onMouseOut={(e) => {
                e.target.style.background =
                  "linear-gradient(90deg, #f06292, #ec407a, #d81b60)";
                e.target.style.boxShadow =
                  "0 5px 15px rgba(216,27,96,0.3)";
                e.target.style.transform = "scale(1)";
              }}
            >
               Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Lost_Found;
