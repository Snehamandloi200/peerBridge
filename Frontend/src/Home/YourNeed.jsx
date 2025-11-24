import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./YourNeed.css";

function YourNeed() {
  return (
    <section className="yourneed-section py-5">
      <div className="container-fluid text-center px-4">
        {/* Title */}
        <h1 className="fw-bold yourneed-title mb-3 animate__animated animate__fadeInDown">
          Everything You <span className="highlight">Need</span>
        </h1>
        <p className="yourneed-subtext mb-5 animate__animated animate__fadeInUp">
          PeerBridge offers a complete ecosystem for student collaboration and community building.
        </p>

        {/* Cards */}
        <div className="row justify-content-center">
          {/* Card 1 */}
          <div className="col-lg-3 col-md-5 col-sm-8 mb-4 animate__animated animate__zoomIn">
            <div className="yourneed-card h-100 p-4 rounded-4 shadow-sm">
              <h5 className="fw-bold mb-3">🛒 Buy & Sell</h5>
              <p>Trade items with fellow students safely and conveniently.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-lg-3 col-md-5 col-sm-8 mb-4 animate__animated animate__zoomIn animate__delay-1s">
            <div className="yourneed-card h-100 p-4 rounded-4 shadow-sm">
              <h5 className="fw-bold mb-3">👤 User Profiles</h5>
              <p>Manage your profile and keep your identity connected to your campus.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-lg-3 col-md-5 col-sm-8 mb-4 animate__animated animate__zoomIn animate__delay-2s">
            <div className="yourneed-card h-100 p-4 rounded-4 shadow-sm">
              <h5 className="fw-bold mb-3">📚 Knowledge Sharing</h5>
              <p>Share notes, resources, and ideas to help each other grow.</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="col-lg-3 col-md-5 col-sm-8 mb-4 animate__animated animate__zoomIn animate__delay-3s">
            <div className="yourneed-card h-100 p-4 rounded-4 shadow-sm">
              <h5 className="fw-bold mb-3">💬 Community Chat</h5>
              <p>Connect instantly with students and stay updated with your peers.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default YourNeed;
