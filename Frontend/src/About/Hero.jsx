import React from "react";

function Hero() {
  return (
    <div
      className="container-fluid py-5"
      style={{
        background: "linear-gradient(135deg, #dff3ff, #f9fcff)",
        minHeight: "80vh",
        color: "#333",
        textAlign: "center",
      }}
    >
      {/* Hero Section */}
      <div className="row justify-content-center align-items-center py-5">
        <div className="col-md-8">
          <h1
            className="fw-bold display-5 mb-4"
            style={{
              color: "#0056b3",
              textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            Campus Marketplace — Buy, Sell & Find with Ease 🎓
          </h1>
          <p
            className="fs-5 mb-4"
            style={{ color: "#555", lineHeight: "1.8" }}
          >
            Welcome to our <strong>Campus Exchange Portal</strong> — a platform
            built for students to easily <strong>buy or sell second-hand items</strong>,
            report <strong>lost and found belongings</strong>, and even connect with
            their <strong>campus teams and events</strong>.  
            Your all-in-one solution for a smarter campus community!
          </p>

          <button
            className="btn btn-primary px-4 py-2 shadow"
            style={{
              backgroundColor: "#0078D7",
              borderRadius: "25px",
              border: "none",
              fontSize: "1.1rem",
              transition: "all 0.3s ease-in-out",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#005fa3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#0078D7")}
          >
            Explore Now
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="row border-top mt-5 pt-5 px-5 justify-content-center">
        <div className="col-md-4 p-4">
          <h3 className="fw-bold" style={{ color: "#0056b3" }}>
            💸 Buy & Sell Items
          </h3>
          <p className="fs-6 text-muted">
            Looking to sell your old books, gadgets, or accessories?  
            List your item here and help fellow students find what they need — all within the campus!
          </p>
        </div>

        <div className="col-md-4 p-4">
          <h3 className="fw-bold" style={{ color: "#0056b3" }}>
            🔍 Lost & Found
          </h3>
          <p className="fs-6 text-muted">
            Misplaced something important? Or found someone’s belongings?  
            Post the details here and let our campus community help reconnect the items to their owners.
          </p>
        </div>

        <div className="col-md-4 p-4">
          <h3 className="fw-bold" style={{ color: "#0056b3" }}>
            👥 Our Campus Teams
          </h3>
          <p className="fs-6 text-muted">
            Meet our dedicated teams managing the marketplace, Lost & Found,
            and community events.  
            We aim to build a responsible and helpful student environment.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
