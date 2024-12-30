<<<<<<< HEAD
import './orders-card.css';
import {Link} from 'react-router-dom';
import { PropTypes } from "prop-types";

function UserOrderCard(props){
    return(
    <>
        

      <div className="card-container">
            <div className="card-content">
              <div className="card-details">
                <p className="restaurants-name">Restaurant name</p>
                <p className="date-ordered">Date ordered</p>

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
}

=======
import './order-card.css';
import {Link} from 'react-router-dom';

function UserOrderCard(){
return(
<>
    

<div className="card-container">
      <div className="card-content">
        <div className="card-details">
          <p className="restaurants-name">Restaurant name</p>
          <p className="date-ordered">Date ordered</p>

          <Link to="/historyorderpreview" className="view-details" state={{ restName: "Meat In A Box" }}> View order details</Link>

        </div>
        <div className="card-status">
          <p>Status: <span className="status-text">Ongoing</span></p>
        </div>
      </div>
      
</div>
    
    
 </>
);
}


>>>>>>> 802fafa46075c57c80248b1ed9b905e230ac6906
export default UserOrderCard;