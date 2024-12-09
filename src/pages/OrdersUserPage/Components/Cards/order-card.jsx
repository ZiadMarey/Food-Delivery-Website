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


export default UserOrderCard;