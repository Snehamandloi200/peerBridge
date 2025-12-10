import React from "react";
import "./Team.css";

function Team() {
  const members = [
    {
      name: "Sneha Mandloi",
      role: "Frontend Developer || 3rd Year CSE || Focused on improving frontend design.",
      photo: "/image/snehaimage.jpg",
      linkedin: "https://www.linkedin.com/in/sneha-mandloi-1b950830b/",
      github: "https://github.com/Snehamandloi200",
    },
    {
      name: "Renuka Kushwah",
      role: "Backend Developer ||  3rd Year CSE || Ensures smooth and secure backend flow",
      photo: "/image/renukaimage.jpg",
      linkedin: "https://www.linkedin.com/in/renuka-kushwah-04b34a312?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com/renuka-2005",
    },
  ];

  return (
    <div className="team-container " style={{background: "linear-gradient(135deg, #1a1d2cff, #0b4461ff"}}>
      <h2 className="fw-bold text-center mb-4" style={{ color: "#ffffffff" }}>
        Meet Our Team 👥
      </h2>

      <div className="row justify-content-center">
        {members.map((m, index) => (
          <div key={index} className="col-md-5 p-3">
            
            <div className="team-card">

              <img src={m.photo} alt={m.name} className="team-img" />

              <h4 className="fw-bold" style={{ color: "#105c7aff" }}>
                {m.name}
              </h4>

              <p className="text-muted" >{m.role}</p>

              {/* Social Icons */}
              <div className="d-flex justify-content-center gap-3 mt-3">

                {/* LinkedIn */}
                <a href={m.linkedin} target="_blank" className="social-icon">
                  <svg width="28" height="28" fill="#0c5297ff" viewBox="0 0 24 24">
                    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0.5 8h4v16h-4V8zm7.5 0h3.8v2.2h.1c.5-.9 1.7-2.2 3.5-2.2 3.7 0 4.4 2.4 4.4 5.5V24h-4v-9.3c0-2.2-.1-5-3-5-3 0-3.4 2.3-3.4 4.8V24h-4V8z"/>
                  </svg>
                </a>

                {/* GitHub */}
                <a href={m.github} target="_blank" className="social-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="black">
                    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.94.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.38-3.87-1.38-.53-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.76.4-1.27.73-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a10.9 10.9 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.17 1.83 1.17 3.09 0 4.43-2.69 5.41-5.26 5.7.41.36.78 1.07.78 2.18v3.23c0 .31.21.67.79.56A10.99 10.99 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"/>
                  </svg>
                </a>

              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;
