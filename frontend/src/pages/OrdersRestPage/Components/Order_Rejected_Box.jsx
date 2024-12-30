import "./Orders_Rest_Box.css";





function RejectCard(){
return(
  <div className="card-container">
              <div className="card-content">
                <div className="card-details">
                  <p className="customer-name">Customer name</p>
                  <p className="date-ordered">Date ordered</p>
                  <a href="#" className="view-details">View order details</a>
                  
                </div>
                <div className="card-status">
          <p>Status: <span className="status-text">Rejected</span></p>
                </div>
                    
                    
              </div>
              
        </div>
            
            );


}


export default RejectCard;