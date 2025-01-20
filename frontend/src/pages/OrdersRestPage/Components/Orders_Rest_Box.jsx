import "./Orders_Rest_Box.css";
import { Link } from "react-router-dom";
import Link_Icon from '../assets/open-in-new.svg';

function RestOrderCard({orderID, restaurantName, orderDate, status, totalPrice}){

    return(
        <div className="card-container">
              <div className="card-content">
                <div className="card-details">
                  <p className="customer-name">{orderID}</p>
                  
                  <p className="date-ordered">{orderDate}</p>
                  <Link 
                        to="/historyorderpreview" 
                        className="view-details" 
                        state={{ orderID }}
                    >
                        View order details
                  </Link>
                  <Link to ="/userprofileplain" className="customer-profile-details"> {/* need to change this when we do a version without logout and acc balance*/}
                    <p className='view-details'>View Customer Details</p>
                  </Link>

                </div>
                <div className = "confirm-reject" > 
                    <button className = "confirm"> Confirm </button> <br /> <br />
                    <button className = "reject"> Reject </button>
                    </div>
              </div>
              
        </div>
            
            );


}


export default RestOrderCard;