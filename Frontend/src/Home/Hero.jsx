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
            <h1 className="fw-bold mb-3 display-5">
              Your <span className="text-primary">Campus Community</span>, Connected
            </h1>
            <p className="lead text-secondary mb-4">
              <strong>PeerBridge</strong> connects college students — buy, sell, share
              knowledge, and collaborate effortlessly. A platform built <em>by students,
              for students.</em>
            </p>
            <Link to={"/signup"} >
            <button className="btn btn-primary btn-lg px-4 shadow-sm">
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
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
