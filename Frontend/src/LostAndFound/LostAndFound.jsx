import { useState ,useEffect} from "react";
import React from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function LostAndFound() {
  const navigate = useNavigate();
    const [allLostAndFounds, setAllLostAndFounds] = useState([]);

  useEffect(() => {
  const token = localStorage.getItem("token");

  axios.get("http://localhost:8080/allLostAndFounds", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((res) => setAllLostAndFounds(res.data))
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
        {allLostAndFounds.map((items, index) => {
          return(
          <div className="col-md-3  mb-5  col-sm-6 d-flex justify-content-center " key={index}>
             <Link
              to={`/lostandfound/${items._id }`}   
              style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
            >
            <div className="card h-100 shadow-sm  " id="box">
              <img
                className="card-img-top"
                src={items.image}
                alt={items.title}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{items.status}</h5>
                 <h5 className="card-title">{items.itemName}</h5>
                  <h6 className="card-title">{items.location}</h6>
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

export default LostAndFound;

