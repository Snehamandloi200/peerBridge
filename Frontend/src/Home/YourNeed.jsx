import React from "react";
import "./YourNeed.css";

function YourNeed() {
  return (
    <section className="yourneed-section py-5">
      <div className="container text-center">
        <h1 className="fw-bold yourneed-title mb-3">
          Everything You <span className="highlight">Need</span>
        </h1>
        <p className="yourneed-subtext mb-5">
          PeerBridge offers a complete ecosystem for student collaboration and community building.
        </p>

        <div className="row justify-content-center">
          {/* Card 1 */}
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="yourneed-card h-100 p-4 rounded-4 shadow-sm">
              <h5 className="fw-bold mb-3">🛒 Buy & Sell</h5>
              <p>Trade items with fellow students safely and conveniently.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="yourneed-card h-100 p-4 rounded-4 shadow-sm">
              <h5 className="fw-bold mb-3">👤 User Profiles</h5>
              <p>Manage your profile and keep your identity connected to your campus.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="yourneed-card h-100 p-4 rounded-4 shadow-sm">
              <h5 className="fw-bold mb-3">📚 Knowledge Sharing</h5>
              <p>Share notes, resources, and ideas to help each other grow.</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="col-md-3 col-sm-6 mb-4">
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
