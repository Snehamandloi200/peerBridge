import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function LostAndFoundShow() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/lostandfound/${id}`)
      .then(res => setItem(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!item) {
    return <p>Loading  details...</p>;
  }

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5" style={{ minHeight: "100vh" , marginLeft:"130px" , height:"100px"}} >
      <div className="card shadow-lg p-4 text-center" style={{ width: "500px"}}>
        <img src={item.image} alt={item.title} style={{ height: "400px", objectFit: "cover" }}/>
        <h2>{item.status}</h2>
        <h4>{item.name}</h4>
        <h6>{item.location}</h6>
         <p>{item.description}</p>
        
         <div className="card-footer">
                <small className="text-muted">Contact Number: </small>
              </div>
       
      </div>
    </div>
  );
}

export default LostAndFoundShow;
