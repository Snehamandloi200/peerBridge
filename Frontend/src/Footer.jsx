import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-section py-5 mt-5">
      <div className="container text-center">
        <div className="row mb-4">
          <div className="col-md-4 mb-3">
            <h5 className="footer-heading">Connect with Us 🌐</h5>
            <p className="footer-text">Stay updated and join our student community.</p>
          </div>
          <div className="col-md-4 mb-3">
            <h5 className="footer-heading">Support</h5>
            <p className="footer-text">We’re here to help you 24/7 with any queries.</p>
          </div>
          <div className="col-md-4 mb-3">
            <h5 className="footer-heading">Help</h5>
            <p className="footer-text">Need assistance? Reach out to our support team.</p>
          </div>
        </div>

        <div className="footer-divider my-4"></div>

        <div className="footer-description text-muted">
          <p>
            PeerBridge is a collaborative student platform designed to make campus life
            easier and more connected. Buy, sell, share, and learn — all in one place.
          </p>
        </div>

        <div className="footer-bottom mt-4">
          <p className="text-muted mb-0">
            © {new Date().getFullYear()} <strong>PeerBridge</strong>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
