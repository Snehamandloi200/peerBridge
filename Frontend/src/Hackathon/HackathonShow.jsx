import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function HackathonShow() {
  const { id } = useParams();
  const [hackathon, setHackathon] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/hackathon/${id}`)
      .then(res => setHackathon(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!hackathon) {
    return <p>Loading hackathon details...</p>;
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" , marginLeft:"130px"}} >
      <div className="card shadow-lg p-4 text-center" style={{ width: "500px" }}>
        <h2 className='mb-3'>{hackathon.project}</h2>
        <h5 className='mb-3'>Team Name: {hackathon.name}</h5>
       <span
                    className="badge bg-success mb-3"
                    style={{ fontSize: "0.8rem" , width:"200px", marginLeft:"120px"}}
                  >
                    needed members {hackathon.neededmembers}
                  </span>
        <p>{hackathon.description}</p>
        <div className="card-footer">
                <small className="text-muted">Contact Number: </small>
              </div>
      </div>
    </div>
  );
}

export default HackathonShow;
