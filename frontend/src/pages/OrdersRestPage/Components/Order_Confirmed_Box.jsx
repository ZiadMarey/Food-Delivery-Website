import "./Orders_Rest_Box.css";
import { Link } from "react-router-dom";
import Link_Icon from '../assets/open-in-new.svg';


function ConfirmCard(){
return(
  <div className="card-container">
              <div className="card-content">
                <div className="card-details">
                  <p className="customer-name">Customer name</p>
                  
                  <p className="date-ordered">Date ordered</p>
                  <Link to ="/historyorderpreview"> {/* need to change this when we do a restaurant version*/}
                    <p className='view-details '>View order details</p>
                  </Link>

                  <Link to ="/userprofileplain" className="customer-profile-details"> {/* need to change this when we do a version without logout and acc balance*/}
                    <p className='view-details'>View Customer Profile</p>
                  </Link>
                  
                </div>
                <div className="card-status">
          <p>Status: <span className="status-text">Accepted</span></p>
                </div>
                    
                    
              </div>
              
        </div>
            
            );


}


export default ConfirmCard;