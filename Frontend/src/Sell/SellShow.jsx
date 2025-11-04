import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SellShow() {
  const { id } = useParams();
  const [sell, setSell] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/sell/${id}`)
      .then(res => setSell(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!sell) {
    return <p>Loading  details...</p>;
  }

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5" style={{ minHeight: "100vh" , marginLeft:"130px"}} >
      <div className="card shadow-lg p-4 text-center" style={{ width: "500px" }}>
        <img src={sell.image} alt={sell.title}/>
        <h2>{sell.title}</h2>
        
        <p>{sell.description}</p>
        <p>Contact Number: </p>
         <div className="card-footer">
                <small className="text-muted">Price: ₹{sell.price}</small>
              </div>
         
      </div>
    </div>
  );
}

export default SellShow;
