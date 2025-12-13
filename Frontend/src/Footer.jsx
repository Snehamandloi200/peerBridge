import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-top-gradient"></div>

      {/* ----------- ROW (3 Content Columns + 1 Empty Spacer Track) ----------- */}
      <div className="footer-container four-column-layout">
        
        {/* ------------ COLUMN 1 (Company Info) - Placed in Grid Track 1 ------------ */}
        <div className="footer-column footer-col-info">
        

          <h2 className="footer-sitename peerbridge-title">
            Peer<span className="brand-highlight">Bridge</span>
          </h2>

          <p className="footer-text">
            PeerBridge is a student-centered platform to donate, exchange,
            and receive semester-related items — connecting juniors and
            seniors within your college community.
          </p>
        </div>
        
        {/* --- Track 2 is empty/spacer in the CSS Grid --- */}

        {/* ------------ COLUMN 2 (Links) - Placed in Grid Track 3 ------------ */}
        <div className="footer-column footer-col-links">
          <h3 className="footer-heading">Useful Links</h3>
          <ul className="footer-links">
            <li><a href="/about">About</a></li>
            <li><a href="#">Connect</a></li>
            <li><a href="#">Career</a></li>
          </ul>
        </div>

        {/* ------------ COLUMN 3 (Team Members) - Placed in Grid Track 4 ------------ */}
        <div className="footer-column footer-col-team">
          <h3 className="footer-heading">Team Members</h3>
          <ul className="footer-links team-members">
            <li>
              Sneha Mandloi — 
              <a href="mailto:snehamandloi2006@gmail.com">
                snehamandloi2006@gmail.com
              </a>
            </li>

            <li>
              Renuka Kushwah — 
              <a href="mailto:renukakushwah60@gmail.com">
                renukakushwah60@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        © {new Date().getFullYear()} PeerBridge. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;