import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Sell.css";

function Sell() {
  const navigate = useNavigate();
  const [allSells, setAllSells] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://peerbridge-au78.onrender.com/allSells", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAllSells(res.data))
      .catch((err) => {
        console.error("Error fetching sells:", err);
        if (err.response && err.response.status === 401) {
          alert("Please login first!");
          navigate("/login");
        }
      });
  }, [navigate]);

  return (
    <motion.div
    
      className="sell-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <div className="sell-section py-5 mt-5" style={{background:""}}>
        <div className="sell-container px-4">

          {/* HEADER */}
          <motion.div
            className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 text-center text-md-start"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div style={{background:""}}>
              <h1 className="fw-bold text-primary mb-2">
                Buy & Sell <span className="highlight">on Campus</span>
              </h1>
              <p className="text-muted mb-0">
                Explore, trade, and connect with your campus community.
              </p>
            </div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link to="/addpost" className="mt-4 mt-md-0">
                <button className="btn btn-secondary btn-md shadow-lg pulse" style={{ backgroundColor: "#015b6cff",
      color: "white",
      border: "none",
        // bigger text
      padding: "18px 45px",
      height: "50px",
      width:"140px",
      fontSize:"1.2rem",
      // bigger button
      borderRadius: "18px",    // smoother edges
      fontWeight: "600", }}>
                  + Add New Post
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* GRID — RESPONSIVE CARDS */}
          {allSells.length === 0 ? (
            <motion.div
              className="text-center text-muted fs-5 mt-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              No items listed yet — Be the first to post!
            </motion.div>
          ) : (
            <div className="sell-grid">
              {allSells.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={`/sell/${item._id}`}
                    className="text-decoration-none text-dark w-100"
                  >
                    <motion.div
                      className="sell-card border-0 shadow-sm"
                      whileHover={{
                        scale: 1.03,
                        y: -5,
                        boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="card-img-top"
                      />
                      <div className="card-body text-start">
                        <h5 className="fw-semibold text-dark">{item.title}</h5>
                        <p className="text-muted small mb-2">
                          {item.description.length > 60
                            ? item.description.slice(0, 30) + "..."
                            : item.description}
                        </p>
                      </div>
                      <div className="card-footer bg-transparent border-0 text-end">
                        <span className="badge bg-light text-primary fs-6 fw-bold">
                          ₹{item.price}
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </div>
    </motion.div>
  );
}

export default Sell;
