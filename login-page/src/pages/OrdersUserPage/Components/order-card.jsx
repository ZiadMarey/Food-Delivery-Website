import './order-card.css';

function UserOrderCard(){
return(
<>
    

<div className="card-container">
      <div className="card-content">
        <div className="card-details">
          <p className="restaurants-name">Restaurant name</p>
          <p className="date-ordered">Date ordered</p>
          <a href="#" className="view-details">View order details</a>
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