import React from 'react';
// import { FaUser, FaShoppingCart, FaBook, FaComments } from 'react-icons/fa';

function YourNeed() {
    return (  
       <div className="container my-5">
        
        <h1>
            Everything You Need
        </h1>
        <p>PeerBridge offers a complete ecosystem for student collaboration and community building</p>
   

     <div className="row">
  <div className="col-md-3 mb-4">
    <div className="card h-100 text-center" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">Buy & Sell</h5>
        <p className="card-text">Trade items with fellow students safely and conveniently</p>
      </div>
    </div>
  </div>

  <div className="col-md-3 mb-4">
    <div className="card h-100 text-center" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">User Profiles</h5>
        <p className="card-text">Manage your profile easily</p>
      </div>
    </div>
  </div>

  <div className="col-md-3 mb-4">
    <div className="card h-100 text-center" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">Knowledge Sharing</h5>
        <p className="card-text">Share notes and resources</p>
      </div>
    </div>
  </div>

  <div className="col-md-3 mb-4">
    <div className="card h-100 text-center" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">Community Chat</h5>
        <p className="card-text">Connect with other students</p>
      </div>
    </div>
  </div>
</div>

       </div>

    );
}

export default YourNeed;