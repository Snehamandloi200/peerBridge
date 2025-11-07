import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero-section container-fluid py-5">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          {/* Left side text */}
          <div className="col-lg-6 col-md-12 text-center text-lg-start mb-4 mb-lg-0">
            <h1 className="hero-title fw-bold mb-3">
              Your <span className="highlight">Campus Community</span>, Connected 🌐
            </h1>
            <p className="hero-text fs-5">
              <strong>PeerBridge</strong> connects college students — buy, sell, share knowledge, and
              collaborate effortlessly. A platform built <em>by students, for students.</em>
            </p>
            <Link to="/signup">
              <button className="btn btn-primary btn-lg mt-3 hero-btn">
                Get Started 
              </button>
            </Link>
          </div>

          {/* Right side image */}
          <div className="col-lg-5 col-md-10 mx-auto text-center">
            <div className="image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                alt="Students collaborating"
                className="img-fluid hero-img rounded-4 shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
