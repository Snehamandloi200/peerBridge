import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Sell.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Sell() {
  const navigate = useNavigate();
  const [allSells, setAllSells] = useState([]);

  useEffect(() => {
  const token = localStorage.getItem("token");

  axios.get("http://localhost:8080/allSells", {
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
}, []);

  return (
    <div className="container my-4 mx-5 ">
      <div className="row p-5 justify-content-center text-center g-5 ">
        {allSells.map((items, index) => {
          return(
          <div className="col-md-3  mb-5  col-sm-6 d-flex justify-content-center " key={index}>
            <Link
              to={`/sell/${items._id }`}   
              style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
            >
            <div className="card h-100 shadow-sm  " id="box">
              <img
                className="card-img-top"
                src={items.image}
                alt={items.title}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{items.title}</h5>
                <p className="card-text mt-3">{items.description}</p>
              </div>
              <div className="card-footer">
                <small className="text-muted">Price: ₹{items.price}</small>
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

export default Sell;
