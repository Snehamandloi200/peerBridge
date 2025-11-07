import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Sell.css";
import { Link, useNavigate } from "react-router-dom";

function Sell() {
  const navigate = useNavigate();
  const [allSells, setAllSells] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/allSells", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
    <section className="sell-section py-5">
      <div className="container">
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5">
          <div>
            <h1 className="fw-bold sell-title text-primary mt-5">
              Buy & Sell 
            </h1>
            <p className="text-muted lead">
              Explore, trade, and connect with your campus community.
            </p>
          </div>

          <Link to="/addpost" className="text-decoration-none">
            <button className="btn add-btn shadow-sm">
              + Add New Post
            </button>
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="row g-4 justify-content-center">
          {allSells.length === 0 ? (
            <div className="text-center text-muted fs-5 mt-5">
              No items listed yet  — Be the first to post!
            </div>
          ) : (
            allSells.map((item, index) => (
              <div
                className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center"
                key={index}
              >
                <Link
                  to={`/sell/${item._id}`}
                  className="text-decoration-none text-dark w-100"
                >
                  <div className="card sell-card shadow-sm border-0 h-100">
                    <div className="img-container">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="card-img-top sell-img"
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="fw-semibold">{item.title}</h5>
                      <p className="text-muted small mt-2">
                        {item.description.length > 60
                          ? item.description.slice(0, 60) + "..."
                          : item.description}
                      </p>
                    </div>
                    <div className="card-footer border-0 bg-transparent text-end">
                      <span className="price-badge">₹{item.price}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Sell;
