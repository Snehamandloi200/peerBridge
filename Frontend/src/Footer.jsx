import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-section text-center text-dark py-5 mt-5 w-100" 
      style={{
        width: "100%",
        margin: "0",
        padding: "0",
      }}
    >
      <div className="w-100" style={{ padding: "0 20px" }}>

        <div className="row mb-4 justify-content-center m-0 w-100">

          {/* Connect Section */}
          <div className="col-lg-3 col-md-4 col-sm-10 mb-4">
            <h5 className="footer-heading mb-3">Connect with Us 🌐</h5>
            <p className="footer-text">Stay updated and join our student community.</p>
          </div>

          {/* Support */}
          <div className="col-lg-3 col-md-4 col-sm-10 mb-4">
            <h5 className="footer-heading mb-3">Support</h5>
            <p className="footer-text">
              We’re here to help you 24/7 with any queries.
            </p>
          </div>

          {/* Help */}
          <div className="col-lg-3 col-md-4 col-sm-10 mb-4">
            <h5 className="footer-heading mb-3">Help</h5>
            <p className="footer-text">
              Need assistance? Reach out to our support team.
            </p>
          </div>
        </div>

        <hr className="footer-divider mx-auto" />

        <div className="footer-description mt-4 px-3">
          <p>
            <strong>PeerBridge</strong> is a collaborative student platform designed
            to make campus life easier and more connected.
          </p>
        </div>

        <div className="footer-bottom mt-4">
          <p className="text-secondary mb-0 small">
            © {new Date().getFullYear()} <strong>PeerBridge</strong>. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
