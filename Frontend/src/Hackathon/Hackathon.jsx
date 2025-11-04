import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../Sell/Sell.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Hackathon() {
  const navigate = useNavigate();
  const [allHackathons, setAllHackathons] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8080/allhackathons", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setAllHackathons(res.data))
      .catch((err) => {
        console.error("Error fetching sells:", err);
        if (err.response && err.response.status === 401) {
          alert("Please login first!");
          navigate("/login");
        }
      });
  }, []);

  return (
    <div className="container my-4 mx-5  mt-5">
      <div className="row p-5 justify-content-center text-center g-5 ">
        {allHackathons.map((items, index) => {
          return (
            <div
              className="col-md-4  mb-5  col-sm-6 d-flex justify-content-center "
              key={index}
            >
              <Link
                to={`/hackathon/${items._id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  width: "100%",
                }}
              >
                <div className="card h-100 shadow-sm  " id="box">
                  <div className="card-body text-center">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="card-title text-start mb-0">
                        Project Title: {items.project}
                      </h5>
                      <span
                        className="badge bg-success"
                        style={{ fontSize: "0.8rem" }}
                      >
                        needed members {items.neededmembers}
                      </span>
                    </div>

                    <br></br>
                    <h6 className="card-title"> Team name: {items.name}</h6>
                    <br></br>
                    <p className="card-text">{items.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Hackathon;
