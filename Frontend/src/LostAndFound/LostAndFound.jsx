import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import "../Sell/Sell.css";

function LostAndFound() {
  const navigate = useNavigate();
  const [allLostAndFounds, setAllLostAndFounds] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8080/allLostAndFounds", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setAllLostAndFounds(res.data))
      .catch((err) => {
        console.error("Error fetching data:", err);
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
      {/* PAGE TITLE */}
      <motion.div
            className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 text-center text-md-start"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
    <h1
  className="fw-bold text-primary mb-2"
  style={{marginLeft:"30px"}}
>
  Lost &  Found Items<span style={{ color: "#f97a1f" }}> on Campaus</span>
</h1>
 
      {/* ADD POST BUTTON (RESPONSIVE) */}
      
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link to="/addpost" className="text-decoration-none">
            <button className="btn btn-secondary shadow-sm" style={{ backgroundColor: "#015b6cff",
      color: "white",
      border: "none",
        // bigger text
      padding: "18px 45px",
      height: "50px",
      width:"140px",
      fontSize:"1.2rem",
     marginRight:"40px",
      borderRadius: "18px",    // smoother edges
      fontWeight: "600", }}>
              + Add New Post
            </button>
          </Link>
          </motion.div>
         
       
 </motion.div>
      {/* ITEMS LIST */}
      <div className="container">
        <div className="row justify-content-center g-4">
          {allLostAndFounds.map((item, index) => (
            <div
              key={index}
              className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center"
            >
              <Link
                to={`/lostandfound/${item._id}`}
                className="text-decoration-none"
                style={{
                  color: "inherit",
                  width: "100%",
                  maxWidth: "320px",
                }}
              >
                <div
                  className="card shadow-lg border-0"
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    transition:
                      "transform 0.4s ease, box-shadow 0.4s ease, background 0.4s ease",
                    background: "#ffffff",
                  }}
                  
                >
                  {/* IMAGE */}
                  <div
                    style={{
                      height: "230px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.itemName}
                      style={{
                        width: "100%",
                        height: "90%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.1)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    />
                  </div>

                  {/* BODY */}
                  <div className="card-body text-center p-3">
                    <span
                      className={`badge ${
                        item.status === "Lost" ? "bg-danger" : "bg-success"
                      } mb-2`}
                      style={{
                        padding: "0.5em 1em",
                        borderRadius: "10px",
                        fontSize: "0.8rem",
                      }}
                    >
                      {item.status}
                    </span>

                    <h5
                      className="fw-bold"
                      style={{ color: "#0d47a1", fontSize: "1.1rem" }}
                    >
                      {item.itemName}
                    </h5>

                    {/* <h6 className="text-muted mb-2" style={{ fontSize: "0.9rem" }}>
                      {item.location || "Unknown location"}
                    </h6> */}

                  <p className="text-muted small mb-2">
                          {item.description.length > 60
                            ? item.description.slice(0, 30) + "..."
                            : item.description}
                        </p>
                  </div>

                  {/* FOOTER */}
                  {/* <div
                    className="card-footer text-center border-0 bg-transparent pb-3"
                    style={{
                      fontWeight: "600",
                      color: "#1976d2",
                    }}
                  >
                    View Details →
                  </div> */}
                </div>
              </Link>
            </div>
          ))}

          {/* EMPTY STATE */}
          {allLostAndFounds.length === 0 && (
            <p className="text-center text-muted mt-5" style={{ fontSize: "1.2rem" }}>
              No lost or found items added yet.
            </p>
          )}
        </div>
      </div>
   </div>
         </div>
       </motion.div>
  );
}

export default LostAndFound;
