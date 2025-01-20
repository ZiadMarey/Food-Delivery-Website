import './orders-card.css';
import { Link } from 'react-router-dom';

function UserOrderCard({ orderID, restaurantName, orderDate, status, totalPrice }) {
    return (
        <div className="card-container">
            <div className="card-content">
                <div className="card-details">
                    <p className="restaurants-name">{restaurantName}</p>
                    <p className="date-ordered">Date ordered: {orderDate}</p>

                    <Link 
                        to="/historyorderpreview" 
                        className="view-details" 
                        state={{ orderID }}
                    >
                        View order details
                    </Link>
                </div>
                <div className="card-status">
                    <p>Status: <span className="status-text">{status}</span></p>
                </div>
            </div>
        </div>
    );
}

export default UserOrderCard;