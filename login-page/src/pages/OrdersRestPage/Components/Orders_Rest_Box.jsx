import "./Orders_Rest_Box.css";



function RestOrderCard(){

    return(
        <div className="card-container">
              <div className="card-content">
                <div className="card-details">
                  <p className="customer-name">Customer name</p>
                  <p className="date-ordered">Date ordered</p>
                  <a href="#" className="view-details">View order details</a>
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