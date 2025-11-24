import React, { useState } from "react";
import SellItem from "./SellItem";
import LostAndFound from "./LostAndFound";
import FindTeam from "./FindTeam";

function Addpost() {
  const [activeForm, setActiveForm] = useState("sell");

  return (
  
    <div
      className="addpost-wrapper d-flex flex-column align-items-center w-100" 
      style={{
        minHeight: "100vh",
        paddingTop: "100px",
        // This background now correctly stretches full width because of 'w-100'
        background: "linear-gradient(135deg, #e0f7fa, #e3f2fd)",
      }}
    >
     
      <ul
        className="nav justify-content-center shadow-lg"
        style={{
          cursor: "pointer",
          marginBottom: "30px",
          border: "2px solid rgba(0, 0, 0, 0.1)",
          borderRadius: "60px",
          width: "90%",
          maxWidth: "600px",
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.8)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        {[
          { key: "sell", label: "🛒 Sell Item" },
          { key: "lost", label: "🔍 Lost & Found" },
          { key: "team", label: "🤝 Find Team" },
        ].map((tab) => (
          <li className="nav-item" key={tab.key}>
            <span
              className={`nav-link ${
                activeForm === tab.key ? "active fw-bold" : ""
              }`}
              onClick={() => setActiveForm(tab.key)}
              style={{
                padding: "12px 25px",
                borderRadius: "50px",
                margin: "8px",
                fontSize: "1.1rem",
                color: activeForm === tab.key ? "#fff" : "#0d6efd",
                background:
                  activeForm === tab.key
                    ? "linear-gradient(135deg, #0d6efd, #007bff)"
                    : "transparent",
                transition: "all 0.3s ease",
                boxShadow:
                  activeForm === tab.key
                    ? "0 4px 15px rgba(13,110,253,0.4)"
                    : "none",
              }}
              onMouseOver={(e) => {
                if (activeForm !== tab.key) e.target.style.background = "rgba(13,110,253,0.1)";
              }}
              onMouseOut={(e) => {
                if (activeForm !== tab.key) e.target.style.background = "transparent";
              }}
            >
              {tab.label}
            </span>
          </li>
        ))}
      </ul>

      {/* Active Form */}
      <div
        className="form-container w-100"
        style={{
          // Optional: Increase max-width for better use of space on big monitors
          maxWidth: "1000px", 
          padding: "30px",
          borderRadius: "20px",
          background: "#ffffff",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          transition: "all 0.4s ease",
        }}
      >
        {activeForm === "sell" && <SellItem />}
        {activeForm === "lost" && <LostAndFound />}
        {activeForm === "team" && <FindTeam />}
      </div>
    </div>
  );
}

export default Addpost;