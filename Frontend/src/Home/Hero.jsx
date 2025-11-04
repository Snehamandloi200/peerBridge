import React from "react";
import Signup from "../Signup/Signup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Hero() {
    return ( 
 <div className="container p-5 mb-5">
    <div className="row">
        <div className="col-6 p-3">
        <img src='https://images.unsplash.com/photo-1523240795612-9a054b0db644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBzdHVkeWluZ3xlbnwxfHx8fDE3NTk5Nzk5MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
         alt='image loading'
         className="img-fluid" 
         />       
         </div>
       <div className="col-1"></div>
       <div className="col-5 d-flex flex-column justify-content-center p-3">
       <h1 className="mb-20" >
             Your Campus Community, Connected
        </h1>
        <p>
            PeerBridge brings college students together to buy, sell, share knowledge, and collaborate. Built by students, for students.
        </p>
        <Link className="nav-link active" aria-current="page" to="/signup">
        <button  className=" btn btn-primary fs-5"
     
        style={{width:"25%", margin:"0 auto" }}
          
         >
           Get Start
        </button>
        </Link>
       </div>
        
       
 </div>
 </div>
    );
}

export default Hero;