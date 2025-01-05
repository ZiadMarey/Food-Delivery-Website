import './orders-card.css';
import {Link} from 'react-router-dom';
import { PropTypes } from "prop-types";

function UserOrderCard(props){
    return(
    <>
        

      <div className="card-container">
            <div className="card-content">
              <div className="card-details">
                <p className="restaurants-name">{props.restaurantName}</p>
                <p className="date-ordered">{props.dateOrdered}</p>

                <Link to="/historyorderpreview" className="view-details" state={{ restName: "McDonalds" }}> View order details</Link>

              </div>
              <div className="card-status">
                <p>Status: <span className="status-text">{props.status}</span></p>
              </div>
            </div>
            
    </div>
        
        
    </>
    );
}
UserOrderCard.propTypes = {
  status: PropTypes.string,
  restaurantName : PropTypes.string,
  dateOrdered : PropTypes.string
}

export default UserOrderCard;