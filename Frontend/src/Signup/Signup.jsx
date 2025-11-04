import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
const navigate = useNavigate();
 const [formData, setFormData] = useState({
    username:"",
    enroll:"",
    email: "",
   password: "",
   profileLink:"",
   address:"",
   year:"",
   semester:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  
  const handleSubmit = async(e) => {
    e.preventDefault(); 
    
    const response=await axios.post("http://localhost:8080/signup",formData,{
      headers:{
        "Content-Type":"application/json"
      },
       
    })
    console.log(response.data);
   
    if (response.data.token) {
  localStorage.setItem("token", response.data.token); 
  alert("signup successful!");
  navigate("/sell");
} else {
  alert("signup failed.");
}
    
  };


  return (
    <div
      className="d-flex justify-content-center align-items-center mt-5"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card p-4 shadow "
        style={{ width: "100%", maxWidth: "600px", marginTop: "60px" , height:"870px"}}
      >
        <h3 className="text-center mb-4">Sign Up</h3>
 
        <form className="row g-3" onSubmit={handleSubmit}>
            
<div className="col-md-6">
  <label htmlFor="fullName" className="form-label">
    Full Name
  </label>
  <input
    type="text"
    className="form-control"
    id="fullName"
    placeholder="Enter your full name"
    name="username"
    value={formData.username}
    onChange={handleChange}
    required
  />
</div>

          <div className="col-md-6">
            <label htmlFor="inputEnrollment" className="form-label">
              Enrollment Number
            </label>
            <input
              type="text"
              className="form-control"
              id="inputEnrollment"
              placeholder="0805CSXXXXX"
              name="enroll"
    value={formData.enroll}
    onChange={handleChange}
              required
              minLength={12}
              maxLength={12}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              name="email"
    value={formData.email}
    onChange={handleChange}
              required
              placeholder="@gmail.com"
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              name="password"
    value={formData.password}
    onChange={handleChange}
              minLength={6}
              required
            />
          </div>

          <div className="mb-3">
  <label htmlFor="linkedinUrl" className="form-label">
    LinkedIn Profile
  </label>
  <input
    type="url"
    className="form-control"
    id="linkedinUrl"
    name="profileLink"
    value={formData.profileLink}
    onChange={handleChange}
    placeholder="https://www.linkedin.com/in/yourname"
  />
</div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="residence"
              id="exampleRadios1"
              value="option1"
            />
            
            <label className="form-check-label" htmlFor="exampleRadios1">
              Day Scholar
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="residence"
              id="exampleRadios2"
              value="option2"
             
            />
            <label className="form-check-label" htmlFor="exampleRadios2">
              Hosteller
            </label>
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress2" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress2"
              name="address"
    value={formData.address}
    onChange={handleChange}
              placeholder="Enter your address"
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputCollagename" className="form-label">
              Collage Name
            </label>
            <input
              className="form-control"
              type="text"
              value="Jawaharlal Institute of Technology , Borawan"
              aria-label="readonly input example"
              disabled
              readOnly
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputCity" className="form-label">
              City
            </label>
            <input type="text" className="form-control" id="inputCity" />
          </div>

          <div className="col-md-4">
            <label htmlFor="inputState" className="form-label">
              Year
            </label>
            <select id="inputState" className="form-select" 
              name="year"
    value={formData.year}
    onChange={handleChange}
            required>
              <option defaultValue="">Select year</option>
              <option> 1st Year</option>
              <option> 2nd Year</option>
              <option> 3rd Year</option>
              <option> Final Year</option>
            </select>
          
          </div>

          <div className="col-md-2">
            <label htmlFor="inputSem" className="form-label">
              Semester
            </label>
            <input type="text" className="form-control" id="inputSem"    name="semester"
    value={formData.semester}
    onChange={handleChange}/>
          </div>

          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="gridCheck"
              />
              <label className="form-check-label" htmlFor="gridCheck">
                Agree to terms and conditions
              </label>
            </div>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
