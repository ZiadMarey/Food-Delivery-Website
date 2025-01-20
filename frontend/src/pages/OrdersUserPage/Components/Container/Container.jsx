import Card from '../Cards/order-card.jsx'

import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import './Container.css'

function Container (){
    const [orders, setOrders] = useState([]); // Holds fetched orders
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error handling

    // Fetch orders from the backend
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/orders', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Use token if needed
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const data = await response.json();
                setOrders(data.orders); // Assuming the response is { orders: [...] }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    const containerHeight = orders.length > 1 ? orders.length * 21.5 + 60 : 81.5;

    return(
        <div className='container' style= {{
            height: `${containerHeight*21.5 + 60 }vh`
            //This line adjusts the height of the container according to the number of cards present in it, the default amount of cards here is 1
        }}>
            <p className="order-list-text">Order History</p>
           
            {orders.map((order) => (
                <Card
                    orderID={order.orderId}
                    restaurantName={order.restaurantName}
                    orderDate={order.createdAt}
                    status={order.status}
                    totalPrice={order.totalPrice}
                />
            ))}

            <Link to ="/homepage" className='return-button'>
                <p className='reutn-text'>Return</p>
            </Link>
        </div>
    );
}
export default Container;