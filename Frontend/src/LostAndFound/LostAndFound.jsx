import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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
    <div
      className="container-fluid py-5"
      style={{
        background:
          "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        minHeight: "100vh",
      }}
    >
      <h2
        className="text-center fw-bold mb-5 mt-5"
        style={{
          color: "#1a237e",
          letterSpacing: "1px",
          textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
        }}
      >
         Lost & Found Items
      </h2>

      <Link to="/addpost" className="text-decoration-none ">
                  <button className="btn add-btn shadow-sm " style={{marginLeft:"1300px", marginBottom:"30px"}}>
                    + Add New Post
                  </button>
                </Link>

      <div className="row justify-content-center g-5 px-5">
        {allLostAndFounds.map((item, index) => (
          <div
            key={index}
            className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center"
          >
            <Link
              to={`/lostandfound/${item._id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                width: "100%",
                maxWidth: "320px",
              }}
            >
              <div
                className="card border-0 shadow-lg position-relative overflow-hidden"
                style={{
                  borderRadius: "20px",
                  transition:
                    "transform 0.4s ease, box-shadow 0.4s ease, background 0.4s ease",
                  background: "linear-gradient(145deg, #ffffff, #e3f2fd)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-12px)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 35px rgba(0,0,0,0.2)";
                  e.currentTarget.style.background =
                    "linear-gradient(145deg, #e3f2fd, #bbdefb)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0,0,0,0.1)";
                  e.currentTarget.style.background =
                    "linear-gradient(145deg, #ffffff, #e3f2fd)";
                }}
              >
                {/* Image Section */}
                <div
                  style={{
                    overflow: "hidden",
                    height: "230px",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.itemName}
                    className="card-img-top"
                    style={{
                      objectFit: "cover",
                      height: "100%",
                      width: "100%",
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

                {/* Card Body */}
                <div className="card-body text-center p-4">
                  <span
                    className={`badge ${
                      item.status.toLowerCase() === "lost"
                        ? "bg-danger"
                        : "bg-success"
                    } mb-3`}
                    style={{
                      fontSize: "0.8rem",
                      padding: "0.5em 1em",
                      borderRadius: "10px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {item.status}
                  </span>

                  <h5
                    className="fw-bold"
                    style={{
                      color: "#0d47a1",
                      fontSize: "1.2rem",
                      marginBottom: "10px",
                    }}
                  >
                    {item.itemName}
                  </h5>

                  <h6
                    className="text-muted mb-3"
                    style={{ fontSize: "0.9rem" }}
                  >
                     {item.location || "Unknown location"}
                  </h6>

                  <p
                    className="card-text text-secondary"
                    style={{
                      fontSize: "0.9rem",
                      minHeight: "60px",
                      overflow: "hidden",
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div
                  className="card-footer text-center border-0 bg-transparent pb-3"
                  style={{
                    color: "#1976d2",
                    fontWeight: "600",
                    fontSize: "0.95rem",
                    letterSpacing: "0.5px",
                    transition: "color 0.3s ease",
                  }}
                >
                  View Details →
                </div>
              </div>
            </Link>
          </div>
        ))}

        {allLostAndFounds.length === 0 && (
          <p
            className="text-center text-muted mt-5"
            style={{ fontSize: "1.2rem" }}
          >
            No lost or found items added yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default LostAndFound;
