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
        background: "linear-gradient(to right, #f8fbff, #eef2f3)",
        minHeight: "100vh",
      }}
    >
      {/* PAGE TITLE */}
      <h2
        className="text-center fw-bold mb-4 mt-4"
        style={{
          color: "#1a237e",
          letterSpacing: "1px",
        }}
      >
        Lost & Found Items
      </h2>

      {/* ADD POST BUTTON (RESPONSIVE) */}
      <div className="container mb-4">
        <div className="d-flex justify-content-sm-center justify-content-md-end">
          <Link to="/addpost" className="text-decoration-none">
            <button className="btn btn-secondary shadow-sm">
              + Add New Post
            </button>
          </Link>
        </div>
      </div>

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
                    background: "linear-gradient(145deg, #ffffff, #e3f2fd)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
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
                        height: "100%",
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

                    <h6 className="text-muted mb-2" style={{ fontSize: "0.9rem" }}>
                      {item.location || "Unknown location"}
                    </h6>

                    <p
                      className="text-secondary"
                      style={{
                        fontSize: "0.9rem",
                        minHeight: "60px",
                        overflow: "hidden",
                      }}
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* FOOTER */}
                  <div
                    className="card-footer text-center border-0 bg-transparent pb-3"
                    style={{
                      fontWeight: "600",
                      color: "#1976d2",
                    }}
                  >
                    View Details →
                  </div>
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
  );
}

export default LostAndFound;
