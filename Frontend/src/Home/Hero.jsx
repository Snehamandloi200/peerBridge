import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Hero.css"; // optional for custom animation
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero-section py-5 bg-light mt-5">
      <div className="container-fluid px-4">
        <div className="row align-items-center justify-content-center">
        
          <div
            className="col-lg-6 col-md-10 text-center text-lg-start mb-4 mb-lg-0 animate__animated animate__fadeInLeft"
          >
     <h1
  className="fw-bold display-5"
  style={{ lineHeight: "1.2", marginBottom: "25px" }}  // space below h1
>
  <span style={{ color: "#ffffffff", display: "block" }}>Your</span>
  <span style={{ color: "#ef7116ff", display: "block" }}>Campus Community</span>
  <span style={{ color: "#ffffffff", display: "block" }}>Connected</span>
</h1>

<p
  className="lead"
  style={{
    color: "#ffffffff",
    fontSize: "1.15rem",
    lineHeight: "1.7",
    marginBottom: "30px",    // space below paragraph
  }}
>
  <strong>PeerBridge</strong> connects college students — buy, sell, share
  knowledge, and collaborate effortlessly. A platform built{" "}
  <em>by students, for students.</em>
</p>
<Link to={"/signup"}>
  <button 
    className="btn shadow-sm custom-btn"
    style={{
      backgroundColor: "#c15c22ff",
      color: "white",
      border: "none",
        // bigger text
      padding: "18px 45px",
      height: "60px",
      width:"150px",
      fontSize:"1.2rem",
      // bigger button
      borderRadius: "18px",    // smoother edges
      fontWeight: "600",       // stronger look
    }}
  >
    Get Started
  </button>
</Link>


          </div>

          {/* Right Image */}
          <div
            className="col-lg-5 col-md-8 text-center animate__animated animate__fadeInRight"
          >
       <img
  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
  alt="Students collaborating"
  className="img-fluid rounded-4 shadow-sm"
  style={{ height: "650px", objectFit: "cover" }}
/>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
