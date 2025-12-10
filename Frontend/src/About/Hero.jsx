import React from "react";

function AboutHero() {
  return (
    <div
      className="container-fluid py-5"
      style={{
       background: "linear-gradient(135deg, #ffffffff, #ecf1f4ff",
        // background: "linear-gradient(135deg, #c7d3dfff, #edf6ffff)",
        minHeight: "40vh",
        textAlign: "center",
        
        paddingTop: "6rem",
        height:"10px",
      }}
    >
      <h1
        className="fw-bold display-5 mb-3"
        style={{ color: "#066787ff" }}
      >
        About Our Campus <span style={{color:"#f77a21"}}>Marketplace</span>  🎓
      </h1>

      <p
        className="fs-5 mx-auto"
        style={{
          maxWidth: "800px",
          color: "#555",
          lineHeight: "1.8",
        }}
      >
        We created this platform to help students easily buy & sell items,
        report lost belongings, and connect with campus teams.  
        Our mission is to build a smarter, more connected student community.
      </p>
    </div>
  );
}

export default AboutHero;
